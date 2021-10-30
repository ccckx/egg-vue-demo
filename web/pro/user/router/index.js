import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: '/user',
  routes:[
    {
      path: '/',
      name: 'user',
      component: () => import('../view/home.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('../view/new.vue')
    },
    {
      path: '/*',
      name: '404',
      component: () => import('../../../components/404.vue')
    }
  ]
})