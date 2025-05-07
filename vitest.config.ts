import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tsConfigPath = require.resolve("./tsconfig.json");

export default defineConfig({
  test: {
    deps: {
      moduleDirectories: ["node_modules"],
    },
    exclude: ["**/node_modules/**", "packages/*/dist/**"],
    include: ["**/*.test.{ts,tsx}"],
    globals: false,

    reporters: ["verbose"],
    typecheck: {
      tsconfig: tsConfigPath,
    },

    restoreMocks: true,
    clearMocks: true,
    mockReset: true,
    watch: false,
  },

  plugins: [tsconfigPaths({ projects: [tsConfigPath] })],
});
