<template>
  <div class="row mt-5">
    <div v-for="product in products" :key="product._id" class="col-lg-3 col-md-4 col-sm-6">
      <ProductCard :Id="product._id" :Name="product.name" :Price="product.price" :Img="product.imagePath"/>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard';

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  mounted() {
    this.$store.dispatch('pullProducts');
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    }
  }
}
</script>
