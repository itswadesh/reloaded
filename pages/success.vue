<template>
  <div>
    <div
      class="text-xl text-center font-bold bg-white py-3"
      v-if="loading"
    >Searching Order</div>
    <h1
      class="text-xl text-center font-bold bg-white py-3"
      v-else-if="!order"
    >Order Not Found</h1>
    <div v-else>
      <Heading title="Success" />
      <h2
        v-if="order.delivery"
        class="text-md text-center font-bold bg-white py-3 bg-yellow-200 text-gray-500 border-t border-b-2 border-dashed mb-2"
      >
        OTP:
        <span class="text-primary">{{order.delivery.otp}}</span>
      </h2>
      <div class="px-8 text-lg tracking-wider">
        <!-- <div class="flex justify-center py-6">
        <img src="seattle.jpg" class="h-40 w-40 rounded-full" />
        </div>-->
        <div
          v-for="(s,ix) in status"
          :key="ix"
          class="text-gray-500 py-2 flex items-center"
          :class="{'text-green-500':index==ix}"
        >
          <div
            class="list-avatar bg-green-500"
            v-if="index===ix"
          >oo</div>
          <div
            class="list-avatar bg-red-500"
            v-else-if="index>ix"
          >_/</div>
          <div
            class="list-avatar bg-gray-500"
            v-else
          >{{ix+1}}</div>
          <i class="fa fa-tick" />
          {{s}}
        </div>
      </div>
      <div class="py-2 text-center">
        <nuxt-link
          to="/search/"
          class="inline-block bg-orange-500 mt-8 mb-2 text-white rounded-full py-2 px-8"
        >Order more</nuxt-link>
        <button
          @click="refresh()"
          class="border rounded-full px-4 py-2"
        >
          <i class="fa fa-refresh" /> Refresh
        </button>
      </div>
      <!-- <nuxt-link to="/orders" class="block text-gray-500 mb-10 mt-2"
      >Go to orders</nuxt-link
      >-->
    </div>
    <div>
      <HereMap
        ref="map"
        lat="18.732447"
        lng="82.829516"
        width="100"
        height="300px"
      />
    </div>
    <StickyFooter />
  </div>
</template>
<script>
import Heading from "~/components/Heading";
import HereMap from "~/components/HereMap";
import StickyFooter from "~/components/footer/StickyFooter";
export default {
  components: { Heading, HereMap, StickyFooter },
  data() {
    return {
      order: null,
      loading: false,
      index: -1,
      status: [
        "Waiting for confirmation",
        "Food is being prerared",
        "Out for delivery",
        "Delivered"
      ]
    };
  },
  computed: {},
  methods: {
    async refresh() {
      try {
        this.loading = true;
        this.order = await this.$axios.$get(
          `api/food-orders/${this.$route.query.id}`
        );
        this.index = this.status.indexOf(this.order.status);
      } catch (e) {
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    await this.refresh();
    try {
      this.$refs.map.route(
        `${this.order.delivery.start.lat},${this.order.delivery.start.lng}`,
        `${this.order.delivery.finish.lat},${this.order.delivery.finish.lng}`
      );
    } catch (e) {
    } finally {
      this.loading = false;
    }
    // this.$refs.map.route(`18.732447,82.829516`, `18.708187,82.852198`);
  }
};
</script>
