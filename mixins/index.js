import { locationExpiry } from "~/config";
export default {
  data() {
    return {
      errorStr: "",
      gettingLocation: false,
      geo: null,
      location: { latitude: "", longitude: "" }
    };
  },
  methods: {
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      let geo = this.$cookies.get("geo");
      if (!geo && process.client) {
        this.$store.commit("busy", true);
        try {
          this.$store.commit("busy", false);
          const location = (await this.getLocation()).coords;
          geo = await this.$axios.$get(
            //   `/api/geo/location?lat=${location.latitude}&lng=${location.longitude}`
            `/api/geo/location?lat=18.722615&lng=82.839649`
          );
          geo.coords = { lat: location.latitude, lng: location.longitude };
          console.log("Geo...", geo);
          this.$cookies.set("geo", geo, { path: "/", maxAge: locationExpiry });
          return geo;
        } catch (e) {
          this.$store.commit("busy", false);
          this.$toast.show(e.message);
          return null;
        }
      } else {
        return geo;
      }
    },
    showInMap(pos) {
      var latlon = pos.coords.latitude + "," + pos.coords.longitude;
      var img_url =
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        latlon +
        "&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY";
      var map = document.querySelector("mapholder");
      map.innerHTML = "<img src='" + img_url + "'>";
    }
  }
};
