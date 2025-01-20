import { createRouter, createWebHistory } from 'vue-router'
import BankSearch from '@/views/BankSearch.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BankSearch,
    },
  ],
})

export default router
