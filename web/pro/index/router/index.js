const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../view/home.vue'),
    children: [
      {
        path: '/new1',
        name: 'new1',
        component: () => import('../view/new.vue')
      },
      {
        path: '/about1',
        name: 'about1',
        component: () => import('../view/about.vue')
      },
    ]
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../view/new.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../view/about.vue')
  },
  {
    path: '/*',
    name: '404',
    component: () => import('../../../components/404.vue')
  }
]

export default {
  routes
}