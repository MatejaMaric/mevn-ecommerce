<template>
  <div class="row mt-5">
    <div class="col-lg-3 col-md-4 col-sm-6">
      <ProductCard/>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard';

export default {
  name: 'Home',
  components: {
    ProductCard
  }
}
</script>
