import { Router } from 'express';
import { AuthRequest, requireAdmin } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma';

const router = Router();

// All admin routes require admin authentication
router.use(requireAdmin);

// Get all users
router.get('/users', async (req: AuthRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          emailVerified: true,
          createdAt: true,
          _count: {
            select: {
              apiKeys: true,
              subscriptions: true,
              usageLogs: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    res.json({
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get user details
router.get('/users/:userId', async (req: AuthRequest, res, next) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        apiKeys: true,
        subscriptions: {
          include: { plan: true },
        },
        usageLogs: {
          take: 50,
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

// Update user
router.patch('/users/:userId', async (req: AuthRequest, res, next) => {
  try {
    const { userId } = req.params;
    const { role, isActive } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    res.json({
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Get all API keys
router.get('/api-keys', async (req: AuthRequest, res, next) => {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ data: apiKeys });
  } catch (error) {
    next(error);
  }
});

// Revoke API key
router.delete('/api-keys/:keyId', async (req: AuthRequest, res, next) => {
  try {
    const { keyId } = req.params;

    await prisma.apiKey.update({
      where: { id: keyId },
      data: { isActive: false },
    });

    res.json({ message: 'API key revoked successfully' });
  } catch (error) {
    next(error);
  }
});

// Get analytics
router.get('/analytics', async (req: AuthRequest, res, next) => {
  try {
    const startDate = req.query.startDate
      ? new Date(req.query.startDate as string)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();

    const [
      totalUsers,
      activeUsers,
      totalApiKeys,
      activeApiKeys,
      totalRequests,
      uniqueEndpoints,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.apiKey.count(),
      prisma.apiKey.count({ where: { isActive: true } }),
      prisma.usageLog.count({
        where: {
          timestamp: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.usageLog.findMany({
        where: {
          timestamp: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: { endpoint: true },
        distinct: ['endpoint'],
      }),
    ]);

    // Get requests per day
    const requestsPerDay = await prisma.$queryRaw`
      SELECT DATE(timestamp) as date, COUNT(*) as count
      FROM "UsageLog"
      WHERE timestamp >= ${startDate} AND timestamp <= ${endDate}
      GROUP BY DATE(timestamp)
      ORDER BY date DESC
    `;

    // Get top endpoints
    const topEndpoints = await prisma.usageLog.groupBy({
      by: ['endpoint'],
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        endpoint: true,
      },
      orderBy: {
        _count: {
          endpoint: 'desc',
        },
      },
      take: 10,
    });

    res.json({
      data: {
        overview: {
          totalUsers,
          activeUsers,
          totalApiKeys,
          activeApiKeys,
          totalRequests,
          uniqueEndpoints: uniqueEndpoints.length,
        },
        requestsPerDay,
        topEndpoints: topEndpoints.map((item) => ({
          endpoint: item.endpoint,
          count: item._count.endpoint,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get plans
router.get('/plans', async (req: AuthRequest, res, next) => {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { price: 'asc' },
    });

    res.json({ data: plans });
  } catch (error) {
    next(error);
  }
});

// Create plan
router.post('/plans', async (req: AuthRequest, res, next) => {
  try {
    const {
      name,
      description,
      price,
      currency,
      requestsPerMonth,
      rateLimit,
      features,
    } = req.body;

    const plan = await prisma.plan.create({
      data: {
        name,
        description,
        price,
        currency,
        requestsPerMonth,
        rateLimit,
        features,
      },
    });

    res.status(201).json({
      message: 'Plan created successfully',
      data: plan,
    });
  } catch (error) {
    next(error);
  }
});

// Update plan
router.patch('/plans/:planId', async (req: AuthRequest, res, next) => {
  try {
    const { planId } = req.params;

    const plan = await prisma.plan.update({
      where: { id: planId },
      data: req.body,
    });

    res.json({
      message: 'Plan updated successfully',
      data: plan,
    });
  } catch (error) {
    next(error);
  }
});

// Get admin settings
router.get('/settings', async (req: AuthRequest, res, next) => {
  try {
    let settings = await prisma.adminSettings.findFirst();

    if (!settings) {
      settings = await prisma.adminSettings.create({
        data: {},
      });
    }

    res.json({ data: settings });
  } catch (error) {
    next(error);
  }
});

// Update admin settings
router.patch('/settings', async (req: AuthRequest, res, next) => {
  try {
    const settings = await prisma.adminSettings.upsert({
      where: { id: req.body.id || 'default' },
      create: req.body,
      update: req.body,
    });

    res.json({
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
