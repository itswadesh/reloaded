<template>
  <div class="hidden lg:block">
    <div class="w-full flex justify-between mt-6 mb-6">
      <div class="bg-gray-200 rounded my-1 p-3">
        <i class="fa fa-truck text-gray-500"></i>
        <p class="text-gray-500 text-lg font-normal">Free Shipping*</p>
        <p class="text-gray-500 text-xs">On orders of ₹500 and above.Details</p>
      </div>
      <div class="bg-gray-200 rounded p-3 m-1">
        <i class="fa fa-undo text-gray-500"></i>
        <p class="text-gray-500 text-lg font-normal">Easy returns</p>
        <p class="text-gray-500 text-xs">Send items back for free within 15 days</p>
      </div>
      <div class="bg-gray-200 rounded p-3 my-1">
        <i class="fa fa-shield text-gray-500"></i>
        <p class="text-gray-500 text-lg font-normal">Secure shopping</p>
        <p class="text-gray-500 text-xs">Your payment details are fully encrypted</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.hr-line {
  border-bottom: 1px solid lightgray;
}
.fa-truck {
  transform: scaleX(-1);
}
.bb {
  border-bottom: 1px dashed lightgray;
}
.fa-truck,
.fa-undo,
.fa-shield {
  font-size: 2rem;
}
</style>