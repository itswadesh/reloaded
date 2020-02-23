<template>
  <div>
    <nuxt-link
      to="/chef"
      class="block bg-yellow-400 py-1 px-2 mx-auto text-center cursor-pointer hover:text-black"
    >Get started as chef in 30 seconds</nuxt-link>
    <Hero />
    <div class="container antialiased min-h-screen">
      <Categories />
      <!-- <BestSellers />
      <RecentVisit />-->
      <div class="flex flex-wrap">
        <div
          class="w-1/2"
          v-for="p in products"
          :key="p._id"
        >
          <Product
            :p="p"
            class
          />
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
    <StickyFooter />
    <GeoLocation />
  </div>
</template>

<script>
import GeoLocation from "~/components/GeoLocation.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/footer/Footer.vue";
import Hero from "~/components/Hero.vue";
import Product from "~/components/Product.vue";
import Categories from "~/components/Categories.vue";
import StickyFooter from "~/components/footer/StickyFooter";
import BestSellers from "~/components/home/BestSellers";
import RecentVisit from "~/components/home/RecentVisit";

export default {
  data() {
    return {
      products: []
    };
  },
  async created() {
    try {
      const p = await this.$axios.$get("api/foods");
      this.products = p.data;
    } catch (e) {
      this.products = [];
    }
  },
  components: {
    GeoLocation,
    Header,
    Footer,
    Hero,
    Product,
    Categories,
    StickyFooter,
    BestSellers,
    RecentVisit
  }
};
</script>
