<template>
  <div class="text-center">
    <Heading title="Orders" />
    <nuxt-link :to="`/my/orders/${o._id}`" v-for="o in orders" :key="o._id">
      <div class="w-full bg-white shadow rounded hover:shadow-xl my-4">
        <div class="rounded p-3">
          <h1>Order # {{ o.orderNo }}</h1>
          <p class="text-gray-800">
            Date:
            <span class="text-xs">{{ o.createdAt | date }}</span>
          </p>
          <div class="text-gray-500" v-if="o.delivery">
            OTP:
            <span class="text-primary">{{o.delivery.otp}}</span>
          </div>
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
              <img v-lazy="i.img" class="rounded-full mr-2 w-12 h-12" alt />
            </div>
            <div>
              <div class="text-sm font-semibold">{{ i.name }}</div>
              <div class="text-xs">
                {{ i.qty }} * {{ i.rate | currency }} =
                {{ (i.qty * i.rate) | currency }}
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
import Heading from "~/components/Heading";
export default {
  layout: "account",
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=/my/orders");
  },
  async asyncData({ params, query, route, redirect, $axios, store }) {
    let orders = [],
      err = null;
    if (store.getters["cart/getTotal"] <= 0) {
      redirect("/");
    }
    try {
      const o = await $axios.$get(`api/food-orders/my`);
      orders = o.data;
      err = null;
    } catch (e) {
      orders = [];
      if (e && e.response && e.response.data) {
        err = e.response.data;
      } else if (e && e.response) {
        err = e.response;
      } else {
        err = e;
      }
      console.log("err...", `${err}`);
    }
    return { orders };
  },
  components: {
    Heading
  }
};
</script>
