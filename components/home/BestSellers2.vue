<template>
  <div>
    <Carousel2 :products="products" title="Best Sellers" />
  </div>
</template>

<script>
import Carousel from './Carousel'
import Carousel2 from './Carousel2'
import bestSellers from '~/gql/product/bestSellers.gql'

export default {
  data() {
    return { products: [] }
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.products = (
        await this.$apollo.query({
          query: bestSellers,
          fetchPolicy: 'no-cache'
        })
      ).data.bestSellers
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  components: {
    Carousel,
    Carousel2
  }
}
</script>

<style></style>
