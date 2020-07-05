


const home = () => import('../pages/home.vue')
const topics = () => import('../pages/topics.vue')
const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/topics',
    component: topics
  },
]
export default routes