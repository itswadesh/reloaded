<template>
  <div id="app">
    <div v-if="errors" class="mx-2 text-center">
      <span v-for="(e,ix) in errors" :key="ix">{{e.message}}</span>
    </div>
    <div style="padding: 10px 0">
      <button type="button" v-on:click="route()">Route</button>
    </div>
    <HereMap ref="map" lat="18.732447" lng="82.829516" width="60" height="530px" />
  </div>
</template>

<script>
import liveOrders from '~/gql/order/liveOrders.gql'
import HereMap from '~/components/HereMap'
export default {
  components: {
    HereMap
  },
  middleware: ['isAuth'],
  data() {
    return { liveOrders: null, errors: [] }
  },
  async mounted() {
    this.route()
    this.errors = []
    try {
      this.$store.commit('busy', true)

      this.liveOrders = (
        await this.$apollo.query({
          query: liveOrders,
          fetchPolicy: 'no-cache'
        })
      ).data.liveOrders
    } catch ({ graphQLErrors, networkError }) {
      if (graphQLErrors) this.errors = graphQLErrors
      if (networkError) this.errors = networkError.result.errors
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    route() {
      this.$refs.map.route('18.732447,82.829516', '18.708187,82.852198')
    }
  },
  head() {
    return {}
  }
}
</script>


<style>
body {
  margin: 20px;
  background-color: #1d232d;
}
</style>