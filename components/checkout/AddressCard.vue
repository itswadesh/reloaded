<template>
  <div class="shadow bg-white p-2 rounded">
    <div class="w-full flex justify-between">
      <div class="flex-1 ml-2">
        <div class="font-semibold">Kintali Naveesh(Default)</div>
        <div class="py-2 text-xs">
          <div>Girls Hostel Vit university vellore,Tamil Nadu,632014</div>
          <div>Vellore Institute Of Technology</div>
          <div>Vellore 632014</div>
          <div>Tamil Nadu</div>
          <div class="py-2">
            Mobile:
            <span class="font-bold">9944817722</span>
          </div>
        </div>
      </div>
      <div>
        <div class="rounded-full text-xs bg-gray-200 py-1 px-2">OFFICE</div>
      </div>
    </div>
    <div class="border-t border-gray-200 flex w-full">
      <button
        @click="go('/checkout/address')"
        class="tracking-widest w-1/2 text-blue-500 py-1 border-r border-gray-200 mt-1"
      >Edit/Change</button>
      <button
        @click="go('/checkout/add')"
        class="tracking-widest w-1/2 text-blue-500 py-1 mt-1"
      >Add New Address</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style>
</style>