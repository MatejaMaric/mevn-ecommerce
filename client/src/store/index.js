import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    currentProduct: {},
    cart: [],
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    userOrders: []
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
    },
    isLoggedIn(state) {
      return !!state.token;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
    getUserOrders(state) {
      return state.userOrders;
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
    },
    auth_set(state, token, isAdmin) {
      state.token = token;
      state.isAdmin = isAdmin;
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', isAdmin);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    auth_clean(state) {
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      delete axios.defaults.headers.common['Authorization'];
    },
    setUserOrders(state, orders) {
      state.userOrders = orders;
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
        .post(`${process.env.VUE_APP_ROOT_API}/transactions/setup`, checkoutRequest)
        .then(response => response.data.orderId)
        .catch(err => console.error(err));

      return orderId;
    },
    async captureOrder(context, orderId) {
      return await axios
        .post(`${process.env.VUE_APP_ROOT_API}/transactions/capture`, {orderId})
        .then(() => true)
        .catch(err => console.error(err));
    },
    login(context, loginData) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_ROOT_API}/login`, loginData)
          .then(response => {
            context.commit('auth_set', response.data.token, response.data.isAdmin);
            resolve(response);
          })
          .catch(error => reject(error));
      });
    },
    register(context, registerData) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_ROOT_API}/register`, registerData)
          .then(response => {
            context.commit('auth_set', response.data.token, response.data.isAdmin);
            resolve(response);
          })
          .catch(error => reject(error));
      });
    },
    pullUserOrders(context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_ROOT_API}/transactions/personal`)
          .then(response => {
            context.commit('setUserOrders', response.data);
            resolve(response);
          })
          .catch(error => reject(error));
      });
    }
  },
  modules: {
  }
})
