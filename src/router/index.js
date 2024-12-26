import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharactersView from '../views/CharactersView.vue'
import CharacterDetailsView from '../views/CharacterDetailsView.vue'
import ComicDetailsView from '../views/ComicDetailsView.vue'
import ComicsView from '../views/ComicsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView,
    },
    {
      path: '/character/:id',
      name: 'character',
      component: CharacterDetailsView,
    },
    {
      path: '/comics',
      name: 'comics',
      component: ComicsView,
    },
    {
      path: '/comic/:id',
      name: 'ComicDetails',
      component: ComicDetailsView,
    }
  ],
})

export default router
