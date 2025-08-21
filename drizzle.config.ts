import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  out: "migrations",
  schema: "./server/db/schema.ts",
});
