import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import summary from "rollup-plugin-summary"
import { builtinModules} from "module"
import { dependencies } from "./package.json"

export default defineConfig({
  external: builtinModules.concat(Object.keys(dependencies)),
  input: "./src/markdown-page-renderer.ts",
  plugins: [
    nodeResolve(),
    typescript(),
    summary(),
  ],
  output: {
    format: "cjs",
    file: "dist/markdown-page-renderer.js",
    sourcemap: true,
  },
})
