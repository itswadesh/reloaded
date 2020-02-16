<template>
  <div class="lg:w-1/2 mt-0 lg:mt-10 w-full bg-white shadow lg:ml-10 ml-0 py-5">
    <div class="text-xl headings font-bold p-5 border-b border-gray-200 text-center items-center px-10">
      <i
        class="fa fa-arrow-left mr-2 block lg:invisible"
        @click="$router.push('/my/')"
        aria-hidden="true"
      ></i>Profile details
    </div>
    <div class="px-0 lg:px-10">
      <div class="w-full text-sm text-center mb-5 px-8">
        <!-- Just 2 step(s) to go and your profile's complete -->
        <div class="w-full h-1 bg-green-500 rounded-lg m-1 text-xs leading-none text-center text-white"></div>
      </div>
    </div>

    <div class="w-full">
      <ul class="w-full">
        <div class="px-0 lg:px-10 hover:bg-gray-200">
          <li class="flex-wrap flex mb-5 px-8">
            <div class="w-1/12">
              <img
                src="/name.png"
                class="w-5"
                alt=""
              />
            </div>
            <div class="w-10/12 flex">
              <Textbox
                v-model="profile.firstName"
                label="First Name"
                class=" mr-4 flex-1"
              />
              <Textbox
                v-model="profile.lastName"
                label="Last Name"
                class="flex-1"
              />
            </div>
            <!-- <div class="w-1/12">
                <i
                  class="fa fa-angle-right"
                  aria-hidden="true"
                ></i>
              </div> -->
          </li>
        </div>

        <div class="px-0 lg:px-10 hover:bg-gray-200">
          <li class="flex-wrap flex mb-5 hover:bg-gray-200 px-8">
            <div class="w-1/12 text-xl">
              <i
                class="fa fa-mobile"
                aria-hidden="true"
              ></i>
            </div>
            <div class="w-10/12">
              <Textbox
                v-model="profile.phone"
                label="Phone"
              />
            </div>
            <!-- <div class="w-1/12">
                <i
                  class="fa fa-angle-right"
                  aria-hidden="true"
                ></i>
              </div> -->
          </li>
        </div>

        <div class="px-0 lg:px-10 hover:bg-gray-200">
          <li class="flex-wrap flex mb-5 hover:bg-gray-200 px-8">
            <div class="w-1/12">
              <i
                class="fa fa-envelope-o"
                aria-hidden="true"
              ></i>
            </div>
            <div class="w-10/12">
              <Textbox
                v-model="profile.email"
                label="Email"
              />
            </div>
            <!-- <div class="w-1/12">
                <i
                  class="fa fa-angle-right"
                  aria-hidden="true"
                ></i>
              </div> -->
          </li>
        </div>

        <div class="px-0 lg:px-10 hover:bg-gray-200">
          <nuxt-link to="/my/password">
            <li class="flex-wrap flex mb-5 hover:bg-gray-200 py-5 px-8">
              <div class="w-1/12">
                <i
                  class="fa fa-key"
                  aria-hidden="true"
                ></i>
              </div>
              <div class="w-10/12">Password</div>
              <div class="w-1/12">
                <i
                  class="fa fa-angle-right"
                  aria-hidden="true"
                ></i>
              </div>
            </li>
          </nuxt-link>
        </div>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import Textbox from "~/components/ui/Textbox";

export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=my/profile");
  },
  async asyncData({ store }) {},
  data() {
    return {
      user: null,
      showImageModal: false,
      userAvatar: null,
      states: [],
      cities: [],
      dd: null,
      mm: null,
      yyyy: null
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  },
  components: { Textbox },
  async created() {
    let profile = {};
    let userDetails = await this.$store.dispatch("auth/fetch");
    profile = Object.assign({}, userDetails);
    profile.dob = profile.dob || {};
    profile.state = profile.state || {};
    this.profile = profile;
  },
  async mounted() {
    this.getStates(this.profile.country);
    this.getCities(this.profile.state);
  },
  methods: {
    async getCities(state) {
      this.cities = await this.$axios.$get("api/countries/cities", {
        params: { state }
      });
    },
    async getStates() {
      this.states = await this.$axios.$get("api/countries/states");
    },
    ...mapActions({
      updateProfile: "auth/updateProfile"
    }),
    splitDate(date) {
      if (!date) return {};
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!
      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var date = { dd, mm, yyyy };
      return date;
    }
  },
  head() {
    return {
      title: "Update your profile"
    };
  },
  layout: "account"
};
</script>

