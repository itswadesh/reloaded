<template>
  <div>
    <Carousel :products="products" title="Popular" />
  </div>
</template>

<script>
import Product from '~/components/Product.vue'
import Carousel from './Carousel2'
import popular from '~/gql/product/popular.gql'

export default {
  data() {
    return { products: [] }
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.products = (
        await this.$apollo.query({
          query: popular,
          fetchPolicy: 'no-cache'
        })
      ).data.popular.data
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  components: {
    Carousel,
    Product
  }
}
</script>

<style></style>
