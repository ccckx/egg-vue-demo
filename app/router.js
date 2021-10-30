module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.vuessr)

  router.get('/index', controller.home.vuessr)
  router.get('/index/*', controller.home.vuessr)
  router.get('/api/index/*', controller.home.api)

  router.get('/user', controller.home.vuespa)
  router.get('/user/*', controller.home.vuespa)
  router.get('/api/index/*', controller.home.api)
}
