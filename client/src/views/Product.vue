<template>
  <div class="mt-5 d-flex justify-content-center">
    <div class="card col-md-8">
      <div class="row g-0">

        <div class="col-md-6">
          <img :src="productImg" class="img-fluid rounded-start">
        </div>

        <div class="col-md-6">
          <div class="card-body">
            <h3 class="card-title" v-text="productName"></h3>
            <b><i>Price: ${{ productPrice }}</i></b><br/>
            <p class="card-text" v-text="productDescription"></p>
            <div class="btn btn-dark" @click="buy">Add to cart</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Product',
  async mounted() {
    await axios.get(`${process.env.VUE_APP_ROOT_API}/products/${this.$route.params.id}`)
      .then(response => {
        this.productName = response.data.name;
        this.productDescription = response.data.description;
        this.productImg =  `${process.env.VUE_APP_ROOT_API}/${response.data.imagePath}`;
        this.productPrice = response.data.price;
      })
      .catch(error => console.error(error));
  },
  data() {
    return {
      productName: String,
      productDescription: String,
      productImg: String,
      productPrice: Number
    }
  },
  methods: {
    buy() {
      this.$store.commit('addToCart', {
        _id: this.$route.params.id,
        name: this.productName,
        price: this.productPrice
      });
    }
  }
}
</script>
