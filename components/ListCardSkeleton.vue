<template>
  <div>
    <div class="flex bg-white rounded shadow py-2 px-1 m-2 relative">
      <div class="p-2">
        <img v-lazy="`/loading.svg`" class="w-32 h-20 rounded object-cover" />
      </div>
      <div class="my-2 w-full">
        <div>
          <img
            v-lazy="`/food-tray.svg`"
            class="object-cover rounded-full h-8 w-8 absolute top-0 right-0 mt-2 mr-2"
          />
        </div>
        <div class="font-bold tracking-wide bg-gray-100 w-48">&nbsp;</div>
        <div class="flex justify-between">
          <div class="flex items-center text-gray-500 tracking-widest text-sm">
            <i class="fa fa-map-marker"></i>
            <div class="bg-gray-100 w-48 rounded">&nbsp;</div>
          </div>
          <div class="font-black text-xl text-gray-700">{{ 0 | currency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style></style>
