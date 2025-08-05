import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/adresses',
      name: 'adresses',
      component: () => import('@/views/Adresses.vue'),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  const noAuthPage = ['login', 'register']

  if (noAuthPage.includes(to.name) && userStore.isAuthenticated) {
    return { name: 'home' }
  }

  if (!noAuthPage.includes(to.name) && !userStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
