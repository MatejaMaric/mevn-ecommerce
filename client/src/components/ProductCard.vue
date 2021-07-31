<template>
  <div class="card mb-3">
    <img :src="ImgLink" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{ Name }}</h5>
      <p class="card-text">Price: ${{ Price }}</p>
      <router-link class="btn btn-dark w-100" :to="ProductLink">Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    Id: String,
    Name: String,
    Img: String,
    Price: Number
  },
  computed: {
    ImgLink() {
      return `${process.env.VUE_APP_ROOT_API}/${this.Img}`;
    },
    ProductLink() {
      return `/product/${this.Id}`
    }
  }
}
</script>
