import { spawn } from "child_process";
import fs from "fs";
import fetch from "node-fetch";

const SERVER_URL = "http://localhost:5173/openapi.json";
const OUTPUT_FILE = "schema.json";
const TIMEOUT_MS = 60000; // 60 seconds
const READY_SIGNAL = "ready";

async function run() {
  console.log("Starting dev server...");

  const dev = spawn("npm run dev", {
    stdio: ["pipe", "pipe", "pipe"],
    shell: true,
  });

  let serverReady = false;

  const timeout = setTimeout(() => {
    if (!serverReady) {
      console.error(`Server did not start within ${TIMEOUT_MS / 1000}s.`);
      dev.kill("SIGTERM");
      process.exit(1);
    }
  }, TIMEOUT_MS);

  dev.stdout.on("data", async (data) => {
    const msg = data.toString();
    process.stdout.write(msg);

    if (msg.toLowerCase().includes(READY_SIGNAL) && !serverReady) {
      serverReady = true;
      clearTimeout(timeout);

        try {
          const res = await fetch(SERVER_URL);
          if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
          const json = await res.json();
          fs.writeFileSync(OUTPUT_FILE, JSON.stringify(json, null, 2));
          console.log(`✅ OpenAPI schema saved to ${OUTPUT_FILE}`);
        } catch (err) {
          console.error("Error fetching OpenAPI schema:", err);
        } finally {
          dev.kill("SIGTERM");
          process.exit(0);
        }
    }
  });

  dev.stderr.on("data", (data) => {
    process.stderr.write(data.toString());
  });

  dev.on("close", (code) => {
    if (!serverReady) {
      console.error(`Dev server exited prematurely with code ${code}`);
      process.exit(code);
    }
  });
}

run();
