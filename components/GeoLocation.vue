<template>
  <div>
    <div v-if="errorStr">Sorry, but the following error occurred: {{ errorStr }}</div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div v-if="geo">
      <!-- Your location data is {{ geo.lat }},
      {{ geo.lng }}
      {{ geo.country }}
      {{ geo.state }}
      {{ geo.state_district }}
      {{ geo.county }}
      {{ geo.postcode }} -->
    </div>
  </div>
</template>

<script>
import { location } from "~/mixins";
export default {
  mixins: [location],
  async mounted() {
    this.geo = await this.locateMe();
  }
};
</script>

<style></style>
