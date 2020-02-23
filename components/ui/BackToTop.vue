<template>
  <button
    class="back-to-top"
    @click="toTop"
    v-if="scrolled > 1000"
  >
    Back To Top
    <i class="fa fa-chevron-up" />
  </button>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      shouldShow: false,
      scrolled: 0
    };
  },
  components: {},
  methods: {
    toTop() {
      if (process.client) {
        window.scrollTo(0, 0);
      }
    }
  },
  mounted() {
    if (process.client) {
      window.addEventListener("scroll", () => {
        this.scrolled = window.scrollY;
      });
    }
  }
};
</script>

<style scoped>
.back-to-top {
  width: 150px;
  height: 50px;
  border-radius: 3px;
  @apply font-medium fixed shadow text-sm;
  top: 110px;
  left: calc(50% - 50px);
  z-index: 9999999999;
}
.back-to-top .ar-icon {
  margin-left: 10px;
}
</style>
