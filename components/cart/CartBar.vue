<template>
  <div
    v-if="cart.qty>0"
    class="fixed bottom-0 primary w-full p-3 flex justify-between rounded-t-lg"
  >
    <div>{{cart.qty}} item | {{cart.subtotal | currency}}</div>
    <nuxt-link to="/cart" class="flex border-l pl-2">
      <img src="/carticon.svg" />VIEW CART
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart || {};
    }
  }
};
</script>

<style scoped>
.primary {
  animation-name: zoom;
  animation-duration: 0.8s;
}
@keyframes zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
/* 

.primary {
  -webkit-animation: expand 1s;
}
@-webkit-keyframes expand {
  0% {
    height: 0px;
  }
  100% {
    height: 100px;
  }
} */
</style>