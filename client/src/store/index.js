import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: []
  },
  getters: {
    getProducts(state) {
      return state.products;
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    async pullProducts(context) {
      await axios.get(`${process.env.VUE_APP_ROOT_API}/products`)
        .then(response => context.commit('setProducts', response.data))
        .catch(error => console.error(error));
    }
  },
  modules: {
  }
})
