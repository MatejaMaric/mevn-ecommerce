<template>
  <div class="row mt-5 d-flex justify-content-center">
    <div class="col-md-6">
      <div v-if="orders">
        <div v-for="order in orders" :key="order._id" class="card bg-dark text-white mb-3">
          <div class="card-header">Order made: {{ getDate(order) }}</div>
          <div class="card-body">
            <ul class="list-group">
              <li v-for="item in order.items" :key="item.productId"
                class="list-group-item d-flex justify-content-between align-items-start">
                <div class="me-auto" v-text="item.name"></div>
                <span class="badge bg-dark rounded-circle" v-text="item.quantity"></span>
              </li>
            </ul>
          </div>
          <div class="card-footer">
            Delivering to: {{ getShipping(order) }}
          </div>
        </div>
      </div>
      <div v-else class="card text-center fw-bold">
        You currently have no orders.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  mounted() {
    this.$store.dispatch('pullUserOrders');
  },
  computed: {
    orders() {
      return this.$store.getters.getUserOrders;
    }
  },
  methods: {
    getDate(order) {
      let dt = new Date(order.updatedAt);
      return `${dt.getUTCDay()}.${dt.getUTCMonth()}.${dt.getUTCFullYear()}. ${dt.getUTCHours()}:${dt.getUTCMinutes()} UTC`;
    },
    getShipping(order) {
      return Object.values(order.shipping.address).join(", ");
    }
  }
}
</script>
