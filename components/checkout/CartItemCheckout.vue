<template>
  <div class="flex hr-line justify-between shadow rounded">
    <div class="lg:w-1/5 left-0 xs:w-3/12 h-32">
      <nuxt-link :to="`/${item.product.slug}?id=${item.product._id}`">
        <img class="h-40 object-cover" v-lazy="item.product.img" alt />
        <div
          class="lg:hidden xs:visible text-black p-2 bg-gray-300 rounded rounded-t-none"
        >Arrives 19 Sep</div>
      </nuxt-link>
    </div>
    <div class="lg:w-4/5 right-0 xs:9/12">
      <div class="pl-4 font-hairline">
        <div class="w-full flex flex-wrap p-2">
          <div class="w-3/4">
            <a href="#" class="text-black text-lg">{{item.product.name}}</a>
            <div class="text-xs font-hairline text-gray-700">Sold By: {{item.product.brand}}</div>
          </div>
          <div class="w-1/4 text-right">
            <div class="text-black mb-2 text-sm font-bold">{{item.variant.price | currency}}</div>
            <div class="text-gray-500 mb-2 text-xs">
              <span class="line-through">{{item.variant.mrp | currency}}</span>
              <span class>|</span>
              <span
                class="text-orange-500 font-hairline"
              >{{calculateOffPercent(item.variant.mrp, item.variant.price)}}% OFF</span>
            </div>
          </div>
        </div>
        <div class>
          <div class="w-full text-hairline p-2">
            <div class="inline-block relative">Size: {{item.variant.size}}</div>

            <div class="flex justify-between">
              <CartButtons :product="{_id:item.product._id}" :variant="{_id:item.variant.id}" />
              <div>
                <button class="p-4 focus:outline-none">MOVE TO WISHLIST</button>
                <button
                  class="text-gray-600 font-medium text-2xl right-0 bg-gray-200 rounded px-3 py-1"
                  @click="checkAndAddToCart({pid: item.product.id, vid: item.variant.id, qty: -10000})"
                  :disabled="loading"
                >
                  <img src="/loading.svg" v-if="loading" alt="..." />
                  <i class="fa fa-trash" v-else></i>
                </button>
              </div>
            </div>
          </div>
          <div class="w-full p-2 border-t border-gray-300 text-gray-500"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const CartButtons = () => import('~/components/cart/CartButtons')

export default {
  props: { item: { type: Object } },
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
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },
    cart() {
      return this.$store.state.cart || {}
    },
    ...mapGetters({
      checkCart: 'cart/checkCart',
      showCart: 'cart/showCart'
    })
  },
  methods: {
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp
      return Math.round(percent)
    }
  }
}
</script>

<style>
</style>