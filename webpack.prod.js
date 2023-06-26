const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  externals: {
    saslprep: "require('saslprep')",
    "swagger-ui-express": "require('swagger-ui-express')"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "kresno-pusat-api.js"
  }
});
