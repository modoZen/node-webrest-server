import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    clearMocks: true,
    fileParallelism: false,
    setupFiles: ["./setupTests.ts"],
    coverage: { provider: "v8" },
  },
});
