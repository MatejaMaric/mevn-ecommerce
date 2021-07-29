import {createApp} from 'vue';
import axios from 'axios';

const tokenInStorage = localStorage.getItem('token');
if (tokenInStorage) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokenInStorage}`;
}

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/bootstrap.scss';
import 'bootstrap';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
