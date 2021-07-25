<template>
  <div class="mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6 card">
        <ul class="list-group list-group-flush">
          <li v-for="item in cart" :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{{ item.name }}</div>
              <i>${{ item.price }}</i>
            </div>
            <span class="badge bg-primary rounded-pill">{{ item.quantity }}</span>
            <span class="badge bg-danger rounded-pill ms-2" @click="remove(item.id)">x</span>
          </li>
        </ul>
        <p class="text-center my-3 fw-bold">You can buy {{ cartSize }} items for ${{ cartPrice }}.</p>
      </div>
      <div class="col-md-4 card p-2">
        <div ref="paypal"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Checkout',
  mounted() {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.VUE_APP_PAYPAL_CLIENT_ID}&disable-funding=credit`;
    script.addEventListener("load", this.paypalLoaded);
    document.body.appendChild(script);
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    cartSize() {
      return this.$store.getters.getCartSize;
    },
    cartPrice() {
      return this.$store.getters.getCartPrice;
    }
  },
  methods: {
    remove(id) {
      this.$store.commit('removeFromCart', id);
    },
    paypalLoaded() {
      const checkoutRequest = {items: this.$store.getters.getCart};

      window.paypal.Buttons({
        async createOrder() {
          const orderId = await axios
            .post(`${process.env.VUE_APP_ROOT_API}/transaction/setup`, checkoutRequest)
            .then(response => response.data.orderId)
            .catch(err => console.error(err));

          return orderId;
        },
        async onApprove(data) {
          await axios
            .post(`${process.env.VUE_APP_ROOT_API}/transaction/capture`, {orderId: data.orderID})
            .then(() => console.log('Paid successfully!'))
            .catch(err => console.error(err));
        },
        onError(err) {
          console.error(err);
        }
      }).render(this.$refs.paypal);
    }
  }
}
</script>
