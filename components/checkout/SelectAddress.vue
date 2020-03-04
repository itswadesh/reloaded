<template>
  <div class="shadow bg-white p-2 rounded">
    <div class="flex justify-between" v-for="(a,ix) in addresses" :key="a._id">
      <label class="cursor-pointer w-full flex justify-between">
        <div>
          <Radio />
        </div>
        <div class="flex-1 ml-2">
          <div class="font-semibold">
            {{a.firstName}} {{a.lastName}}
            <span v-if="ix==0">(Default)</span>
          </div>
          <div class="py-2 text-xs">
            <div>{{a.address}}</div>
            <div>{{a.city}}</div>
            <div>{{a.zip}}</div>
            <div>{{a.state}}</div>
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
      <label class="border-t border-gray-200 flex w-full">
        <button
          @click="go('/checkout/address')"
          class="tracking-widest w-1/2 text-blue-500 py-1 border-r border-gray-200 mt-1"
        >Edit/Change</button>
        <button
          @click="go('/checkout/add')"
          class="tracking-widest w-1/2 text-blue-500 py-1 mt-1"
        >Add New Address</button>
      </label>
    </div>
  </div>
</template>

<script>
import Radio from '~/components/ui/Radio'
import addresses from '~/gql/user/addresses.gql'

export default {
  components: { Radio },
  data() {
    return {
      office: false,
      addresses: []
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    async getAddress() {
      const a = (
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
  }
}
</script>

<style>
</style>