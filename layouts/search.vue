<template>
  <div class="bg-gray-100 antialiased min-h-screen">
    <Search class="my-2 mx-1" />
    <div class="mb-12">
      <nuxt />
    </div>
    <StickyFooter />
    <BackToTopDark />
  </div>
</template>
<script>
import { BackToTopDark } from "~/components/ui";
import Search from "~/components/Search";
import StickyFooter from "~/components/footer/StickyFooter";

export default {
  components: { Search, StickyFooter, BackToTopDark }
};
</script>
