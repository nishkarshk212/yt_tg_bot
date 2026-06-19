import { PrismaClient } from '@prisma/client';

// Global prisma client instance
let prismaInstance: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({});
  }
  return prismaInstance;
}

// For backward compatibility, export a default instance
export const prisma = getPrismaClient();
