<template>
  <div>
    <button @click="drawBoundries()">Try It</button>
    <p id="map"></p>
  </div>
</template>

<script>
import { location } from "~/mixins";
export default {
  mixins: [location]
};
</script>

<style>
#map {
  width: 500px;
  height: 500px;
}
</style>