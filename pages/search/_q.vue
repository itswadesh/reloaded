<template>
  <div>
    <Banner />
    <div class="container">
      <!-- <Categories /> -->
      <div class="flex flex-wrap">
        <div class="w-full" v-for="p in products" :key="p._id">
          <ListCardSkeleton v-if="loading" />
          <ListCard :p="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "~/components/Heading";
import Banner from "~/components/Banner";
import Product from "~/components/Product";
import ListCard from "~/components/ListCard";
import ListCardSkeleton from "~/components/ListCardSkeleton";
import Categories from "~/components/Categories";
import { query, infiniteScroll } from "~/mixins";
import { TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from "~/config";
import { constructURL } from "~/lib/";
export default {
  data() {
    return {
      apiQ: "api/foods",
      loading: false
    };
  },
  layout: "search",
  mixins: [query, infiniteScroll],
  async asyncData({ params, query, $axios }) {
    let products = [],
      fl = {},
      err = null,
      productCount = 0,
      loading = false;
    try {
      loading = true;
      const q = params.q || null,
        qry = { ...query };
      if (q) qry.search = q;
      const result = await $axios.$get("api/foods", {
        params: { ...qry }
      });
      products = result.data;
      productCount = result.count;
      Object.keys(qry).map(function(k, i) {
        if (qry[k] && !Array.isArray(qry[k]) && qry[k] != null && qry[k] != "")
          qry[k] = qry[k].split(",");
      });
      fl = qry; // For selected filters
      return { products, productCount, fl, err: null };
    } catch (e) {
      if (e && e.response && e.response.data) {
        err = e.response.data;
      } else if (e && e.response) {
        err = e.response;
      } else {
        err = e;
      }
      console.log("err...", `${err}`);
      loading = false;
      return { products, productCount, loading, facets: [], fl: {}, err };
    } finally {
    }
  },
  methods: {
    // async getData(query) {
    //   try {
    //     const products = await this.$axios.$get("api/foods", {
    //       params: { ...query }
    //     });
    //     this.productCount = products.count;
    //     this.products = products.data;
    //   } catch (e) {
    //   } finally {
    //   }
    // }
  },
  components: {
    Heading,
    Banner,
    Product,
    Categories,
    ListCard,
    ListCardSkeleton
  }
};
</script>
