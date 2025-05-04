import { createRouter, createWebHistory } from 'vue-router'
import _indexView from '@/views/_indexView.vue'
import { checkAuth } from '@/api/auth.api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: _indexView,
    },
  ],
})

router.beforeEach(async(to, from, next) => {
  if(!!(await checkAuth())) {
    console.log('USER ЕСТЬ');
  } else {
    console.log('Нет USERа');
  }
  next()
})

export default router
