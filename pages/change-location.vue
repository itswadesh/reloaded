<template>
  <div>
    <Header />
    <div class="container">
      <br />
      <br />
      <h3>
        <center>Please select location</center>
      </h3>
      <div class="flex justify-center mt-6">
        <select v-model="location" filled label="Select City">
          <option selected="true" value="null">Select Location</option>
          <option v-for="(c, ix) in cities" :key="ix" :value="c">{{ c.name }}</option>
        </select>
      </div>
      <div class="flex justify-center mt-6 mb-6">
        <button
          @click="saveLocaion(location)"
          class="primary py-3 px-8 rounded"
          :block="true"
        >Continue</button>
      </div>
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/Header");
import { location } from "~/mixins";
import { mapActions } from "vuex";
import { cities } from "~/config";
export default {
  components: { Header },
  layout: "footer",
  mixins: [location],
  data() {
    return {
      location: null,
      city: null,
      cities: cities,
      geo: null,
      gettingLocation: false
    };
  },
  methods: {
    ...mapActions({
      updateProfile: "auth/updateProfile"
    }),
    async saveLocaion(c) {
      try {
        this.geo = await this.locateMe(c);
        delete this.geo.__typename;
        return await this.updateProfile({ address: this.geo });
      } catch (e) {
      } finally {
        this.$router.push("/");
      }
    },
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
select {
  appearance: none;
  outline: 0;
  background: gray;
  background-image: none;
  border: 1px solid black;
  border-radius: 0.25em;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
}
select::-ms-expand {
  display: none;
}
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 1em;
  background: #34495e;
  pointer-events: none;
}
.select:hover::after {
  color: #f39c12;
}
.select::after {
  transition: 0.25s all ease;
}
</style> 