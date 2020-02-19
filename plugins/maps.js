import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.GOOGLE_MAPS_KEY,
        libraries: "places",
        componentRestrictions: { country: "us" }
    }
});