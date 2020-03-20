<template>
  <div v-if="bestSellers">
    <div class="row center" v-if="bestSellers.t && bestSellers.t.length>0">
      <div class="err-banner">Best Sellers on {{bestSellers.t[0]._id.date}}</div>
    </div>
    <div class="flex overflow-x-auto">
      <div
        class="w-1/2 p-2 shadow-lg"
        v-for="d in bestSellers.t"
        :key="d._id.id"
        @click="go(`/food/${d._id.slug}?id=${d._id.id}`)"
      >
        <FoodItem :d="d._id" class="w-full" />
      </div>
    </div>
    <!-- <adsbygoogle /> -->
    <div class="row center mt-4" v-if="bestSellers.t1 && bestSellers.t1.length>0">
      <div class="err-banner">Best Sellers on {{bestSellers.t1[0]._id.date}}</div>
    </div>
    <div class="flex overflow-x-auto">
      <div
        class="w-1/2 p-2 shadow-lg"
        v-for="d in bestSellers.t1"
        :key="d._id.id"
        @click="go(`/food/${d._id.slug}?id=${d._id.id}`)"
      >
        <FoodItem :d="d._id" class="w-full" />
      </div>
    </div>
    <!-- <adsbygoogle /> -->
    <div class="row center mt-4" v-if="bestSellers.t2 && bestSellers.t2.length>0">
      <div class="err-banner">Best Sellers on {{bestSellers.t2[0]._id.date}}</div>
    </div>
    <div class="flex overflow-x-auto">
      <div
        class="w-1/2 p-2 shadow-lg"
        v-for="d in bestSellers.t2"
        :key="d._id.id"
        @click="go(`/food/${d._id.slug}?id=${d._id.id}`)"
      >
        <FoodItem :d="d._id" class="w-full" />
      </div>
    </div>
    <!-- <adsbygoogle /> -->
    <div class="row center mt-4" v-if="bestSellers.t3 && bestSellers.t3.length>0">
      <div class="err-banner">Best Sellers on {{bestSellers.t3[0]._id.date}}</div>
    </div>
    <div class="flex overflow-x-auto">
      <div
        class="w-1/2 p-2 shadow-lg"
        v-for="d in bestSellers.t3"
        :key="d._id.id"
        @click="go(`/food/${d._id.slug}?id=${d._id.id}`)"
      >
        <FoodItem :d="d._id" class="w-full" />
      </div>
    </div>
    <!-- <adsbygoogle /> -->
    <div class="row center mt-4" v-if="bestSellers.t4 && bestSellers.t4.length>0">
      <div class="err-banner">Best Sellers on {{bestSellers.t4[0]._id.date}}</div>
    </div>
    <div class="flex overflow-x-auto">
      <div
        class="w-1/2 p-2 shadow-lg"
        v-for="d in bestSellers.t4"
        :key="d._id.id"
        @click="go(`/food/${d._id.slug}?id=${d._id.id}`)"
      >
        <FoodItem :d="d._id" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from './Carousel'
import Carousel2 from './Carousel2'
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
    Carousel2,
    FoodItem
  }
}
</script>

<style></style>
