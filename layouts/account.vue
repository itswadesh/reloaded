<template>
  <div class="antialiased min-h-full">
    <Header />
    <div v-if="$store.state.errors" class="err">
      <span v-for="(e,ix) in $store.state.errors" :key="ix">{{e.message}}</span>
    </div>
    <div class="flex flex-wrap justify-center w-full bg-gray-100 pb-5 mb-12">
      <Loading />
      <AccountMenu class="hidden md:block" />
      <div class="flex-1">
        <nuxt />
      </div>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import Header from '~/components/Header'
import StickyFooter from '~/components/footer/StickyFooter'
import AccountMenu from '~/components/AccountMenu2'
import Loading from '~/components/ui/Loading'
export default {
  components: { Header, StickyFooter, AccountMenu, Loading }
}
</script>
