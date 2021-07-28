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
  <Modal :title="modalTitle" v-if="showModal" @close="showModal = false">
    <p v-text="modalText"></p>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'Checkout',
  components: {
    Modal
  },
  mounted() {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.VUE_APP_PAYPAL_CLIENT_ID}&disable-funding=credit`;
    script.addEventListener("load", this.paypalLoaded);
    document.body.appendChild(script);
  },
  data() {
    return {
      showModal: false,
      modalTitle: '',
      modalText: ''
    };
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
      window.paypal.Buttons({
        createOrder: async () => {
          return await this.$store.dispatch('createOrder');
        },

        onApprove: async (data) => {
          const success = await this.$store.dispatch('captureOrder', data.orderID);

          if (success === true) {
            this.modalTitle = 'Success!';
            this.modalText = 'Your purchase should arrive within 7 days!';
            this.$store.commit('clearCart');
          }
          else {
            this.modalTitle = 'Failure!';
            this.modalText = 'Your order was not successfully paid! Check your funds or try again later.';
          }

          this.showModal = true;
        },

        onError: (err) => {
          this.modalTitle = 'Error!';
          this.modalText = 'Error occurred! Please try again later.';
          this.showModal = true;

          console.error(err);
        }
      }).render(this.$refs.paypal);
    }
  }
}
</script>
