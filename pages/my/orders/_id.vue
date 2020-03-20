<template>
  <div class="text-center bg-gray-100">
    <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/my/orders" class="flex-1 text-left absolute font-bold">
        <i class="fa fa-arrow-left mr-1 text-gray-600" />
      </nuxt-link>
      <h1 class="bg-white font-semibold text-xl p-2 flex-1 text-center">Order</h1>
    </div>
    <h1 class="text-center" v-if="!order">Order not found</h1>
    <div v-else class="flex flex-col pt-8 text-center">
      <div class="text-center text-sm text-black bg-white w-full py-5 tracking-widest">
        <p class="font-semibold">Order {{ order.orderNo }}</p>
        <Span class="flex flex-wrap justify-center text-gray-600 text-xs">
          Placed on {{ order.createdAt | date }}
          <li class="list-disc ml-2">{{ order.amount.total | currency }} for 1 item</li>
        </Span>
      </div>
      <!-- <p
        v-if="order.payment.method == 'COD'"
        class="bg-green-500 text-white text-center p-1 rounded"
      >
        
      </p>-->
      <div class="flex justify-center" v-if="order.payment.method == 'COD'">
        <button
          class="bg-orange-500 py-2 px-8 rounded my-3 text-white font-semibold"
        >Please pay {{ order.amount.total | currency }} to the delivery agent</button>
      </div>
      <div class="m-3 rounded border shadow">
        <div class="bg-gray-100 px-3 py-2">
          <div
            class="text-left font-bold"
          >{{ order.address.firstName }} {{ order.address.lastName }}</div>
          <div class="flex">
            <img src="img/contact-us.svg" class="h-4 w-4 my-1 mr-1" />
            <div class="text-left text-gray-500 font-medium text-sm">
              {{ order.address.address }}, {{ order.address.town }},
              {{ order.address.city }}, {{ order.address.state }} -
              {{ order.address.zip }}
            </div>
            <!-- <div
              class="bg-orange-600 rounded-full text-center text-white font-semibold text-xs mx-3 py-1 px-4"
            >
              free Delivery
            </div>-->
          </div>
        </div>
        <div class="flex bg-white py-2 border-b" v-for="i in order.items" :key="i._id">
          <img :src="i.img" class="h-12 m-2 w-12" />
          <div class="flex flex-col p-2 text-left">
            <div class="font-bold">{{ i.name }}</div>
            <div class="flex justify-between">
              <nuxt-link
                :to="`/restaurant/${i.vendor_id}`"
                class="text-sm text-gray-500 mr-2"
              >{{ i.vendor_name }}</nuxt-link>
              <div
                class="text-sm font-semibold text-gray-800"
              >{{ i.price | currency }} * {{ i.qty }}</div>
            </div>
          </div>
        </div>
        <nuxt-link
          to="/search/"
          class="block border-b text-red-600 font-semibold text-sm bg-white p-2 text-left rounded"
        >Add more items +</nuxt-link>
      </div>
      <div class="bg-white p-3 text-base">
        <div class="price-breakup">
          <div>Subtotal</div>
          <div>{{ order.amount.subtotal | currency }}</div>
        </div>
        <div class="price-breakup">
          <div>Tax & fees</div>
          <div>{{ order.amount.tax | currency }}</div>
        </div>
        <div class="price-breakup" v-if="order.amount.discount">
          <div>Discount</div>
          <div>{{ order.amount.discount | currency }}</div>
        </div>
        <div class="price-breakup">
          <div>Delivery</div>
          <div>{{ order.amount.shipping | currency }}</div>
        </div>
        <hr />
        <div class="price-breakup font-bold text-xl">
          <div>Total</div>
          <div>{{ order.amount.total | currency }}</div>
        </div>
      </div>
      <div
        class="border border-green-500 rounded p-4 mx-2 my-4 text-gray-700 text-sm font-semibold text-black-400"
      >
        <span class="text-semibold text-xs">PAYMENT MODE</span>
        <br />
        <div class="flex text-xs justify-between mt-1">
          <div>{{order.payment.method}}</div>
          <div>{{ order.amount.total | currency }}</div>
        </div>
      </div>
      <div>
        <!-- <HereMap ref="map" lat="18.732447" lng="82.829516" width="100" height="300px" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import HereMap from '~/components/HereMap'
import order from '~/gql/order/order.gql'

export default {
  middleware: ['isAuth'],
  data() {
    return {
      order: null
    }
  },
  async created() {
    try {
      const id = this.$route.params.id
      this.$store.commit('clearErr')
      this.order = (
        await this.$apollo.query({
          query: order,
          variables: { id },
          fetchPolicy: 'no-cache'
        })
      ).data.order
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  mounted() {
    // this.$refs.map.route('18.732447,82.829516', '18.708187,82.852198')
  },
  components: {
    HereMap
  }
}
</script>
