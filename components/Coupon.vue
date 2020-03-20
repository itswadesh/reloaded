<template>
  <div
    class="ticket rounded-lg w-full lg:w-1/3 text-white my-2 mx-2"
    :class="color"
  >
    <div class="ml-8 mt-2 mb-2 flex items-center">
      <div class="w-2/3">
        <h2 class="text-4xl font-bold">{{ code }}</h2>
        <p class="-mt-2 leading-tight mb-4 text-gray-400">{{ text }}</p>
      </div>
      <div class="w-1/3 mx-4 text-center">
        <button
          @click="applyOffer(code)"
          class="text-gray-400 text-xl rounded-lg px-6 hover:text-white"
          style="background-color: rgba(0,0,0,.25);"
        >Apply</button>
      </div>
    </div>
    <div class="bg-black opacity-25 text-xs text-center py-1">
      <p class="opacity-100 text-white">{{ terms }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    color: String,
    code: String,
    text: String,
    terms: String
  },
  methods: {
    ...mapActions({ applyCoupon: 'cart/applyCoupon' }),
    applyOffer(code) {
      this.applyCoupon({ code })
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped>
.red {
  background-color: lightcoral;
}
.gray {
  background-color: gray;
}
.cyan {
  background-color: darkcyan;
}
.orange {
  background-color: darkorange;
}
.violet {
  background-color: blueviolet;
}
.ticket {
  position: relative;
  border: 2px solid white;
  color: white;
  text-transform: uppercase;
  display: inline-block;
  padding: 1em 0em;
}
.ticket:before,
.ticket:after {
  content: '';
  position: absolute;
  top: 1.9em;
  top: calc(1.9em - 1px);
  height: 1.2em;
  width: 0.6em;
  border: 2px solid white;
}
.ticket:before {
  left: -2px;
  border-radius: 0 1em 1em 0;
  border-left-color: black;
}
.ticket:after {
  right: -2px;
  border-radius: 1em 0 0 1em;
  border-right-color: black;
}
</style>
