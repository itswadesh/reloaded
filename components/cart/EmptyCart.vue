<template>
  <div class="text-center">
    <Heading title="Cart" />
    <!-- <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/" class="flex-1 text-left absolute font-bold"
        ><i class="fa fa-arrow-left mr-1 text-gray-600"
      /></nuxt-link>
      <h1 class="bg-white font-semibold text-xl p-2 flex-1 text-center">
        Cart
      </h1>
    </div>-->
    <div class="my-auto">
      <div class="flex justify-center py-6">
        <img
          src="seattle.jpg"
          class="h-40 w-40 rounded-full"
        />
      </div>
      <div class="text-2xl py-4">Your cart is empty</div>
      <div class="flex px-6 text-base align-middle text-gray-500">
        Good food is always cooking! Go ahead, order some yummy items from the
        menu.
      </div>
      <nuxt-link
        to="/search/"
        class="inline-block primary px-6 py-2 my-3 rounded-full"
      >Go</nuxt-link>
    </div>
  </div>
</template>
<script>
import Heading from "~/components/Heading";
export default {
  components: { Heading }
};
</script>
