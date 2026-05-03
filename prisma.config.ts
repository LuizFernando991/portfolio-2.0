import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // DIRECT_URL bypasses pooling for migrations (required on Neon)
    // Falls back to DATABASE_URL if not set (local dev)
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
