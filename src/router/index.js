import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ContactCard from '../pages/ContactCard.vue'
import CreatingContact from '../pages/CreatingContact.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/contactCard/:id',
    name: 'contactCard',
    component: ContactCard
  },
  {
    path: '/creatingContact',
    name: 'creatingContact',
    component: CreatingContact
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
