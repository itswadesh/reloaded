<template>
  <div style class="bg-gray-100 antialiased">
    <!-- <Header /> -->
    <Loading />
    <div v-if="$store.state.errors" class="err">
      <span v-for="(e,ix) in $store.state.errors" :key="ix">{{e.message}}</span>
    </div>
    <div class="mb-32">
      <nuxt />
    </div>
    <Footer />
    <BackToTopDark />
  </div>
</template>
<script>
import { BackToTopDark } from '~/components/ui'
import Header from '~/components/Header'
import Footer from '~/components/footer/Footer'
import Loading from '~/components/ui/Loading'

export default {
  components: { Header, Footer, BackToTopDark, Loading }
}
</script>
