


const home = () => import('../pages/home.vue')
const test = () => import('../pages/test.vue')
const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/test',
    component: test
  },
]
export default routes