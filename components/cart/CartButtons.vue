<template>
  <div class="flex" v-if="product">
    <div v-if="!checkCart({ pid: product._id })" @click="addToBag({pid:product._id,qty:1})">
      <button
        class="primary rounded-full w-8 h-8"
        :disabled="product.stock < 1 || loading"
        @click="addToBag({pid:product._id,qty:1})"
      >
        <i class="fa fa-plus m-auto align-middle" aria-hidden="true"></i>
      </button>
    </div>
    <div v-else>
      <div class="flex flex-wrap">
        <button class="muted rounded-full w-8 h-8" @click="addToBag({pid:product._id,qty:-1})">
          <i class="fa fa-minus m-auto align-middle" aria-hidden="true"></i>
        </button>
        <div class="px-2 flex items-center text-center">
          <div v-if="!loading">{{ getQty({ pid: product._id }) }}</div>
          <img alt="..." class="w-3 h-4 align-middle" src="/loading.svg" v-else />
        </div>
        <button
          class="primary rounded-full w-8 h-8"
          :disabled="product.stock < 1 || loading"
          @click="addToBag({pid:product._id,qty:1})"
        >
          <i class="fa fa-plus m-auto align-middle" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: { product: Object, variant: Object, notify: Boolean },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions({ addToCart: "cart/addToCart" }),
    addToBag(obj) {
      this.addToCart(obj);
      if (!!this.notify && obj.qty > 0) this.toast();
    },
    toast() {
      this.$toast
        .show(
          `
      <div class="flex w-full">
        <img class="w-12 h-12 object-cover" src="${this.product &&
          this.$store.state.settings.CDN_URL + this.product.img}" alt="" />
        <div class="toasted-text items-center">
          <div>${this.product.name &&
            this.product.name.substr(0, 40) + "..."}</div>
          <div class="text-gray-600 text-xs">Added to your cart</div>
        </div>
      </div>
      `,
          {
            containerClass: "sw-toast-container",
            theme: "outline",
            position: "top-right",
            singleton: false,
            action: {
              text: "View Cart",
              onClick: (e, toastObject) => {
                this.$router.push("/cart");
                toastObject.goAway(0);
              }
            }
          }
        )
        .goAway(5000);
    },
    setErr(e) {
      this.$store.commit("setErr", e);
    }
  },
  computed: {
    ...mapGetters({
      checkCart: "cart/checkCart",
      getQty: "cart/getQty"
    }),
    cart() {
      return this.$store.state.cart;
    }
  }
};
</script>
<style scoped>
.cart-button {
  border: 1px solid transparent;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.23);
} /** Hover Tooltip Css ***/
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 82px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-bottom: 7px;
  margin-left: -38px;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip .tooltiptext {
  opacity: 0;
  transition: opacity 0.5s;
}
.tooltip:hover .tooltiptext {
  opacity: 1;
}
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
/** End Hover Tooltip Css ***/

.shake-animation {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  border: 1px solid red;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
