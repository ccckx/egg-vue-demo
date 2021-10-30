const Controller = require('egg').Controller

class HomeController extends Controller {
  async vuessr() {
    const { ctx, app } = this
    const body = await app.vuessr({
			url: ctx.originalUrl,
      ctx
		})
    ctx.body = body
  }

  async vuespa() {
    const { ctx, app } = this
    app.vue({
			url: ctx.originalUrl,
      ctx
		}, (html) => {
      ctx.body = html
    })
  }

  async api() {
    const { ctx } = this
    ctx.body = 'index接口数据'
  }
}

module.exports = HomeController
