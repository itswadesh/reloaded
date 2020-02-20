<template>
  <div>
    <Heading title="Personal Details" />
    <div class="w-full pb-4 lg:w-1/3 m-auto">
      <form
        class="lg:mx-15 form w-full mb-1"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit(profile)"
      >
        <div
          class="p-2"
          v-if="a"
        >
          <div
            label="Phone"
            class="w-full text-center mb-4"
            name="name"
          >Phone: {{a.phone}}
          </div>
          <div class="w-full flex justify-between">
            <Textbox
              label="First Name"
              class="w-full"
              name="firstName"
              v-model="profile.firstName"
            />
            <Textbox
              label="Last Name"
              class="w-full"
              name="lastName"
              v-model="profile.lastName"
            />
          </div>
          <Textbox
            label="Address"
            class="w-full"
            name="name"
            v-model="a.address"
          />
          <Textbox
            label="Pin Code"
            class="w-full"
            name="name"
            v-model="a.zip"
          />
          <Textbox
            label="Town"
            class="w-full"
            name="name"
            v-model="a.town"
          />
          <div class="w-full flex justify-between">
            <Textbox
              label="City"
              class="w-1/2 mr-1"
              name="name"
              v-model="a.city"
            />
            <Textbox
              label="State"
              class="w-1/2 ml-1"
              name="name"
              v-model="a.state"
            />
          </div>

          <SingleImageUpload
            :image="profile.avatar"
            name="avatar"
            folder="avatar"
            @remove="remove"
            @save="save"
          />
        </div>
        <div class="flex shadow lg:shadow-none fixed lg:relative bottom-0 justify-between w-full">
          <button
            type="button"
            @click="$router.push('/my')"
            class="tracking-widest p-3 w-1/2 bg-white text-black text-sm font-semibold lg:rounded"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="tracking-widest p-3 w-1/2 primary text-sm font-semibold lg:rounded"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
    <GeoLocation />
  </div>
</template>

<script>
import { mapActions } from "vuex";
const Heading = () => import("~/components/Heading");
const Textbox = () => import("~/components/ui/Textbox");
const GeoLocation = () => import("~/components/GeoLocation");
const SingleImageUpload = () => import("~/components/SingleImageUpload");
import { location } from "~/mixins";
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=/my/profile");
  },
  mixins: [location],
  data() {
    return {
      a: {},
      profile: {}
    };
  },
  components: {
    Heading,
    Textbox,
    GeoLocation,
    SingleImageUpload
  },
  computed: {
    // user() {
    //   return (this.$store.state.auth || {}).user || null;
    // }
  },
  async created() {
    // await this.$axios.$get(`/api/geo/remove`);
    // this.$cookies.remove("geo");
    try {
      this.$store.commit("busy", true);
      this.user = await this.$axios.$get(`api/users/me`);
      this.profile = { ...this.user };
      this.a = this.$cookies.get("geo");
      this.profile.address = this.profile.address || {};
      this.a.address =
        this.profile.address.address || (this.a && this.a.address);
      this.a.town = this.profile.address.county || (this.a && this.a.county);
      this.a.city =
        this.profile.address.city || (this.a && this.a.state_district);
      this.a.zip = this.profile.address.zip || (this.a && this.a.postcode);
      this.a.firstName =
        this.profile.address.firstName || this.profile.firstName;
      this.a.lastName = this.profile.address.lastName || this.profile.lastName;
      this.a.phone = this.profile.phone;
    } catch (e) {
    } finally {
      this.$store.commit("busy", false);
    }
  },
  methods: {
    save(name, image) {
      this.profile.avatar = image;
      // this.submit();
    },
    remove(name) {
      this.profile.avatar = "";
    },
    ...mapActions({
      updateProfile: "auth/updateProfile"
    }),
    go(url) {
      this.$router.push(url);
    },
    async submit(profile) {
      try {
        this.$store.commit("busy", true);
        this.profile.address = this.a;
        // const data = await this.$axios.$put("api/users/profile", this.profile);
        await this.updateProfile(this.profile);
        this.go("/my");
      } catch (e) {
      } finally {
        this.$store.commit("busy", false);
      }
    }
  },
  layout: "none"
};
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */
</style>
