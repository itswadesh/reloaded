<template>
  <div class="w-full lg:w-2/4 mt-0 lg:mt-10 lg:pr-20 xs:w-full lg:px-10 px-2 headings">
    <div
      v-if="errors"
      class="mx-2 text-center"
    >
      <span
        v-for="(e,ix) in errors"
        :key="ix"
      >{{e.message}}</span>
    </div>
    <div class="text-2xl font-bold py-6 text-center lg:text-left">
      <i
        class="fa fa-arrow-left mr-2 block lg:invisible"
        @click="$router.push('/my/')"
        aria-hidden="true"
      ></i>Manage Addresses
    </div>
    <div class="w-full my-4">
      <nuxt-link
        :to="`address/add`"
        class="text-center shadow rounded hover:shadow-xl w-full bg-white p-5 mb-5 flex items-center justify-center border border-gray-100"
      >
        <img
          src="/rounded-plus.png"
          alt="+"
          class="w-10 mr-1"
        />ADD NEW ADDRESS
      </nuxt-link>
      <div
        class="shadow rounded hover:shadow-xl w-full bg-white py-3 px-5 mb-5 flex flex-wrap border border-gray-100 relative"
        v-for="a in addresses"
        :key="a.id"
      >
        <nuxt-link
          :to="`address/${a.id}`"
          class="border border-gray-300 text-right right-0 absolute px-2 mr-2 rounded text-xs"
        >Edit</nuxt-link>
        <!-- <span class="text-xs bg-gray-200 text-gray-700 p-1">HOME</span> -->
        <!-- <nuxt-link :to="`address/add?id=${a._id}`" class="text-right right-0 absolute px-5" >
          <p class="w-1 h-1 bg-gray-500 rounded-full m-1"></p>
          <p class="w-1 h-1 bg-gray-500 rounded-full m-1"></p>
          <p class="w-1 h-1 bg-gray-500 rounded-full m-1"></p>
        </nuxt-link>-->
        <div class="w-full py-2 text-sm leading-loose">
          <p>
            <b>{{a.firstName}} {{a.lastName}}</b>
          </p>
          <div class="w-full py-2 text-sm leading-loose">
            <p>{{a.phone}}</p>
            <p>{{a.address}}</p>
            <p>{{a.city}}</p>
            <p>
              {{a.state}}-
              <span class="font-bold">{{a.zip}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addresses from '~/gql/user/addresses.gql'
import deleteAddress from '~/gql/user/deleteAddress.gql'
import gql from 'graphql-tag'
export default {
  layout: 'account',
  middleware: ['isAuth'],
  data() {
    return {
      addresses: [],
      errors: []
    }
  },
  async created() {
    this.getAddresses()
  },
  methods: {
    async getAddresses() {
      this.errors = []
      try {
        this.$store.commit('busy', true)
        const res = (
          await this.$apollo.query({
            query: addresses,
            fetchPolicy: 'no-cache'
          })
        ).data
        this.addresses = res.addresses
      } catch ({ graphQLErrors, networkError }) {
        if (graphQLErrors) this.errors = graphQLErrors
        if (networkError) this.errors = networkError.result.errors
      } finally {
        this.$store.commit('busy', false)
      }
    },
    async del(address) {
      this.$swal({
        title: 'Do you wish to delete this address?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!'
      }).then(async result => {
        if (result.value) {
          await this.$apollo.mutate({
            mutation: gql`
              mutation deleteAddress($id: ID!) {
                deleteAddress(id: $id)
              }
            `,
            variables: { id: address.id },
            fetchPolicy: 'no-cache'
          })
          this.getAddresses()
        }
      })
    }
  }
}
</script>
