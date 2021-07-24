<template>
  <div class="row">
    <div class="col-md-4">
      <img :src="productImg">
    </div>
    <div class="col-md-4">
      <h3>{{ productName }}</h3>
      <p>{{ productDescription }}</p>
      <div class="btn btn-primary" @click="buy">Add to cart</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      productName: String,
      productDescription: String,
      productImg: String
    }
  },
  methods: {
    buy() {

    }
  }
}
</script>
