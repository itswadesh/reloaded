<template>
  <div>
    <CheckoutHeader selected="address" />
    <div style="max-width: 1000px;margin: 0 auto;">
      <div class="mx-auto lg:mx-10 p-2 flex justify-between flex-wrap items-start">
        <!-- Left sidebar -->
        <div
          class="p-2 mb-2 w-full md:w-1/2 flex flex-wrap justify-between w-full shadow bg-white rounded border"
          :class="{'border-green-500':selectedAddress==a._id}"
          v-for="(a,ix) in addresses"
          :key="a._id"
        >
          <label class="cursor-pointer w-full flex justify-between">
            <Radio :checked="selectedAddress==a._id" @changed="addressChanged" :value="a._id" />
            <div class="flex-1 ml-2">
              <div class="font-semibold">{{a.firstName}} {{a.lastName}}</div>
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
            <div v-if="ix==0">
              <div class="rounded-full text-xs bg-gray-200 py-1 px-2">Default</div>
            </div>
          </label>
          <div class="border-t border-gray-200 flex w-full">
            <button
              @click="del(a)"
              class="tracking-widest w-1/2 text-blue-500 py-1 border-r border-gray-200 mt-1"
            >Remove</button>
            <button
              @click="go(`/checkout/add?id=${a._id}`)"
              class="tracking-widest w-1/2 text-blue-500 py-1 mt-1"
            >Edit</button>
          </div>
        </div>
        <AddressNewCard />
      </div>
      <!-- Right sidebar -->
      <div class="w-full px-2">
        <label class="flex justify-start border rounded p-2 text-sm border-green-300 bg-green-100">
          <div class="font-bold text-black">Standard Delivery</div>
          <div class="text-gray-500">Delivery Charge ₹149</div>
        </label>
        <div
          v-for="(item,ix) in cart.items"
          :key="ix"
          :item="item"
          class="flex my-5 border-b border-dotted pb-2"
        >
          <img class="rounded w-12 h-12 object-cover mr-2" v-lazy="item.img" alt />
          <div>
            <div class="text-lg">{{item.name}}</div>
            <div class="text-sm font-bold">{{item.rate | currency}}</div>
          </div>
        </div>
        <CartSummaryCheckout :selectedAddress="selectedAddress" />
      </div>
    </div>
  </div>
</template>

<script>
import AddressCard from "~/components/checkout/AddressCard";
import SelectAddress from "~/components/checkout/SelectAddress";
import AddressNewCard from "~/components/checkout/AddressNewCard";
import CartSummaryCheckout from "~/components/checkout/CartSummaryCheckout";
import Radio from "~/components/ui/Radio";
import CartItem from "~/components/cart/CartItem";
const CheckoutHeader = () => import("~/components/checkout/CheckoutHeader");
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/account/login?return=/checkout/address");
  },
  data() {
    return {
      office: false,
      a: {},
      addresses: [],
      selectedAddress: ""
    };
  },
  created() {
    this.getAddress();
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    cart() {
      return this.$store.state.cart || {};
    }
  },
  components: {
    CartItem,
    CheckoutHeader,
    Radio,
    SelectAddress,
    AddressNewCard,
    AddressCard,
    CartSummaryCheckout
  },
  methods: {
    addressChanged(e) {
      this.selectedAddress = e;
    },
    del(a) {
      let vm = this;
      this.$swal({
        title: "Delete address?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          try {
            this.$store.commit("busy", true);
            this.$axios.$delete(`api/addresses/${a._id}`);
            this.getAddress();
            this.$store.commit("busy", false);
          } catch (e) {
            this.$store.commit("busy", false);
          }
        }
      });
    },
    async getAddress() {
      try {
        const a = await this.$axios.$get("api/addresses/my");
        this.addresses = a.data;
        this.selectedAddress = a.data[0] && a.data[0]._id;
      } catch (e) {}
    },
    go(url) {
      this.$router.push(url);
    }
  },
  layout: "none"
};
</script>

<style scoped>
.desktop1-base-right {
  vertical-align: top;
  padding: 35px 0 0 35px;
}
.desktop1-base-left {
  display: flex;
  vertical-align: top;
  border-right: 1px solid #eaeaec;
  padding-right: 35px;
  margin-top: 30px;
}
</style>