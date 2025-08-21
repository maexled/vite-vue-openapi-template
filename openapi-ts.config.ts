import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "schema.json",
  output: "src/client",
  plugins: [
    {
      name: "@hey-api/client-fetch",
      runtimeConfigPath: "./src/hey-api.ts",
    },
    "@tanstack/vue-query",
    {
      name: "zod",
      compatibilityVersion: 3,
    },
  ],
});
