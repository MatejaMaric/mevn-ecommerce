<template>
  <div class="mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <ul class="list-group">
          <li v-for="item in cart" :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{{ item.name }}</div>
              <i>${{ item.price }}</i>
            </div>
            <span class="badge bg-primary rounded-pill">{{ item.quantity }}</span>
          </li>
        </ul>
        <p class="text-center my-3 fw-bold">You can buy {{ cartSize }} items for ${{ cartPrice }}.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
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
  }
}
</script>
