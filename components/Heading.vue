<template>
  <div class="flex items-center justify-start px-2 bg-white">
    <button @click="go()" class="flex-1 text-left absolute font-bold">
      <i class="fa fa-long-arrow-left mr-1 text-gray-600" />
    </button>
    <h1 class="bg-white font-semibold text-xl p-2 flex-1 text-center">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    back: String
  },
  methods: {
    go(url) {
      this.back ? this.$router.push(this.back || -1) : this.$router.go(-1)
    }
  }
}
</script>

<style></style>
