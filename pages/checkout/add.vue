<template>
  <div>
    <CheckoutHeader selected="address" />
    <div class="w-full pb-4 lg:w-1/3 m-auto">
   
      <div>
        <div class="p-3 flex shadow lg:shadow-none items-center justify-between">
          <nuxt-link
            class="flex items-center"
            to="/checkout/address"
          >
            <i
              class="fa fa-arrow-left mb-1"
              aria-hidden="true"
            ></i>
            <div class="font-bold text-gray-700 text-xl ml-3">Add address</div>
          </nuxt-link>
          <div class="text-xs text-gray-600">Step 2 of 3</div>
        </div>
      </div>
      <form
        class="lg:mx-15 form w-full mb-1"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit(address)"
        v-if="address"
      >
        <div class="p-2">
          <div class="w-full flex justify-between my-4">
            <Textbox
              label="First Name"
              class="w-full"
              name="firstName"
              v-model="address.firstName"
            />
            <Textbox
              label="Last Name"
              class="w-full"
              name="lastName"
              v-model="address.lastName"
            />
          </div>
          <Textbox
            label="Address"
            class="w-full mb-4"
            name="name"
            v-model="address.address"
          />
          <Textbox
            type="tel"
            label="Pin Code"
            class="w-full mb-4"
            name="name"
            v-model="address.zip"
          />
          <Textbox
            label="Town"
            class="w-full mb-4"
            name="name"
            v-model="address.town"
          />
          <div class="w-full flex justify-between mb-4">
            <Textbox
              label="City"
              class="w-1/2 mr-1"
              name="name"
              v-model="address.city"
            />
            <Textbox
              label="State"
              class="w-1/2 ml-1"
              name="name"
              v-model="address.state"
            />
          </div>
          <Textbox
            type="tel"
            label="Phone"
            class="w-full"
            name="name"
            v-model="address.phone"
          />
        </div>
        <div class="flex shadow lg:shadow-none fixed lg:relative bottom-0 justify-between w-full">
          <button
            type="button"
            @click="$router.push('/checkout/address')"
            class="tracking-widest p-3 w-1/2 bg-white text-black text-sm font-semibold lg:rounded"
          >CANCEL</button>
          <button
            type="submit"
            class="tracking-widest p-3 w-1/2 primary text-sm font-semibold lg:rounded"
          >CONTINUE</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const Textbox = () => import('~/components/ui/Textbox')
const CheckoutHeader = () => import('~/components/checkout/CheckoutHeader')
import updateAddress from '~/gql/user/updateAddress.gql'
import addAddress from '~/gql/user/addAddress.gql'
import address from '~/gql/user/address.gql'

export default {
  // mixins: [location],
  middleware: ['isAuth'],
  data() {
    return {
      address: null
    }
  },
  components: {
    CheckoutHeader,
    Textbox
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    }
  },
  async created() {
    const id = this.$route.query.id
    // If editing
    if (id) {
      this.$store.commit('busy', true)
      try {
        this.$store.commit('clearErr')
        this.address = (
          await this.$apollo.query({
            query: address,
            variables:{id},
            fetchPolicy: 'no-cache'
          })
        ).data.address
      } catch (e) {
      this.$store.commit('setErr',e)
    } finally {
        this.$store.commit('busy', false)
      }
    } else {
      this.$store.commit('busy', true)
      let geoCookie = this.$cookies.get('geo')
      if (geoCookie) {
        this.address = geoCookie || {}
        this.address.firstName = this.user.firstName
        this.address.lastName = this.user.lastName
        this.address.phone = this.user.phone
      }
      this.$store.commit('busy', false)
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    async submit(address) {
      if (address.coords) delete address.coords.__typename
      try {
        this.$store.commit('busy', true)
        this.$store.commit('clearErr')
        if (address.id)
          await this.$apollo.mutate({
            mutation: updateAddress,
            variables: address,
            fetchPolicy: 'no-cache'
          })
        else
          await this.$apollo.mutate({
            mutation: addAddress,
            variables: address,
            fetchPolicy: 'no-cache'
          })
        this.go('/checkout/address')
      } catch (e) {
     this.$store.commit('setErr',e)
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
