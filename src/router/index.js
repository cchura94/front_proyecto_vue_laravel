import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Perfil from "../views/admin/Perfil.vue"
import Usuario from "../views/admin/Usuario.vue"
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requireAuth: true}
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
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {redirectIfAuth: true}
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AppLayout, // template 
      meta: {requireAuth: true},
      children: [
        {
          path: 'perfil',
          name: 'Perfil',
          component: Perfil,
          meta: {requireAuth: true}
        },
        {
          path: 'usuario',
          name: 'Usuario',
          component: Usuario,
          meta: {requireAuth: true}
        },
        {
          path: 'categoria',
          name: 'Categoria',
          component: () => import('../views/admin/producto/Categoria.vue'),
          meta: {requireAuth: true}
        }
      ]      
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("access_token");

  if(to.meta.requireAuth){
    if(!token)
      return next({name: 'Login'})
    return next()
  }
  
  if(to.meta.redirectIfAuth && token){
    return next({name: 'Perfil'})
  }

  return next()
})

export default router
