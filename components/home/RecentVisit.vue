<template>
  <div>
    <Carousel :products="products" title="Recent Visit" />
  </div>
</template>

<script>
import Carousel from './Carousel2'
import products from '~/gql/product/products.gql'

export default {
  data() {
    return { products: [] }
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.products = (
        await this.$apollo.query({
          query: products,
          fetchPolicy: 'no-cache'
        })
      ).data.products
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  components: {
    Carousel
  }
}
</script>

<style></style>
