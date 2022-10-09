import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'list_pokemon' }
      //component: HomeView
    },
    {
      path: '/llista',
      name: 'list_pokemon',
      component: () => import('../views/LlistaPokemonView.vue')
    },
    {
      path: '/llista/:id',
      name: 'card_detail',
      component: () => import('../views/CardDetailView.vue')
    },
    {
      path: '/combat',
      name: 'battle',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BattleView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/pokemons',
      name: 'Llista Pokemon',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LlistaPokemonView.vue')
    }
  ]
})

export default router
