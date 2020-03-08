<template>
  <div class="w-full my-4">
    <h2 class="text-md text-secondary p-2">{{ title }}</h2>
    <carousel :perPage="2" :paginationEnabled="false">
      <slide v-for="p in products" :key="p._id.id" class>
        <Product :p="p._id" />
        <!-- <img class="object-cover w-full h-32" v-lazy="p._id.img+'?tr=w-300,h-200'" alt />
        <div class="truncate text-center">{{ p._id.name }}</div>-->
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import Product from '~/components/Product.vue'

export default {
  props: ['title', 'products'],
  components: {
    Carousel,
    Slide,
    Product
  }
}
</script>

<style></style>
