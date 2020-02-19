import { locationExpiry } from "~/config";
const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;
export default {
  data() {
    return {
      errorStr: "",
      gettingLocation: false,
      geo: null,
      location: { latitude: "", longitude: "" }
    };
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_KEY
    );
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    pinLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        this.$store.commit(
          "setErr",
          "Geolocation is not supported by this browser."
        );
      }
    },
    showPosition(pos) {
      var position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      // var position = new google.maps.LatLng(18.732081, 82.830031);
      var map = new google.maps.Map(document.getElementById("mapholder"), {
        zoom: 18,
        center: position
      });
      var marker = new google.maps.Marker({ position, map });
    },
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
        try {
          this.$store.commit("busy", true);
          const location = (await this.getLocation()).coords;
          geo = await this.$axios.$get(
            `/api/geo/location?lat=${location.latitude}&lng=${location.longitude}`
            // `/api/geo/location?lat=18.722615&lng=82.839649`
          );
          geo.coords = { lat: location.latitude, lng: location.longitude };
          console.log("Geo...", geo);
          this.$cookies.set("geo", geo, { path: "/", maxAge: locationExpiry });
          return geo;
        } catch (e) {
          this.$toast.show(e.message);
          return null;
        } finally {
          this.$store.commit("busy", false);
        }
      } else {
        return geo;
      }
    },
    showInMap(pos) {
      const position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      // var position = new google.maps.LatLng(18.732081, 82.830031);
      var map = new google.maps.Map(document.getElementById("mapholder"), {
        zoom: 18,
        center: position
      });
      var marker = new google.maps.Marker({ position, map });
    },
    getLiveLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    showError(error) {
      let err = null;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          err = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          err = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          err = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          err = "An unknown error occurred.";
          break;
      }
      this.$store.commit("setErr", err);
    }
  }
};
