// src/router.js
import { Router } from '@vaadin/router';

export const setupRouter = (outlet) => {
  const router = new Router(outlet);

  router.setRoutes([
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      component: 'user-list',
    },
    {
      path: '/productos',
      component: 'productos-list',
    },
    {
      path: '/clientes',
      component: 'clientes-list', // Make sure this component exists
    },
    {
      path: '/pedidos',
      component: 'pedidos-list', // Make sure this component exists
    },
    {
      path: '/envios',
      component: 'envios-list', // Make sure this component exists
    },
  ]);
};
