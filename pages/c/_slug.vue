<template>
  <div v-if="category">
    <Heading :title="`Explore ${category.name}`" back="/" />
    <Banner />
    <div class="container">
      <!-- <div class="flex flex-wrap">
        <div class="w-1/2" v-for="p in products" :key="p._id">
          <Product :p="p" class />
        </div>
      </div>-->
      <Categories />
      <div class="flex flex-wrap" v-if="products">
        <div class="w-full" v-for="p in products.data" :key="p._id">
          <ListCard :p="p" class />
        </div>
      </div>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Heading from '~/components/Heading'
import Footer from '~/components/footer/Footer'
import Banner from '~/components/Banner'
import Product from '~/components/Product'
import ListCard from '~/components/ListCard'
import Categories from '~/components/Categories'
import StickyFooter from '~/components/footer/StickyFooter'
import products from '~/gql/product/products.gql'
import category from '~/gql/category/category.gql'

export default {
  data() {
    return {
      category: null,
      products: null
    }
  },
  async created() {
    const slug = this.$route.params.slug
    try {
      this.$store.commit('clearErr')
      this.category = (
        await this.$apollo.query({
          query: category,
          variables: { slug },
          fetchPolicy: 'no-cache'
        })
      ).data.category
      this.products = (
        await this.$apollo.query({
          query: products,
          variables: { category: slug },
          fetchPolicy: 'no-cache'
        })
      ).data.products
    } catch (e) {
      this.products = []
    } finally {
      this.$store.commit('busy', false)
    }
  },
  components: {
    Heading,
    Header,
    Footer,
    Banner,
    Product,
    Categories,
    ListCard,
    StickyFooter
  }
}
</script>
