<template>
  <div class="mb-4" v-if="products">
    <!-- <h3 class="font-bold mb-2 px-3 text-2xl"></h3> -->
    <Carousel :products="products.data" title="Chef's today's menu" />
  </div>
</template>

<script>
import Product from '~/components/Product.vue'
import Carousel from '~/components/home/Carousel2'
import products from '~/gql/product/products.gql'

export default {
  props: ['vendor'],
  data() {
    return { products: null }
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.products = (
        await this.$apollo.query({
          query: products,
          variables: { vendor: this.vendor },
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
    Carousel,
    Product
  }
}
</script>

<style></style>
