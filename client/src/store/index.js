import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    cart: []
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getCart(state) {
      return state.cart.sort((x, y) => x.name > y.name);
    },
    getCartSize(state) {
      let sum = 0;
      state.cart.forEach(x => sum += x.quantity);
      return sum;
    },
    getCartPrice(state) {
      let sum = 0;
      state.cart.forEach(x => sum += x.price * x.quantity);
      return sum;
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      let foundProduct = state.cart.find(x => x.id == product._id);
      if (foundProduct)
        foundProduct.quantity++;
      else
        state.cart.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
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
