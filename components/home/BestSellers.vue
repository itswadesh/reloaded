<template>
  <div v-if="bestSellers">
    <div class v-if="bestSellers.t && bestSellers.t.length>0">
      <Carousel :products="bestSellers.t" :title="`Best Sellers on ${bestSellers.t[0]._id.date}`" />
    </div>
    <div class="mt-4" v-if="bestSellers.t1 && bestSellers.t1.length>0">
      <Carousel
        :products="bestSellers.t1"
        :title="`Best Sellers on ${bestSellers.t1[0]._id.date}`"
      />
    </div>
    <div class="mt-4" v-if="bestSellers.t3 && bestSellers.t3.length>0">
      <Carousel
        :products="bestSellers.t2"
        :title="`Best Sellers on ${bestSellers.t2[0]._id.date}`"
      />
    </div>
    <div class="mt-4" v-if="bestSellers.t3 && bestSellers.t3.length>0">
      <Carousel
        :products="bestSellers.t3"
        :title="`Best Sellers on ${bestSellers.t3[0]._id.date}`"
      />
    </div>
    <div class="mt-4" v-if="bestSellers.t4 && bestSellers.t4.length>0">
      <Carousel
        :products="bestSellers.t4"
        :title="`Best Sellers on ${bestSellers.t4[0]._id.date}`"
      />
    </div>
  </div>
</template>

<script>
import Carousel from './CarouselBestSeller'
import bestSellers from '~/gql/product/bestSellers.gql'
import FoodItem from './FoodItem.vue'

export default {
  data() {
    return { bestSellers: null }
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.bestSellers = (
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
    FoodItem
  }
}
</script>

<style></style>
