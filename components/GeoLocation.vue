<template>
  <div>
    <div v-if="errorStr">Sorry, but the following error occurred: {{ errorStr }}</div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>
    <div
      v-if="geo"
      class="mb-16 align-middle text-center"
    >
      Your location is {{ geo.town }} <nuxt-link
        to="/change-location"
        class="px-2 rounded text-secondary"
      >Change</nuxt-link>
    </div>
  </div>
</template>

<script>
import { location } from "~/mixins";
export default {
  data() {
    return {
      errorStr: null,
      geo: null,
      gettingLocation: false
    };
  },
  mixins: [location],
  async mounted() {
    try {
      this.geo = this.$cookies.get("geo");
      if (!this.geo && process.client) {
        this.$router.push("/change-location");
        // this.gettingLocation = true;
        // this.geo = await this.locateMe();
      }
    } catch (e) {
      this.errorStr = e;
    } finally {
      this.gettingLocation = false;
    }
  }
};
</script>

<style></style>
