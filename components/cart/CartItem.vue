<template>
  <div class="mx-4 flex justify-between py-5 border-b border-gray-300 w-full relative">
    <img
      class="rounded-lg shadow w-20 h-20 object-cover"
      v-lazy="item.img"
      alt
    />
    <div class="flex flex-wrap justify-between text-right flex text-xs absolute right-0 top-0">
      <!-- <button
        class="mr-1 focus:outline-none text-primary rounded p-1"
        @click="saveForLater(item)"
      >MOVE TO WISHLIST</button>-->
      <button
        class="text-gray-600 rounded pt-3 pr-1"
        @click="checkAndAddToCart({pid: item.pid, qty: -10000})"
        :disabled="loading"
      >
        <img
          src="/loading.svg"
          class="w-3 h-3 rotateOutDownLeft"
          v-if="loading"
          alt
        />
        <i
          class="fa fa-close"
          v-else
        ></i>
      </button>
    </div>
    <div class="pl-4 lg:w-4/5 w-full">
      <nuxt-link
        class="text-black mb-2"
        :to="`/${item.slug}`"
      >{{item.name}}</nuxt-link>
      <div
        class="flex"
        v-if="item.stock<5"
      >{{item.stock}} left</div>
      <div class="flex justify-between items-center w-full">
        <div class="font-black text-2xl">{{item.rate | currency}}</div>
        <CartButtons          :product="item"          :notify="false"        />
        <!-- <div
            class="text-gray-400 line-through ml-2 text-xs lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price)>0"
          >{{item.mrp | currency}}</div>
          <div
            class="ml-2 text-green-400 text-xs lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price)>0"
        >{{calculateOffPercent(item.mrp, item.price)}}% off</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const CartButtons = () => import('./CartButtons')

export default {
  props: {
    item: { type: Object }
  },
  data() {
    return {
      loading: false
    }
  },
  components: { CartButtons },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart'
    }),
    async saveForLater(item) {
      this.checkAndAddToCart({
        pid: item._id,
        qty: -100000
      })
      if (!(this.$store.state.auth || {}).user) {
        this.$router.push('/login?return=checkout')
        return
      } else {
        this.saveToWishlist(item)
      }
    },
    async saveToWishlist(item) {
      try {
        this.$store.commit('clearErr')
        this.loading = true
        let data = (
          await this.$apollo.mutate({
            mutation: addToWishlist,
            variables: item
          })
        ).data.addToWishlist
        this.$store.commit('success', 'Added to your wishlist')
      } catch (err) {
        this.$store.commit('setErr', err, { root: true })
      } finally {
        this.loading = false
      }
    },
    async checkAndAddToCart(item) {
      try {
        this.loading = true
        await this.addToCart(item)
        this.loading = false
      } catch (e) {
        console.log('err...', e.toString())
      }
    },
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp
      return Math.round(percent)
    }
  }
}
</script>

<style>
</style>