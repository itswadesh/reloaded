<template>
  <div>
    <CheckoutHeader />
    <div>
      <div class="text-sm font-hairline text-gray-600 p-3">CHOOSE DELIVERY ADDRESS</div>
      <div class="m-2 lg:flex">
        <div
          class="m-1 lg:w-1/3 shadow bg-white p-2 rounded flex flex-wrap justify-between border border-green-500"
          v-for="(a,ix) in addresses"
          :key="a._id"
        >
          <label class="cursor-pointer w-full flex justify-between">
            <div>
              <Radio />
            </div>
            <div class="flex-1 ml-2">
              <div class="font-semibold">
                {{a.firstName}} {{a.lastName}}
                <span v-if="ix===0">(Default)</span>
              </div>
              <div class="py-2 text-xs">
                <div>{{a.address}}</div>
                <div>{{a.phone}}</div>
                <div>{{a.state}}</div>
                <div>{{a.city}}</div>
                <div>{{a.country}}</div>
                <div>{{a.zip}}</div>
                <div class="py-2">
                  Mobile:
                  <span class="font-bold">{{a.phone}}</span>
                </div>
              </div>
            </div>
            <div v-if="office">
              <div class="rounded-full text-xs bg-gray-200 py-1 px-2">OFFICE</div>
            </div>
          </label>
          <div class="border-t border-gray-200 flex w-full">
            <button
              class="tracking-widest w-1/2 text-blue-500 py-1 border-r border-gray-200 mt-1"
            >Remove</button>
            <button
              @click="go('/checkout/add')"
              class="tracking-widest w-1/2 text-blue-500 py-1 mt-1"
            >Edit</button>
          </div>
        </div>

        <nuxt-link
          to="/checkout/add"
          class="m-1 shadow bg-white pointer my-2 py-2 px-4 rounded flex justify-between lg:w-1/3"
        >
          <div>Add New Address</div>
          <i class="fa fa-angle-right text-right" aria-hidden="true"></i>
        </nuxt-link>
      </div>
    </div>
    <div class="fixed bottom-0 lg:inset-auto w-full lg:w-1/4 lg:absolute p-2 bg-white right-0">
      <button
        @click="$router.push('/checkout/address')"
        class="tracking-widest w-full mt-3 p-3 bg-red-500 text-white text-sm font-semibold rounded"
      >CONFIRM</button>
    </div>
  </div>
</template>

<script>
import Radio from '~/components/ui/Radio'
const CheckoutHeader = () => import('~/components/checkout/CheckoutHeader')
import addresses from '~/gql/product/addresses.gql'
export default {
  data() {
    return {
      office: false,
      a: {},
      addresses: []
    }
  },
  created() {
    this.getAddress()
  },
  components: {
    CheckoutHeader,
    Radio
  },
  methods: {
    async getAddress() {
      this.addresses = (
        await this.$apollo.query({
          query: addresses,
          fetchPolicy: 'no-cache'
        })
      ).data.addresses
      this.addresses = a.data
    },
    go(url) {
      this.$router.push(url)
    }
  },
  layout: 'none'
}
</script>

<style scoped>
.dot {
  height: 15px;
  width: 15px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
</style>