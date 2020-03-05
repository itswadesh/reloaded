<template>
  <div>
    <Banner />
    <div class="container">
      <div
        v-if="errors"
        class="mx-2 text-center"
      >
        <span
          v-for="(e,ix) in errors"
          :key="ix"
        >{{e.message}}</span>
      </div>
      <!-- <Categories /> -->
      <div
        class="flex flex-wrap"
        v-infinite-scroll="loadMore"
        :infinite-scroll-distance="3"
        :infinite-scroll-immediate-check="true"
      >
        <div
          class="w-full"
          v-for="p in data"
          :key="p._id"
        >
          <ListCardSkeleton v-if="$apollo.loading" />
          <ListCard :p="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '~/components/Heading'
import Banner from '~/components/Banner'
import Product from '~/components/Product'
import ListCard from '~/components/ListCard'
import ListCardSkeleton from '~/components/ListCardSkeleton'
import Categories from '~/components/Categories'
import { query, infiniteScroll } from '~/mixins'
import { TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from '~/config'
import { constructURL } from '~/lib/'
import search from '~/gql/product/search.gql'

export default {
  layout: 'search',
  mixins: [infiniteScroll],
  data() {
    return {
      model: search,
      attr: 'search'
    }
  },
  components: {
    Heading,
    Banner,
    Product,
    Categories,
    ListCard,
    ListCardSkeleton
  }
}
</script>
