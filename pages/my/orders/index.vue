<template>
  <div class="text-center bg-gray-100 mx-2 flex1">
    <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/my" class="flex-1 text-left absolute font-bold">
        <i class="fa fa-arrow-left mr-1 text-gray-600" />
      </nuxt-link>
      <h1 class="bg-white font-semibold text-xl p-2 flex-1 text-center">Orders</h1>
    </div>
    <nuxt-link :to="`/my/orders/${o._id}`" v-for="o in orders" :key="o._id">
      <div class="w-full bg-white shadow rounded hover:shadow-xl my-4">
        <div class="bg-gray-100 rounded p-3">
          <h1>Order # {{ o.orderNo }}</h1>
          <p class="text-gray-800">
            Date:
            <span class="text-xs">{{ o.createdAt | date }}</span>
          </p>
        </div>
        <hr />
        <div
          v-for="(i, ix) in o.items"
          :key="i._id"
          class="flex flex-wrap p-3 justify-between"
          :class="{ 'border-t': ix != 0 }"
        >
          <div class="flex items-center">
            <div>
              <img v-lazy="i.img" class="rounded-full bg-blue-500 mr-2 w-12 h-12" alt />
            </div>
            <div>
              <div class="text-sm font-semibold">{{ i.name }}</div>
              <div class="text-gray-500 text-xs">
                {{ i.qty }} * {{ i.price | currency }} =
                {{ (i.qty * i.price) | currency }}
              </div>
            </div>
          </div>
          <!-- <div class="p-2 shadow ml-3">
          <img
            :src="i.img"
            class="w-12 h-12"
            alt="cart"
          />
          </div>-->
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import orders from '~/gql/order/orders.gql'
export default {
  layout: 'account',
  middleware: ['isAuth'],
  data() {
    return {
      orders: []
    }
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.$store.commit('busy', true)
      this.orders = (
        await this.$apollo.query({
          query: orders,
          fetchPolicy: 'no-cache'
        })
      ).data.orders
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  }
}
</script>
