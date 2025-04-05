// src/router.js
import { Router } from '@vaadin/router';

export const setupRouter = (outlet) => {
  const router = new Router(outlet);

  router.setRoutes([
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      component: 'app-dashboard',
    },
    {
      path: '/productos',
      component: 'productos-list',
    },
    {
      path: '/clientes',
      component: 'clientes-list',
    },
    {
      path: '/pedidos',
      component: 'pedidos-list',
    },
    {
      path: '/envios',
      component: 'envios-list',
    },
  ]);
};
