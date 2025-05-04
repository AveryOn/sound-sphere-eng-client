import { createRouter, createWebHistory } from 'vue-router'
import _indexView from '@/views/_indexView.vue'
import ThemesView from '@/views/ThemesView.vue'
import { checkAuth } from '@/api/auth.api'
import AuthView from '@/views/AuthView.vue'
import StatisticsView from '@/views/StatisticsView.vue'

/**
 * Карта всех имен маршрутов клиента
 */
const ROUTER_NAMES = {
  main: 'main',
  auth: 'auth',
  themes: 'themes',
  statistics: 'statistics',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: _indexView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/themes',
      name: 'themes',
      component: ThemesView,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
    },
  ],
})

router.beforeEach(async(to, from, next) => {
  const userData = await checkAuth()
  if(userData !== null) {
    if(to.name !== ROUTER_NAMES.themes) {
      return next({ 
        name: ROUTER_NAMES.themes 
      })
    }
  } 
  else {
    if(to.name !== ROUTER_NAMES.auth)
    return next({ 
      name: ROUTER_NAMES.auth 
    })
  }
  next()
})

export default router
