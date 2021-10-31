const utils = require('./build/utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const baseConfig = {
	outputDir: '../app/web/${pro}web',
	publicPath: isProduction ? '../${pro}web' : 'http://127.0.0.1:${port}',
	devServer: {
    historyApiFallback: true,
		headers: { 'Access-Control-Allow-Origin': '*' }
  },
	configureWebpack: {
		entry: './pro/${pro}/main.js',
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './pro/${pro}/index.html',
				inject: true
			})
    ]
	}
}
const config = hasMainConfig ? utils.mergeConfig(baseConfig, mainConfig) : baseConfig

module.exports = config