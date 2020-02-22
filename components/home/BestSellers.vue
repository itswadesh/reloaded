<template>
  <div>
    <Carousel :products="products" title="Best Sellers" />
  </div>
</template>

<script>
import Carousel from "./Carousel";

export default {
  data() {
    return { products: [] };
  },
  async created() {
    let products = await this.$axios.$get("api/foods");
    this.products = products.data;
  },
  components: {
    Carousel
  }
};
</script>

<style></style>
