import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      { test: { name: "unit", include: ["src/**/*.test.ts"] } },
      // Hits every external link; run with `pnpm check:links`, not on every push.
      { test: { name: "links", include: ["src/**/*.links.ts"], testTimeout: 30_000 } },
    ],
  },
});
