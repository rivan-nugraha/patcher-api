const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [/^win/.test(process.platform) ? 'npm.cmd run run:dev --trace-warnings' : 'npm run run:dev --trace-warnings'],
        blocking: false,
        parallel: true
      }
    })
  ]
})
