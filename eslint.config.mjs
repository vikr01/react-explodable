import "./scripts/tsnode.mjs";
import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import { createConfig } from "@vikr01/eslint-config";
import { createRequire } from "module";
import { join as pathJoin } from "path";
import { getPackagePath } from "@vikr01/workspaces-helpers";

const require = createRequire(import.meta.url);
const tsConfigPath = require.resolve("./tsconfig.json");

export default defineConfig(
  createConfig({
    browser: {
      files: [
        pathJoin(
          getPackagePath("react-explodable-example"),
          "./**/*.{ts,tsx,js,jsx}",
        ),
      ],
      react: true,
    },
    json: false,
    typescript: true,
    tsConfigPath,
  }),
  globalIgnores(["packages/*/dist"]),
);
