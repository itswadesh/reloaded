<template>
  <div>
    <!-- <div class="flex bg-white justify-between py-4 px-2">
      <input
        type="text"
        class="border text-xl rounded-full w-full"
        name="search"
      />
      <img
        src="img/banners.svg"
        class="h-8 rounded-full w-8 bg-gray-300 ml-2"
      />
    </div>
    <div class="flex justify-between">
      <h1 class="font-bold px-2">Popular of the week</h1>
      <h2 class="font-medium text-sm px-2">Show all (>)</h2>
    </div>-->
    <div class="flex bg-white rounded shadow py-2 px-1 m-2 relative">
      <nuxt-link :to="`/${p.slug}`" class="p-2">
        <img v-lazy="p.img" class="w-32 h-20 rounded object-cover" />
      </nuxt-link>
      <div class="my-2 w-full">
        <nuxt-link v-if="p.vendor" :to="`/chef/${p.vendor.restaurant}`">
          <img
            v-lazy="`/${p.vendor.avatar}`"
            class="object-contain rounded-full h-8 w-8 absolute top-0 right-0 mt-2 mr-2"
          />
        </nuxt-link>
        <nuxt-link :to="`/${p.slug}`" class="font-bold tracking-wide">{{ p.name }}</nuxt-link>
        <div class="flex justify-between">
          <div class="text-gray-500 tracking-widest text-sm">
            <i class="fa fa-map-marker"></i>
            {{p.vendor.restaurant}}
          </div>
          <div class="font-black text-xl text-gray-700">{{ p.rate | currency }}</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <Ratingcircle :rating="p.ratings" class="m-review" />
            <!-- <i class="fa fa-star h-3 w-3 my-2" /> -->
            <!-- <span class="font-medium text-sm text-black mx-1">4.6</!-->
            <!-- <div class="font-medium text-sm text-gray-500">(rating/review)</div> -->
          </div>
          <div class="bg-orange-500 rounded-full text-white text-xs px-3">Free Delivery</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ratingcircle from "./Ratingcircle";
export default {
  props: ["p"],
  methods: {},
  components: { Ratingcircle }
};
</script>

<style></style>
