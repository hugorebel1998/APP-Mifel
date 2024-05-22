import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Usuarios from '../pages/users/Usuarios.vue'
import Form from '../pages/users/Form.vue';
import NotFound404 from '../pages/error/NotFound404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      name: 'usuarios',
      path: '/usuarios',
      meta: { title: 'Usuarios' },
      component: () => Usuarios
    },

    {
      name: 'usuarios-crear',
      path: '/usuarios-crear',
      meta: { title: 'Usuarios Crear' },
      component: () => Form
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => NotFound404
    }
  ]
})

export default router
