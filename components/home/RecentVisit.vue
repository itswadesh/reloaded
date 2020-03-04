<template>
  <div>
    <Carousel :products="products" title="Recent Visit" />
  </div>
</template>

<script>
import Carousel from './Carousel'
import products from '~/gql/product/products.gql'

export default {
  data() {
    return { products: [] }
  },
  async created() {
    this.products = (
      await this.$apollo.query({
        query: products,
        fetchPolicy: 'no-cache'
      })
    ).data.products
  },
  components: {
    Carousel
  }
}
</script>

<style></style>
