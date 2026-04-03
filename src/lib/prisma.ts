import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const prisma = new PrismaClient();

export const db = prisma;

if (process.env.NODE_ENV !== "production") {
  // Note: You should not use `global` in a production environment
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };
  globalForPrisma.prisma = db;
}
