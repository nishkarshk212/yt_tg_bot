import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true,
      emailVerified: true,
    },
  });

  // Create plans
  const freePlan = await prisma.plan.upsert({
    where: { name: 'Free' },
    update: {},
    create: {
      name: 'Free',
      description: 'Perfect for testing and small projects',
      price: 0,
      currency: 'USD',
      requestsPerMonth: 100,
      rateLimit: 10,
      features: ['100 requests/month', '10 requests/minute', '1 API key', 'Basic endpoints'],
      isActive: true,
    },
  });

  const proPlan = await prisma.plan.upsert({
    where: { name: 'Pro' },
    update: {},
    create: {
      name: 'Pro',
      description: 'For growing projects and businesses',
      price: 29,
      currency: 'USD',
      requestsPerMonth: 10000,
      rateLimit: 60,
      features: ['10,000 requests/month', '60 requests/minute', '5 API keys', 'All endpoints', 'Priority support', 'Analytics dashboard'],
      isActive: true,
    },
  });

  const enterprisePlan = await prisma.plan.upsert({
    where: { name: 'Enterprise' },
    update: {},
    create: {
      name: 'Enterprise',
      description: 'For large-scale applications',
      price: 99,
      currency: 'USD',
      requestsPerMonth: 999999,
      rateLimit: 200,
      features: ['Unlimited requests', '200 requests/minute', 'Unlimited API keys', 'All endpoints + beta', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
      isActive: true,
    },
  });

  // Create admin settings
  await prisma.adminSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      maintenanceMode: false,
      maxFreeRequests: 100,
      registrationOpen: true,
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin user: admin@example.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
