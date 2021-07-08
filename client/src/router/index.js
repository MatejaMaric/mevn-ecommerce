import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import ExamplePage from '../views/ExamplePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/example',
    name: 'Example',
    component: ExamplePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
