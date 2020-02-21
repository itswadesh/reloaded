<template>
  <div class="w-full my-4">
    <h2 class="text-xl m-2">{{ title }}</h2>
    <carousel :perPage="2" :paginationEnabled="false">
      <slide v-for="p in products" :key="p._id" class="px-2">
        <img class="object-cover w-full h-32" v-lazy="p.img" alt />
        <div class="truncate text-center">{{ p.name }}</div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  props: ["title", "products"],
  components: {
    Carousel,
    Slide
  }
};
</script>

<style></style>
