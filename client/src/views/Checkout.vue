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
      <div class="col-md-4 card p-2" v-if="cartSize">
        <div ref="paypal"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
      const dispatch = this.$store.dispatch;

      window.paypal.Buttons({
        async createOrder() {
          return await dispatch('createOrder');
        },
        async onApprove(data) {
          const success = await dispatch('captureOrder', data.orderID);
          if (success === true)
            console.log('Successfully paid!');
          else
            console.log('Capturing order failed!');
        },
        onError(err) {
          console.error(err);
        }
      }).render(this.$refs.paypal);
    }
  }
}
</script>
