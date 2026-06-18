import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: {
      message: 'Too many requests from this IP, please try again later',
      statusCode: 429,
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiKeyRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    return next();
  }

  try {
    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { user: { include: { subscriptions: { include: { plan: true } } } } },
    });

    if (!keyRecord || !keyRecord.isActive) {
      return res.status(401).json({
        error: {
          message: 'Invalid or inactive API key',
          statusCode: 401,
        },
      });
    }

    const subscription = keyRecord.user.subscriptions[0];
    const plan = subscription?.plan;
    const rateLimit = plan?.rateLimit || keyRecord.rateLimit;

    const now = new Date();
    const windowStart = new Date(now.getTime() - 15 * 60 * 1000);

    const recentRequests = await prisma.usageLog.count({
      where: {
        userId: keyRecord.userId,
        timestamp: { gte: windowStart },
      },
    });

    if (recentRequests >= rateLimit) {
      return res.status(429).json({
        error: {
          message: `Rate limit exceeded. Maximum ${rateLimit} requests per 15 minutes.`,
          statusCode: 429,
        },
      });
    }

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    next();
  }
};
