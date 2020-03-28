<template>
  <div
    class="flex mb-2 shadow-lg w-full bg-gray-100 border-t overflow-x-auto sticky top-0 z-10 text-gray-600"
    v-if="categories"
  >
    <nuxt-link v-for="c in categories.data" :key="c.id" :to="`/c/${c.slug}`" class="category-item">
      <!-- <i :class="`fa fa-${c.icon}`" /> -->
      <img :src="c.img" class="w-8 h-8 rounded-full" />
      <span class="text-xs">{{c.name}}</span>
    </nuxt-link>
  </div>
</template>

<script>
import categories from '~/gql/category/categories.gql'

export default {
  data() {
    return {
      categories: null
    }
  },
  async mounted() {
    try {
      this.$store.commit('clearErr', false)
      this.categories = (
        await this.$apollo.query({
          query: categories
        })
      ).data.categories
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  }
}
</script>

<style></style>
