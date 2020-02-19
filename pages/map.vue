<template>
  <div>
    <button @click="pinLocation()">Try It</button>
    <p id="mapholder"></p>
  </div>
</template>

<script>
import { location } from "~/mixins";
export default {
  mixins: [location]
};
</script>

<style>
#mapholder {
  width: 500px;
  height: 500px;
}
</style>