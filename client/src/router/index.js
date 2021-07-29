import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';
import Checkout from '@/views/Checkout.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

import store from '@/store/index';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  if (to.matched.some(record => record.meta.guest) && store.getters.isLoggedIn)
    return false;

  if (to.matched.some(record => record.meta.admin) && !store.getters.isAdmin)
    return false;

  if (to.matched.some(record => record.meta.auth) && !store.getters.isLoggedIn) {
    from.params.nextUrl = to.fullPath;
    return '/login';
  }

  return true;
});

export default router;
