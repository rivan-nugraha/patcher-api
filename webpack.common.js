const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/server.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
