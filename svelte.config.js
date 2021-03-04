const path = require("path");
const sass = require("sass");
const sveltePreprocess = require("svelte-preprocess");
const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  preprocess: sveltePreprocess({
    scss: {
      renderSync: true,
      implementation: sass,
      includePaths: [path.resolve(__dirname, "src", "scss")],
    },
    postcss: {
      configFilePath: path.resolve(__dirname, "postcss.config.js"),
    },
    sourceMap: !prod,
    defaults: { markup: "html", script: "typescript", style: "scss" },
  }),
};
