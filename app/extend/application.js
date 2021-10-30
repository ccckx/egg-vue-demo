const isProd = process.env.NODE_ENV === 'production'
const vueRender = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')

const title = 'ELScms'
const description = 'Elscms结合egg和vue，可以做ssr、spa渲染，支持前端微应用'
const keywords = 'ELScms、vuessr、vue微应用'

const getHtml = function (content, {devPro}, callback) {
	let pro = content.url.split('/')[1] || 'index'
	let proFileName = pro + 'web'

	if (isProd || !devPro.includes(pro)) {
		template = fs.readFileSync(path.join(__dirname,`../web/${proFileName}/index.html`),'utf-8')
		callback(template)
	} else {
		template = fs.readFileSync(path.join(__dirname,`../../.elscms/${proFileName}/index.html`),'utf-8')
		callback(template)
	}
}

const getHtmlSsr = async (content, {devPro}, callback) => {
	let pro = content.url.split('/')[1] || 'index'
	let proFileName = pro + 'web'

	content.url = content.url.replace(`/${pro}`, '')
	content.title = content.title || title
	content.description = content.description || description
	content.keywords = content.keywords || keywords

	if (isProd || !devPro.includes(pro)) {
		let serverBundle, template, clientBundle
		serverBundle = JSON.parse(fs.readFileSync(path.join(__dirname,`../web/${proFileName}/vue-ssr-server-bundle.json`),'utf-8'))
		template = fs.readFileSync(path.join(__dirname,`../web/${proFileName}/ssr.html`),'utf-8')
		clientBundle = JSON.parse(fs.readFileSync(path.join(__dirname,`../web/${proFileName}/vue-ssr-client-manifest.json`),'utf-8'))

		let render = vueRender.createBundleRenderer(serverBundle,{
			template,
			clientManifest:clientBundle,
			runInNewContext:false,
			shouldPrefetch: (file, type) => {
				return false
			},
			shouldPreload: () => {
				return false
			},
		})
		return await render.renderToString(content)
	} else {
		let serverBundle, template, clientBundle
		serverBundle = JSON.parse(fs.readFileSync(path.join(__dirname,`../../.elscms/${proFileName}/server.json`),'utf-8').toString())
		template = fs.readFileSync(path.join(__dirname,`../../web/pro/${pro}/ssr.html`),'utf-8')
		clientBundle = JSON.parse(fs.readFileSync(path.join(__dirname,`../../.elscms/${proFileName}/client.json`),'utf-8').toString())

		let render = vueRender.createBundleRenderer(serverBundle,{
			template, 
			clientManifest:clientBundle,
			runInNewContext:false,
			shouldPrefetch: (file, type) => {
				return false
			},
			shouldPreload: () => {
				return false
			},
		})
		return await render.renderToString(content)
	}
}

module.exports = {
	vue(content, callback) {
		getHtml(content, {devPro: this.config.devPro || []}, callback)
	},
	async vuessr(content, callback) {
		return await getHtmlSsr(content, {devPro: this.config.devPro || []}, callback)
	}
}