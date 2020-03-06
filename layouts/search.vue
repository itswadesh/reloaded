<template>
  <div class="bg-gray-100 antialiased min-h-screen">
    <Loading />
    <Search class="my-2 mx-1" />
    <div class="mt-16 mb-12">
      <div v-if="$store.state.errors" class="mx-2 text-center">
        <span v-for="(e,ix) in errors" :key="ix">{{e.message}}</span>
      </div>
      <nuxt />
    </div>
    <StickyFooter />
    <BackToTopDark />
  </div>
</template>
<script>
import { BackToTopDark } from '~/components/ui'
import Search from '~/components/Search'
import StickyFooter from '~/components/footer/StickyFooter'
import Loading from '~/components/ui/Loading'

export default {
  components: { Search, StickyFooter, BackToTopDark, Loading }
}
</script>
