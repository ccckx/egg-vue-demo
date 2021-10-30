import Vue from 'vue'
import Router from 'vue-router'
import routes from '../../web/pro/${pro}/router/index.js'

Vue.use(Router)

export default function createRouter() {
  routes.mode = "history"
  routes.base = `/${pro}`
  return new Router(routes);
}