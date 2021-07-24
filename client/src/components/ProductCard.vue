<template>
  <div class="card">
    <img :src="productImg" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{ productName }}</h5>
      <a :href="productLink" class="btn btn-dark w-100">Details</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    productName: String,
    productImg: String,
    productLink: String
  }
}
</script>
