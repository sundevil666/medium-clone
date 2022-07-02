import { createRouter, createWebHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed.vue'

const routes = [
  {
    path: '/',
    name: 'GlobalFeed',
    component: GlobalFeed,
  },
  {
    path: '/feed',
    name: 'YourFeed',
    component: () => import('@/views/YourFeed.vue'),
  },
  {
    path: '/tags/:slug',
    name: 'Tag',
    component: () => import('@/views/TagFeed.vue'),
  },
  {
    path: '/articles/new',
    name: 'CreateArticle',
    component: () => import('@/views/CreateArticle.vue'),
  },
  {
    path: '/articles/:slug',
    name: 'Articles',
    component: () => import('@/views/Article.vue'),
  },
  {
    path: '/articles/:slug/edit',
    name: 'EditArticles',
    component: () => import('@/views/EditArticle.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
  },
  {
    path: '/profiles/:slug',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue'),
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'UserProfileFavorites',
    component: () => import('@/views/UserProfile.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
