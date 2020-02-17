<template>
  <div
    style=""
    class="bg-gray-100 antialiased min-h-screen"
  >
    <!-- <Header /> -->
    <div class="mb-12">
      <nuxt />
    </div>
    <Footer />
    <BackToTopDark />
  </div>
</template>
<script>
import { BackToTopDark } from "~/components/ui";
import Header from "~/components/Header";
import Footer from "~/components/footer/Footer";

export default {
  components: { Header, Footer, BackToTopDark }
};
</script>
