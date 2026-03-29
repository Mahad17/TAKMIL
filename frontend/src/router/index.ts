import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/PublicView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PublicView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      // Navigation Guard: Baghair token ke login par bhej dega
      beforeEnter: (to, from, next) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
          next('/login')
        } else {
          next()
        }
      },
    },
  ],
})

export default router
