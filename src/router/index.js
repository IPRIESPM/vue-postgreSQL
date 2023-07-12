import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: DashboardView,
    },
    {
      path: '/profesores',
      name: 'profesores',
      component: DashboardView,
    },
    {
      path: '/contactos',
      name: 'contactos',
      component: DashboardView,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: DashboardView,
    },
  ],
});

export default router;
