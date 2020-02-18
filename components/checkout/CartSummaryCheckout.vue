<template>
  <div class="mt-4 mb-24 w-full">
    <div class="leading-relaxed bg-yellow-100 p-2">
      <h3 class="font-semibold text-lg text-black">Price Details</h3>
      <div class="flex justify-between mt-1">
        <div class="text-sm text-left">Bag Total</div>
        <div class="ml-2 font-bold text-right">{{cart.subtotal| currency}}</div>
      </div>
      <div class="flex justify-between mt-1" v-if="cart.discount>0">
        <div class="text-sm text-left">Bag Discount</div>
        <div class="ml-2 font-bold text-right">{{cart.discount | currency}}</div>
      </div>

      <!-- <div class="flex justify-between mt-1">
          <div class="text-sm text-left">Order Total</div>
          <div class="ml-2 text-black-400 text-right">{{cart.subtotal - cart.discount | currency}}</div>
      </div>-->

      <div class="flex justify-between mt-1">
        <div class="text-sm text-left">Delivery Charges</div>
        <div
          v-if="cart.delivery"
          class="ml-2 text-black-400 text-right"
        >{{cart.delivery.charge| currency}}</div>
        <div v-else class="ml-2 font-bold text-right">FREE</div>
      </div>
    </div>
    <div class="fixed left-0 bottom-0 lg:relative bg-white w-full px-4 pb-2 lg:pr-0">
      <div class="flex justify-between mt-2">
        <div class="text-lg font-bold text-left">Grand Total</div>
        <div class="font-bold text-black text-lg text-right">{{cart.total | currency}}</div>
      </div>
      <Button @click="proceed" color="primary">CONTINUE</Button>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/Button";
export default {
  props: {
    selectedAddress: { type: String }
  },
  computed: {
    cart() {
      return this.$store.state.cart || {};
    }
  },
  components: {
    Button
  },
  methods: {
    proceed() {
      if (!this.selectedAddress) {
        this.$router.push(`/checkout/add`);
        return;
      }
      this.$router.push(
        `/checkout/payment-mobile?address=${this.selectedAddress}`
      );
    }
  }
};
</script>

<style>
</style>