<template>
  <div>
    <Heading title="Join as Chef" />
    <form novalidate @submit.stop.prevent="save(profile)" v-if="profile">
      <div class="mx-4 my-4">
        <div class="flex items-center justify-between mb-4">
          <Textbox
            cls="bg-gray-200"
            type="text"
            name="name"
            autofocus
            v-model="profile.restaurant"
            label="Kitchen Name"
          />&nbsp;&nbsp;
          <div class="text-red-500">(Public)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            cls="bg-gray-200"
            type="text"
            name="name"
            autofocus
            v-model="profile.firstName"
            label="First Name"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            cls="bg-gray-200"
            type="text"
            name="name"
            autofocus
            v-model="profile.lastName"
            label="Last Name"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            cls="bg-gray-200"
            type="text"
            name="email"
            v-model="profile.email"
            label="Email"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            cls="bg-gray-200"
            type="text"
            name="name"
            v-model="profile.address.address"
            label="Address"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <!-- <div class="flex items-center justify-between mb-4">
          <label>City:</label>
          <select name="city" v-model="profile.address.city" :items="cities"></select>
          <span class="text-green-500">(Private)</span>
        </div>-->
      </div>
      <button
        type="submit"
        class="fixed bottom-0 w-full tracking-widest p-3 primary text-sm font-semibold"
      >Save Changes</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const Heading = () => import("~/components/Heading");
const Textbox = () => import("~/components/ui/Textbox");
import { cities } from "~/config";
export default {
  components: {
    Heading,
    Textbox
  },
  middleware: ['isAuth'],
  async asyncData({ store }) {
    let profile = { address: {} };
    let userDetails = await store.dispatch("auth/fetch");
    profile = Object.assign({}, userDetails);
    profile.address = profile.address || {};
    return { profile };
  },
  data() {
    return {
      profile: {},
      user: null,
      showImageModal: false,
      userAvatar: null,
      cities: cities
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  },
  methods: {
    ...mapActions({ updateProfile: "auth/updateProfile" }),
    save(profile) {
      if (!this.profile.restaurant) {
        this.$store.commit("setErr", "Please enter Display Name");
        return;
      } else if (!this.profile.firstName) {
        this.$store.commit("setErr", "Please enter firstName");
        return;
      } else if (!this.profile.lastName) {
        this.$store.commit("setErr", "Please enter lastName");
        return;
      } else if (!this.profile.address.address) {
        this.$store.commit("setErr", "Please enter address");
        return;
      }
      profile.role = "chef";
      this.updateProfile(profile);
      this.$router.push("/success-chef");
    }
  },
  watch: {
    // userAvatar: function(avatar) {
    //   this.user.avatar = avatar;
    // }
  },
  created() {},
  head() {
    return {
      title: "Update your profile"
    };
  }
};
</script>