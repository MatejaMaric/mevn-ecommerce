import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    currentProduct: {},
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
    },
    getCurrentProduct(state) {
      return state.currentProduct;
    },
    getCurrentProductImgUrl(state) {
      return `${process.env.VUE_APP_ROOT_API}/${state.currentProduct.imagePath}`;
    },
    getCurrentProductQuantity(state) {
      let amount = 0
      state.cart.forEach(x => {
        if (x.id == state.currentProduct._id)
          amount = x.quantity;
      });
      return amount;
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCurrentProduct(state, product) {
      state.currentProduct = product;
    },
    addToCart(state) {
      let foundProduct = state.cart.find(x => x.id == state.currentProduct._id);
      if (foundProduct)
        foundProduct.quantity++;
      else
        state.cart.push({
          id: state.currentProduct._id,
          name: state.currentProduct.name,
          price: state.currentProduct.price,
          quantity: 1
        });
    },
    removeFromCart(state, productId) {
      let foundProduct = state.cart.find(x => x.id == productId);
      if (foundProduct) {
        foundProduct.quantity--;
        if (foundProduct.quantity == 0)
          state.cart = state.cart.filter(x => x.id != foundProduct.id);
      }
    },
    clearCart(state) {
      state.cart.length = 0;
    }
  },
  actions: {
    async pullProducts(context) {
      await axios.get(`${process.env.VUE_APP_ROOT_API}/products`)
        .then(response => context.commit('setProducts', response.data))
        .catch(error => console.error(error));
    },
    async pullProduct(context, productId) {
      await axios.get(`${process.env.VUE_APP_ROOT_API}/products/${productId}`)
        .then(response => context.commit('setCurrentProduct', response.data))
        .catch(error => console.error(error));
    },
    async createOrder(context) {
      const checkoutRequest = {items: context.state.cart};

      const orderId = await axios
        .post(`${process.env.VUE_APP_ROOT_API}/transaction/setup`, checkoutRequest)
        .then(response => response.data.orderId)
        .catch(err => console.error(err));

      return orderId;
    },
    async captureOrder(context, orderId) {
      return await axios
        .post(`${process.env.VUE_APP_ROOT_API}/transaction/capture`, {orderId})
        .then(() => true)
        .catch(err => console.error(err));
    }
  },
  modules: {
  }
})
