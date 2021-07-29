<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">MEVN Shop</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/checkout">
              Checkout
              <span class="badge bg-light rounded-pill text-dark" v-text="cartSize"></span>
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0" v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/register">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/login">Login</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0" v-else>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/orders">Orders</router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link" @click="logout">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  created() {
    axios.interceptors.response.use(undefined, error => {
      if (error.status === 401) {
        this.$store.commit('auth_clean');
      }
      return Promise.reject(error);
    });
  },
  computed: {
    cartSize() {
      return this.$store.getters.getCartSize;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.commit('auth_clean');
    }
  }
}
</script>

<style lang="scss"></style>
