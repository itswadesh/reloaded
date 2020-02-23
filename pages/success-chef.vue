<template>
  <div>
    <Heading title="Success" />
    <h1 class="px-4 py-2 text-center bg-yellow-200 text-red-500">Thank you for joining as chef</h1>
    <div class="text-center p-8 text-secondary">We will get back to you within 24hrs</div>
    <div class="flex justify-center">
      <nuxt-link
        to="/search/"
        class="primary py-2 px-4 text-center rounded"
      >
        <i class="fa fa-search" /> Continue Exploring
      </nuxt-link>
    </div>
  </div>
</template>

<script>
const Heading = () => import("~/components/Heading");

export default {
  components: { Heading }
};
</script>

<style>
</style>