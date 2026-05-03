import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function isLocalDatabase(url: string) {
  return url.includes("localhost") || url.includes("127.0.0.1");
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL!;
  const ssl = isLocalDatabase(url) ? false : { rejectUnauthorized: false };

  if (!isLocalDatabase(url)) {
    // Supabase pooler uses a self-signed cert in the chain
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const pool = new Pool({ connectionString: url, ssl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
