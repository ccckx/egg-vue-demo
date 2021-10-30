const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  outputDir: '../app/web/${pro}web',
  productionSourceMap: true,
  css: {
    extract: false,
  },
  publicPath: isProduction ? '../${pro}web' : 'http://localhost:${port}',
  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  configureWebpack: {
    entry: '../.elscms/${pro}web/entry-server.js',
    devtool: 'source-map',
    target: 'node',
    output: {
      libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({
      allowlist: /\.css$/,
    }),
    plugins: [
      new VueSSRServerPlugin(),
      new HtmlWebpackPlugin({
        filename: 'ssr.html',
        template: './pro/${pro}/ssr.html',
        inject: false,
        minify: false
      })
    ],
  },
  chainWebpack: (config) => {
    config.plugins.delete('hmr');
    config.optimization.splitChunks(undefined);
  },
};
