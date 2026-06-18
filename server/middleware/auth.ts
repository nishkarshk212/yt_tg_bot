import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  apiKey?: string;
  query: any;
  params: any;
  body: any;
  headers: any;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: {
        message: 'Access token required',
        statusCode: 401,
      },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      id: string;
      email: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: {
          message: 'User not found or inactive',
          statusCode: 401,
        },
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(403).json({
      error: {
        message: 'Invalid or expired token',
        statusCode: 403,
      },
    });
  }
};

export const authenticateApiKey = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return res.status(401).json({
      error: {
        message: 'API key required',
        statusCode: 401,
      },
    });
  }

  try {
    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { user: true },
    });

    if (!keyRecord || !keyRecord.isActive) {
      return res.status(401).json({
        error: {
          message: 'Invalid or inactive API key',
          statusCode: 401,
        },
      });
    }

    if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
      return res.status(401).json({
        error: {
          message: 'API key has expired',
          statusCode: 401,
        },
      });
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() },
    });

    req.user = {
      id: keyRecord.user.id,
      email: keyRecord.user.email,
      role: keyRecord.user.role,
    };
    req.apiKey = apiKey;

    next();
  } catch (error) {
    console.error('API key authentication error:', error);
    return res.status(401).json({
      error: {
        message: 'Authentication failed',
        statusCode: 401,
      },
    });
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      error: {
        message: 'Admin access required',
        statusCode: 403,
      },
    });
  }
  next();
};
