<template>
  <div class="h-48 w-full">
    <carousel
      v-if="banners"
      :perPage="1"
      :paginationEnabled="false"
      :autoplay="true"
      :loop="true"
      :autoplayTimeout="5000"
    >
      <slide v-for="(i, ix) in banners.data" :key="ix">
        <img class="h-48 object-cover w-full" v-lazy="i.img" alt />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import banners from '~/gql/banner/banners.gql'

export default {
  data() {
    return {
      banners: []
    }
  },
  components: {
    Carousel,
    Slide
  },
  async created() {
    try {
      this.$store.commit('busy', true)
      this.$store.commit('clearErr')
      this.banners = (
        await this.$apollo.query({
          query: banners,
          variables: { type: 'slider', active: true },
          fetchPolicy: 'no-cache'
        })
      ).data.banners
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
      this.$router.push('/')
    }
  }
}
</script>
