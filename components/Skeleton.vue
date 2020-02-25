<template>
  <div class="flex flex-wrap">
    <div
      v-for="(p, ix) in skeletonCount"
      :key="ix + '-1'"
      class="xs:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"
    >
      <div class="lg:p-2 mt-3 border-0">
        <img class="w-full" style="height:280px;" alt="" />
        <div>
          <p class></p>
          <p class></p>
          <p class></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      skeletonCount: 8
    };
  }
};
</script>
<style scoped>
img {
  border: 0;
  border: none;
  border-width: 0;
}
</style>
