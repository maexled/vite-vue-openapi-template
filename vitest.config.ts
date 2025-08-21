import {
  defineWorkersConfig,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";

export default defineWorkersConfig(async () => {
  // Read all migrations in the `migrations` directory
  const migrationsPath = path.join(__dirname, "migrations");
  const migrations = await readD1Migrations(migrationsPath);

  return {
    test: {
      setupFiles: ["./tests/apply-migrations.ts"],
      globals: true,
      environment: "node",
      testTimeout: 30000,
      typecheck: {
        tsconfig: "./tsconfig.worker.json",
      },
      poolOptions: {
        workers: {
          wrangler: {
            configPath: "./wrangler.jsonc",
          },
          miniflare: {
            // Environment variables
            bindings: {
              // Inject all migration SQL as an environment variable
              TEST_MIGRATIONS: migrations,
            },
          },
        },
      },
    },
  };
});
