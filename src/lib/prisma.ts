import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function isLocalDatabase(url: string) {
  return url.includes("localhost") || url.includes("127.0.0.1");
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL!;
  const local = isLocalDatabase(url);
  const ssl = local ? false : { rejectUnauthorized: false };

  if (!local) {
    // Supabase pooler uses a self-signed cert in the chain
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const pool = new Pool({
    connectionString: url,
    ssl,
    // Every connection held here is one the Storage API cannot use to serve
    // images, and several serverless instances share the same Supabase pool.
    max: local ? 10 : 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  });

  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
