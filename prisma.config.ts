import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/database/prisma/schema.prisma",
  migrations: {
    path: "src/database/prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
