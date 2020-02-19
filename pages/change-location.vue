<template>
  <div>
    <Header />
    <div class="container">
      <br />
      <br />
      <h3>
        <center>Please select location</center>
      </h3>
      <div class="flex justify-center">
        <div
          class="d-flex"
          cols="12"
          sm="6"
        >
          <select
            v-model="location"
            filled
            label="Select City"
          >
            <option
              v-for="(c, ix) in cities"
              :key="ix"
            >
              {{ c }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="flex"
          cols="12"
          sm="6"
        >
          <button
            @click="saveLocaion"
            color="primary"
            :block="true"
          >
            Continue
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/Header");
import { cities } from "~/config";
export default {
  components: { Header },
  layout: "footer",
  data() {
    return {
      location: null,
      city: null,
      cities: cities
    };
  },
  created() {
    this.location = this.city = this.$cookies.get("city");
  },
  methods: {
    saveLocaion() {
      this.$cookies.set("city", this.location, {
        path: "/",
        maxAge: locationExpiry
      });
      this.$router.push("/");
    },
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
