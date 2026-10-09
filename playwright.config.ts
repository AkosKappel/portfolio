import { defineConfig, devices } from "@playwright/test";

// End-to-end tests run against the production build (`npm run build` first).
export default defineConfig({
  testDir: "test/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  // Axe runs are CPU heavy; fewer workers keep slow machines from timing out.
  workers: process.env.CI ? 2 : 4,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3200",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npx next start --port 3200",
    url: "http://localhost:3200",
    reuseExistingServer: !process.env.CI,
  },
});
