import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account is inactive', 403);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        apiKeys: {
          select: {
            id: true,
            name: true,
            key: true,
            isActive: true,
            rateLimit: true,
            lastUsedAt: true,
            expiresAt: true,
            createdAt: true,
          },
        },
        subscriptions: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Create API key
router.post('/keys', authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user!.id;

    // Generate a secure API key
    const { v4: uuidv4 } = require('uuid');
    const apiKey = `yt_${uuidv4().replace(/-/g, '')}${uuidv4().replace(/-/g, '')}`;

    const keyRecord = await prisma.apiKey.create({
      data: {
        key: apiKey,
        name: name || `API Key ${new Date().toLocaleDateString()}`,
        userId,
        rateLimit: 100, // Default rate limit
      },
    });

    res.status(201).json({
      message: 'API key created successfully',
      data: keyRecord,
    });
  } catch (error) {
    next(error);
  }
});

// Delete API key
router.delete('/keys/:keyId', authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { keyId } = req.params;
    const userId = req.user!.id;

    const keyRecord = await prisma.apiKey.findFirst({
      where: { id: keyId, userId },
    });

    if (!keyRecord) {
      throw new AppError('API key not found', 404);
    }

    await prisma.apiKey.delete({
      where: { id: keyId },
    });

    res.json({
      message: 'API key deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
