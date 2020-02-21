<template>
  <div>
    <EmptyCart v-if="!cart || !cart.qty || cart.qty == 0" />
    <div class="flex flex-wrap justify-between bg-white" v-else>
      <div class="flex w-full hr-line justify-between pb-2">
        <!-- <Offers /> -->
        <div class="hidden lg:block font-bold headings w-full text-lg bg-white mt-10">
          <div class="flex flex-wrap">
            <div class="text-left w-1/2">
              Cart ({{ cart.qty }} Item
              <span v-if="cart.qty>1">s</span>)
            </div>
            <div class="text-right w-1/2">Total {{ cart.total | currency }}</div>
          </div>
        </div>

        <div class="block lg:hidden w-full p-3 bg-white flex flex-wrap">
          <div class="text-left headings text-3xl w-20 border-r border-gray-200 font-bold">Cart</div>
          <span class="text-sm mx-4 text-gray-500">
            {{ cart.qty }}
            <span v-if="cart.qty>1">items</span>
            <span v-else>item</span>
            <br />
            Total {{ cart.total | currency }}
          </span>
        </div>
        <button @click="go(-1)" class="flex-1 text-left mr-2 font-bold">
          <i class="fa fa-long-arrow-left mr-1 text-gray-600" />
        </button>
      </div>
      <CartItem v-for="(item, ix) in cart.items" :key="ix" :item="item" />
      <!-- <CartItemSkeleton /> -->
      <!-- <div class="hidden lg:block">
          <nuxt-link
            to="wishlist"
            class="w-full shadow flex flex-wrap justify-between p-4 mt-6 mb-6"
          >
            <div>
              <i class="fa fa-bookmark-o mt-1 mr-2" aria-hidden="true"></i> Add
              More From Wishlist
            </div>
            <i class="fa fa-angle-right mt-1 ml-2" aria-hidden="true"></i>
          </nuxt-link>
      </div>-->
      <!-- <CartBanners /> -->
      <div
        class="mx-4 my-4 p-2 w-full flex items-center justify-between bg-gray-100"
        v-if="cart.discount"
      >
        Promo Code
        {{cart.discount.code}}
        <button
          v-if="cart.discount.code"
          @click="applyCoupon(0)"
          class="text-sm text-gray-500 focus:outline-none hover:text-gray-600 cursor-pointer"
        >REMOVE</button>
        <nuxt-link
          to="/offers"
          v-else
          class="block text-sm text-gray-500 focus:outline-none hover:text-gray-600 cursor-pointer"
        >APPLY</nuxt-link>
      </div>
      <CartSummary :cart="cart">
        <Button @click="$router.push('/checkout/address')" color="primary">SELECT ADDRESS</Button>
      </CartSummary>
      <!-- <StickyFooter /> -->
    </div>
  </div>
</template>

<script>
import StickyFooter from "~/components/footer/StickyFooter";
import EmptyCart from "~/components/cart/EmptyCart";
import CartSummary from "~/components/cart/CartSummary";
import CartBanners from "~/components/cart/CartBanners";
import CartItemSkeleton from "~/components/cart/CartItemSkeleton";
import CartItem from "~/components/cart/CartItem";
import Button from "~/components/ui/Button";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    cart() {
      return this.$store.state.cart || {};
    },
    ...mapGetters({
      checkCart: "cart/checkCart",
      showCart: "cart/showCart"
    })
  },
  methods: {
    ...mapActions({ applyCoupon: "cart/applyCoupon" }),
    go(url) {
      this.$router.go(-1);
    }
  },
  components: {
    EmptyCart,
    CartSummary,
    CartBanners,
    CartItem,
    Button,
    StickyFooter
  }
};
</script>
