import { createRouter, createWebHistory } from 'vue-router'
import BankSearch from '@/views/BankSearch.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BankSearch,
      children: [
        {
          path: ':bankCode/:branchCode/:branchName',
          name: 'bankSearch',
          component: BankSearch,
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
