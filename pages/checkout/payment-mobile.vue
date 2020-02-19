<template>
  <div>
    <CheckoutHeader selected="payment" />
    <div>
      <div class="p-3 lg:py-2 lg:px-0 flex shadow lg:shadow-none items-center justify-between lg:w-1/2 m-auto">
        <nuxt-link
          to="/checkout/address"
          class="flex items-center"
        >
          <i
            class="fa fa-arrow-left mb-1"
            aria-hidden="true"
          ></i>
          <div class="font-bold text-gray-700 text-xl ml-3">Payment</div>
        </nuxt-link>
        <div class="text-xs text-gray-600">Step 3 of 3</div>
      </div>
    </div>
    <br />
    <div class>
      <!-- <div class="p-2 lg:px-0 lg:w-1/2 m-auto">
        <ul class="shadow rounded text-sm bg-white border-l-4 border-green-600 text-gray-500 font-hairline">
          <li class="p-2">
            10% Instant Discount on HDFC Bank Debit and Credit Cards on a min spend of Rs. 5,000. TCA
            <br />
            <div class="flex items-center">
              <div class="text-blue-700">
                Show More
                <i
                  class="fa fa-angle-down"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </li>
        </ul>
      </div>-->
      <div class="p-2 lg:px-0 text-sm text-gray-700 p-2 lg:w-1/2 m-auto">
        <div>PAYMENT OPTIONS</div>
        <div class="my-2 font-semibold bg-white border rounded border-gray-300">
          <!-- <div class="px-3 flex justify-between px-2 py-3 border-b border-gray-300">
            <div>CREDIT/DEBIT</div>
            <a
              href="#"
              class="text-secondary"
            >SELECT</a>
          </div>-->
          <label class="text-secondary px-3 flex justify-between px-2 py-3 border-b border-gray-300">
            <div>ONLINE</div>
            <Radio
              value="Online"
              v-model="paymentMethod"
            />
          </label>
          <label class="px-3 flex justify-between px-2 py-3 border-b border-gray-300">
            <div>CASH/CARD ON DELIVERY</div>
            <Radio
              value="COD"
              v-model="paymentMethod"
            />
          </label>
          <!-- <div class="px-3 flex justify-between px-2 py-3 border-b border-gray-300">
            <div>PHONEPE/BHIM UPI</div>
            <a
              href="#"
              class="text-secondary"
            >SELECT</a>
          </div>
          <div class="px-3 flex justify-between px-2 py-3 border-b border-gray-300">
            <div>WALLETS</div>
            <a
              href="#"
              class="text-secondary"
            >SELECT</a>
          </div>
          <div class="px-3 flex justify-between px-2 py-3 border-b border-gray-300">
            <div>GIFT CARD</div>
            <a
              href="#"
              class="text-secondary"
            >SELECT</a>
          </div>-->
        </div>
      </div>
      <div class="p-2 lg:px-0 text-sm text-gray-700 p-2 lg:w-1/2 m-auto mb-32 lg:mb-2">
        <div>DELIVER TO</div>
        <div class="w-full flex justify-between bg-white shadow rounded">
          <div class="flex-1 p-2">
            <div class="font-semibold">{{ address.firstName }} {{ address.lastName }}</div>
            <div class="py-2 text-xs">
              <div>{{ address.address }}</div>
              <div>{{ address.town }}</div>
              <div>{{ address.city }}</div>
              <div>{{ address.state }}</div>
              <div>{{ address.zip }}</div>
              <div class="pt-2">
                Mobile:
                <span class="font-bold">{{ address.phone }}</span>
              </div>
              <div class="pt-2">
                <nuxt-link
                  to="/checkout/address"
                  class="text-blue-700 font-semibold"
                >Change Address</nuxt-link>
              </div>
            </div>
          </div>
          <!-- <div class="p-2">
              <div class="rounded-full text-xs bg-gray-200 py-1 px-2">OFFICE</div>
          </div>-->
        </div>
      </div>
      <div class="shadow-md lg:shadow-none font-bold fixed w-full bottom-0 bg-white p-2 lg:w-1/2 m-auto lg:relative">
        <div class="flex p-3">
          <div class="flex-1 text-center">
            <div>{{ cart.total | currency }}</div>
            <div>
              <nuxt-link
                to="/cart"
                class="text-red-400"
              >view details</nuxt-link>
            </div>
          </div>
          <div class="flex-1 p-1">
            <button
              @click="submit"
              class="px-5 py-2 w-full primary text-white rounded"
            >
              <span v-if="paymentMethod=='COD'">Place Order</span>
              <span v-else>Pay Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Radio from "~/components/ui/Radio";
const CheckoutHeader = () => import("~/components/checkout/CheckoutHeader");
import { PAY_KEY } from "~/config";
export default {
  data() {
    return {
      address: {},
      paymentMethod: "Online"
    };
  },
  async created() {
    this.address = await this.$axios.$get(
      `api/addresses/${this.$route.query.address}`
    );
    let razorpayScript = document.createElement("script");
    razorpayScript.setAttribute(
      "src",
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    document.head.appendChild(razorpayScript);
  },
  methods: {
    ...mapActions({
      applyDiscount: "cart/applyDiscount",
      checkout: "cart/checkout"
    }),
    async submit() {
      if (this.paymentMethod == "COD") {
        this.checkout({ paymentMethod: "COD", address: this.address });
        return;
      }
      const vm = this;
      let rp = {};
      try {
        vm.$store.commit("busy", true, { root: true });
        rp = await this.$axios.$post("api/razorpay", { address: this.address });
      } catch (e) {
        return this.$store.commit(
          "setErr",
          e.response.data && e.response.data.message
        );
      } finally {
        vm.$store.commit("busy", false, { root: true });
      }
      var options = {
        key: PAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Misiki LLP",
        description: "Payment for food",
        image: "/icon.png",
        amount: rp.amount,
        order_id: rp.id,
        handler: async function(response) {
          try {
            const capture = await vm.$axios.$post("api/razorpay/capture", {
              id: response.razorpay_payment_id,
              oid: response.razorpay_order_id
            });
            vm.$router.push(`/success?id=${capture}`);
          } catch (e) {
            console.log("err", e);
            vm.$router.push(`/failure`);
          }
        },
        prefill: {
          name: `${this.user.firstName} ${this.user.lastName}`,
          email: this.user.email || "support@misiki.in",
          contact: this.user.phone
        },
        notes: {
          address: "note value"
        },
        theme: {
          color: "#F37254"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    }
  },
  components: {
    CheckoutHeader,
    Radio
  },
  computed: {
    cart() {
      return this.$store.state.cart || {};
    },
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  layout: "none"
};
</script>

<style></style>
