<template>
  <div class="lg:w-1/4 xs:w-full px-3 py-4 bg-gray-100">
    <div class="border-b border-dotted lg:mb-0">
      <p class="text-black font-normal text-xl">Price Summary</p>
      <span class="text-gray-400 text-xs">Includes GST and all government taxes</span>
      <div class="flex justify-between mt-1">
        <div class="w-1/2 text-sm text-left">Total item price</div>
        <div class="ml-2 w-1/2 text-black-400 text-right">{{cart.subtotal| currency}}</div>
      </div>
      <div class="flex justify-between mt-1">
        <div class="w-1/2 text-sm text-left">Item discount</div>
        <div class="ml-2 w-1/2 text-black-400 text-right">{{cart.discount.amount | currency}}</div>
      </div>
      <div
        class="flex justify-between mt-1"
        v-if="cart.shipping"
      >
        <div class="w-1/2 text-sm text-left">Shipping fee</div>
        <div
          class="ml-2 w-1/2 text-black-400 text-right"
          v-if="cart.shipping.charge>0"
        >{{cart.shipping.charge| currency}}</div>
        <div
          class="ml-2 w-1/2 text-black-400 text-right"
          v-else
        >FREE</div>
      </div>
      <!-- <<div class="mt-1">
        <p class="text-xs text-gray-400 pb-2">
          Free shipping on orders of ₹999 or
          more. For first purchase,
          <a
            href
            class="underline"
          >See Offer</a>
        </p>
      </div>
      div class="text-xs bg-red-100 rounded p-2 text-gray-500 my-2">
        <div class="flex items-center">
          <img src="/shield.png" class="w-12 pr-2" alt />
          <div class="ml-1 justify">
            Genuine products. 15 day returns. 100% secure payments.
            <span
              class="text-black"
            >Know More</span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="w-full right-0 lg:relative fixed bottom-0 bg-white px-2 lg:px-0 lg:py-0 py-4 shadow lg:shadow-none">
      <div class="flex justify-between">
        <div class="w-1/2 text-lg font-bold text-left">Total</div>
        <div class="ml-2 w-1/2 font-bold text-black-400 text-right">{{cart.total | currency}}</div>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: { type: Object }
  }
};
</script>

<style>
</style>