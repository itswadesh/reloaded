<template>
  <div>
    <nuxt-link
      to="/chef"
      class="block bg-yellow-400 py-1 px-2 mx-auto text-center cursor-pointer hover:text-black"
    >Get started as chef in 30 seconds</nuxt-link>
    <Hero />
    <div class="container antialiased min-h-screen">
      <Categories />
      <BestSellers />
      <Popular />
      <!-- <RecentVisit /> -->
      <!-- <div class="flex flex-wrap">
        <div class="w-1/2" v-for="p in bestSellers" :key="p._id">
          <Product :p="p" />
        </div>
      </div>-->
    </div>
    <!-- <Footer /> -->
    <StickyFooter />
    <GeoLocation />
  </div>
</template>

<script>
import GeoLocation from '~/components/GeoLocation.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/footer/Footer.vue'
import Hero from '~/components/Hero.vue'
import Product from '~/components/Product.vue'
import Categories from '~/components/Categories.vue'
import StickyFooter from '~/components/footer/StickyFooter'
import BestSellers from '~/components/home/BestSellers'
import Popular from '~/components/home/Popular'
import RecentVisit from '~/components/home/RecentVisit'
import products from '~/gql/product/products.gql'

export default {
  data() {
    return {
      products: []
    }
  },
  async created() {
    try {
      this.$store.commit('busy', true)
      this.$store.commit('clearErr')
      this.products = (
        await this.$apollo.query({
          query: products,
          fetchPolicy: 'no-cache'
        })
      ).data.products
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
      this.$router.push('/')
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
    RecentVisit,
    Popular
  }
}
</script>
