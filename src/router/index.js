import { createRouter, createWebHistory } from 'vue-router'
import Recommend from '@/views/recommend/Recommend.vue'

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/toplist',
    name: 'toplist',
    component: () => import('@/views/toplist/TopList.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/Search.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
