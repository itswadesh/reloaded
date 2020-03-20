<template>
  <div class="w-full my-4">
    <h2 class="text-xl m-2">{{ title }}</h2>
    <carousel :perPage="2" :paginationEnabled="false">
      <slide v-for="p in products" :key="p.id" class>
        <Product :p="p" />
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
