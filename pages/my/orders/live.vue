<template>
  <div id="app">
    <div style="padding: 10px 0">
      <button
        type="button"
        v-on:click="route()"
      >Route</button>
    </div>
    <HereMap
      ref="map"
      lat="18.732447"
      lng="82.829516"
      width="60"
      height="530px"
    />
  </div>
</template>

<script>
import HereMap from "~/components/HereMap";
export default {
  components: {
    HereMap
  },
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=/my/orders");
  },
  data() {
    return {};
  },
  mounted() {
    this.route();
  },
  methods: {
    route() {
      this.$refs.map.route("18.732447,82.829516", "18.708187,82.852198");
    }
  },
  head() {
    return {};
  }
};
</script>


<style>
body {
  margin: 20px;
  background-color: #1d232d;
}
</style>