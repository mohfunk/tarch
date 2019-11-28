import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import execute from "rollup-plugin-execute";

import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const name = "tarch";

export default {
  input: "./src/main.ts",
  external: [],

  plugins: [
    resolve({
      extensions
    }),
    commonjs(),
    babel({
      extensions,
      include: ["src/**/*"]
    }),
    execute(`chmod 755 ${pkg.bin}`),
    execute("echo DONE!")
  ],

  output: [{
      file: pkg.bin,
      format: "cjs",
      banner: "#!/usr/bin/env node"
    },
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    },
    {
      file: pkg.browser,
      format: "iife",
      name,
      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {}
    }
  ]
};