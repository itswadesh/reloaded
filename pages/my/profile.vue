<template>
  <div>
    <Heading title="Personal Details" />
    <div class="w-full pb-4 lg:w-1/3 m-auto">
      <div
        v-if="errors"
        class="mx-2 text-center"
      >
        <span
          v-for="(e,ix) in errors"
          :key="ix"
        >{{e.message}}</span>
      </div>
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
            type="tel"
            label="Phone"
            class="w-full text-center mb-4"
            name="name"
          >Phone: {{a.phone}}</div>
          <div class="w-full flex justify-between mb-4">
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
            class="w-full mb-4"
            name="name"
            v-model="a.address"
          />
          <Textbox
            type="tel"
            label="Pin Code"
            class="w-full mb-4"
            name="name"
            v-model="a.zip"
          />
          <Textbox
            label="Town"
            class="w-full mb-4"
            name="name"
            v-model="a.town"
          />
          <div class="w-full flex justify-between mb-4">
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

          <ImageUpload
            :image="profile.avatar"
            name="avatar"
            folder="avatar"
            @remove="removeImage"
            @save="saveImage"
          />
        </div>
        <div class="flex shadow lg:shadow-none fixed lg:relative bottom-0 justify-between w-full">
          <button
            type="button"
            @click="$router.push('/my')"
            class="tracking-widest p-3 w-1/2 bg-white text-black text-sm font-semibold lg:rounded"
          >CANCEL</button>
          <button
            type="submit"
            class="tracking-widest p-3 w-1/2 primary text-sm font-semibold lg:rounded"
          >CONTINUE</button>
        </div>
      </form>
    </div>
    <GeoLocation />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const Heading = () => import('~/components/Heading')
const Textbox = () => import('~/components/ui/Textbox')
const Checkbox = () => import('~/components/ui/Checkbox')
const GeoLocation = () => import('~/components/GeoLocation')
const ImageUpload = () => import('~/components/ImageUpload')
import me from '~/gql/user/me.gql'

import { location } from '~/mixins'
export default {
  middleware: ['isAuth'],
  mixins: [location],
  data() {
    return {
      a: {},
      profile: {},
      nwErr: null,
      graphErr: null,
      errors: []
    }
  },
  components: {
    Heading,
    Textbox,
    Checkbox,
    GeoLocation,
    ImageUpload
  },
  computed: {
    // user() {
    //   return (this.$store.state.auth || {}).user || null;
    // }
  },
  async mounted() {
    this.errors = []
    try {
      this.$store.commit('busy', true)
      const user = (
        await this.$apollo.query({ query: me, fetchPolicy: 'no-cache' })
      ).data.me
      this.profile = { ...user }
      this.a = this.$cookies.get('geo')
      this.profile.address = this.profile.address || {}
      this.a.address =
        this.profile.address.address || (this.a && this.a.address)
      this.a.town = this.profile.address.town || (this.a && this.a.town)
      this.a.city = this.profile.address.city || (this.a && this.a.city)
      this.a.zip = (
        this.profile.address.zip ||
        (this.a && this.a.zip)
      ).toString()
      this.a.firstName =
        this.profile.address.firstName || this.profile.firstName
      this.a.lastName = this.profile.address.lastName || this.profile.lastName
      this.a.phone = this.profile.phone
      // if (!this.profile.info) this.profile.info = {};
      // this.profile.public = this.profile.info.public || false;
      // this.profile.restaurant = this.profile.info.restaurant;
    } catch ({ graphQLErrors, networkError }) {
      if (graphQLErrors) this.errors = graphQLErrors
      if (networkError) this.errors = networkError.result.errors
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    saveImage(name, image) {
      this.profile.avatar = image
      this.saveProfile()
    },
    removeImage(name) {
      this.profile.avatar = ''
      this.saveProfile()
    },
    ...mapActions({
      updateProfile: 'auth/updateProfile'
    }),
    go(url) {
      this.$router.push(url)
    },
    submit() {
      try {
        this.saveProfile()
        this.$router.push('/my')
      } catch (e) {}
    },
    async saveProfile() {
      this.errors = []
      try {
        this.$store.commit('busy', true)
        // this.profile.restaurant = this.profile.info.restaurant;
        // this.profile.public = !!this.profile.info.public;
        // this.profile.address = this.a;
        delete this.profile.address.__typename
        delete this.profile.info.__typename
        return await this.updateProfile(this.profile)
      } catch ({ graphQLErrors, networkError }) {
        if (graphQLErrors) this.errors = graphQLErrors
        if (networkError) this.errors = networkError.result.errors
      } finally {
        this.$store.commit('busy', false)
      }
    }
  },
  layout: 'none'
}
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
