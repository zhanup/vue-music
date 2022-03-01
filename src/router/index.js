import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/mainLayout'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
  {
    path: '/toplist',
    name: 'toplist',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'toplist',
        component: () => import('@/views/toplist/Toplist.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'search',
        component: () => import('@/views/search/Search.vue')
      }
    ]
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('@/views/playlist/Playlist.vue')
  },
  {
    path: '/playlist/:id',
    name: 'detail',
    component: () => import('@/views/playlist/Detail.vue')
  },
  {
    path: '/album/:id',
    name: 'album',
    component: () => import('@/views/album/Album.vue')
  },
  {
    path: '/artist/:id',
    name: 'artist',
    component: () => import('@/views/artist/Artist.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
