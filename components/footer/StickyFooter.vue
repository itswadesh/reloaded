<template>
  <div
    class="shadow-lg w-full bg-gray-100 border-t overflow-x-auto fixed bottom-0 z-10 text-gray-600"
  >
    <div class="flex justify-around items-center">
      <nuxt-link to="/search/" class="category-item" active-class="text-primary">
        <i class="fa fa-search" />
        <span class="text-xs">Discovery</span>
      </nuxt-link>
      <nuxt-link to="/my/" class="category-item" active-class="text-primary">
        <i class="fa fa-user" />
        <span class="text-xs">Account</span>
      </nuxt-link>
      <nuxt-link to="/offers" class="category-item" active-class="text-primary">
        <i class="fa fa-tag" />
        <span class="text-xs">Offers</span>
      </nuxt-link>
      <nuxt-link to="/cart" class="category-item" active-class="text-primary">
        <i class="fa fa-shopping-cart" />
        <span class="text-xs">Cart</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
