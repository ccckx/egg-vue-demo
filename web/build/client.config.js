const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./build/utils')
const isProduction = process.env.NODE_ENV === 'production'
const baseConfig = {
  outputDir: '../app/web/${pro}web',
  productionSourceMap: true,
  css: {
    extract: true,
  },
  publicPath: isProduction ? '../${pro}web' : 'http://localhost:${port}',
  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  configureWebpack: {
    entry: '../.elscms/${pro}web/entry-client.js',
    devtool: 'source-map',
    target: 'web',
    plugins: [
      new VueSSRClientPlugin(),
      new CopyWebpackPlugin([{
        from: __dirname + '/pro/${pro}/public',
        to: __dirname + '../../app/web/${pro}web/public',
        ignore: ['.*']
      }])
    ]
  }
}
const config = hasMainConfig ?  utils.mergeConfig(baseConfig, mainConfig) : baseConfig
module.exports = config