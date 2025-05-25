import { type Options } from "tsup";
import cpy from "cpy";
import { resolve } from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tsConfigPath = require.resolve("./tsconfig.json");

export const tsupBaseConfig: Options = {
  entry: ["src", "!src/**/__tests__/**", "!src/**/*.test.*"],
  outDir: "dist",
  format: ["esm"],
  sourcemap: false,
  splitting: false,
  minify: false,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },

  dts: true,
  clean: true,
  skipNodeModulesBundle: true,

  esbuildOptions(options) {
    options.tsconfig = tsConfigPath;
  },

  onSuccess: async () => {
    const cwd = process.cwd();
    const srcDir = resolve(cwd, "src");
    const outDir = resolve(cwd, "dist");

    await cpy(["**/*", "!**/*.{ts,tsx,js,jsx}"], outDir, {
      cwd: srcDir,
    });
  },
};
