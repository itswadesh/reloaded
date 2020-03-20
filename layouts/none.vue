<template>
  <div class="antialiased">
    <Loading />
    <div v-if="$store.state.errors" class="err">
      <span v-for="(e,ix) in $store.state.errors" :key="ix">{{e.message}}</span>
    </div>
    <nuxt />
  </div>
</template>

<script>
import Loading from '~/components/ui/Loading'

export default {
  components: { Loading }
}
</script>
