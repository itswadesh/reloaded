<template>
  <div class="rounded shadow border mx-2 mb-2 relative" v-if="p">
    <!-- <img
      :src="p.type === 'V' ? 'veg.png' : 'non-veg.png'"
      class="absolute w-5 top-0 right-0 mr-1 mt-1"
    />-->
    <nuxt-link :to="`/${p.slug}`">
      <img v-lazy="`${p.img}`" alt class="w-full object-cover h-24 mb-2" />
    </nuxt-link>
    <div class="px-2">
      <div v-if="p.ratings">
        <Ratingcircle :rating="p.ratings" class="m-review" />
        <div class="pl-2 review-font">{{ p.reviews }} reviews</div>
      </div>
      <nuxt-link :to="`/${p.slug}`">
        <h2 class="text-xs font-bold tracking-wide">{{ p.name }}</h2>
      </nuxt-link>
      <p>{{ p.description }}</p>
      <div class="flex flex-wrap justify-between items-center my-2">
        <div class="font-bold">{{ p.price | currency }}</div>
        <div v-if="p.stock<1" class="text-red-500 text-xs">Out of stock</div>
        <div v-else class="text-red-500 text-xs">Only {{ p.stock }} left</div>
        <img :src="p.type === 'V' ? 'veg.png' : 'non-veg.png'" class="w-5 mr-1 mt-1" />
      </div>
      <div class="border-t py-1 text-xs" v-if="p.vendor">By {{ p.vendor.info.restaurant }}</div>
    </div>
  </div>
</template>

<script>
import Ratingcircle from './Ratingcircle'
export default {
  props: ['p'],
  methods: {},
  components: { Ratingcircle }
}
</script>

<style></style>
