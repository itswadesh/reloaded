<template>
  <div class="text-center">
    <Heading title="Failure" />
    <div class="my-auto">
      <div class="flex justify-center py-6">
        <img src="seattle.jpg" class="h-40 w-40 rounded-full" />
      </div>
      <div class="text-2xl py-4">Payment failed</div>
      <div
        class="flex px-6 text-base align-middle text-gray-500"
      >Please go back to cart and place order again</div>
      <nuxt-link to="/cart/" class="inline-block primary px-6 py-2 my-3 rounded-full">Go to cart</nuxt-link>
    </div>
  </div>
</template>
<script>
import Heading from '~/components/Heading'
export default {
  components: { Heading }
}
</script>