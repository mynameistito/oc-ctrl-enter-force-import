import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: ["@opencode-ai/plugin/tui"],
  },
  dts: {
    sourcemap: true,
  },
  entry: {
    tui: "./index.ts",
  },
  format: ["esm"],
  outDir: "dist",
  sourcemap: true,
});
