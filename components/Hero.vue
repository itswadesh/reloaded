<template>
  <div class="h-48 w-full">
    <carousel
      v-if="settings"
      :perPage="1"
      :paginationEnabled="false"
      :autoplay="true"
      :loop="true"
      :autoplayTimeout="5000"
    >
      <slide
        v-for="(i, ix) in settings.banners.slider"
        :key="ix"
      >
        <img
          class="h-48 object-cover w-full"
          v-lazy="i.img"
          alt
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import settings from '~/gql/settings.gql'

export default {
  data() {
    return {
      settings: null
    }
  },
  async created() {
    this.settings = (
      await this.$apollo.query({ query: settings })
    ).data.settings
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', this.settings)
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<style></style>
