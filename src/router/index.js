import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Dasboard from '@/pages/Dasboard.vue'
import Usuarios from '@/pages/users/Usuarios.vue'
import Form from '@/pages/users/Form.vue';
import Perfil from '@/pages/users/Perfil.vue'
import NotFound404 from '@/pages/error/NotFound404.vue'
import MainLayout from '@/layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dasboard',
      name: 'dasboard',
      meta: { layout: MainLayout, title: 'Dashboard' },
      component: Dasboard
    },

    {
      name: 'usuarios',
      path: '/usuarios',
      meta: { layout: MainLayout, title: 'Usuarios' },
      component: () => Usuarios
    },
    {
      name: 'usuarios-crear',
      path: '/usuarios-crear',
      meta: { layout: MainLayout, title: 'Usuarios Crear' },
      component: () => Form
    },
    {
      name: 'perfil',
      path: '/perfil/:id',
      meta: { layout: MainLayout, title: 'Ver información' },
      component: () => Perfil
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => NotFound404
    }
  ]
})

export default router
