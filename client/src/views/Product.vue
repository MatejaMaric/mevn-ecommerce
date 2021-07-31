<template>
  <div class="mt-5 d-flex justify-content-center">
    <div class="card col-md-8 mb-3">
      <div class="row g-0">

        <div class="card-header d-flex align-items-baseline">
          <div class="btn btn-outline-secondary btn-sm ms-auto" @click="back">Go back</div>
        </div>

        <div class="col-md-6">
          <img :src="curProductImg" class="img-fluid rounded-start">
        </div>

        <div class="col-md-6">
          <div class="card-body">
            <h3 class="card-title" v-text="curProduct.name"></h3>
            <h6 class="card-subtitle mb-2 text-muted">Price: ${{ curProduct.price }}</h6>
            <p class="card-text" v-text="curProduct.description"></p>
            <p class="card-text"><small class="text-muted">Amount: {{curProductQuantity}}</small></p>
          </div>
          <div class="card-footer d-flex align-items-baseline">
            <div class="btn btn-dark" @click="buy">Add to cart</div>
            <div class="btn btn-secondary btn-sm ms-md-2 ms-1" v-show="curProductQuantity" @click="remove">Remove from cart</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  async mounted() {
    this.$store.dispatch('pullProduct', this.$route.params.id);
  },
  computed: {
    curProduct() {
      return this.$store.getters.getCurrentProduct;
    },
    curProductImg() {
      return this.$store.getters.getCurrentProductImgUrl;
    },
    curProductQuantity() {
      return this.$store.getters.getCurrentProductQuantity;
    },
  },
  methods: {
    buy() {
      this.$store.commit('addToCart');
    },
    remove() {
      this.$store.commit('removeFromCart', this.$route.params.id);
    },
    back() {
      this.$router.back();
    }
  }
}
</script>
