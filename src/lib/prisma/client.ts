import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

/**
 * Prisma runtime adapter for the app.
 * This uses the pooled Supabase connection string from DATABASE_URL.
 */
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

/**
 * Prevent multiple Prisma Client instances in development.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}