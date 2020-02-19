<template>
  <div class="bg-white">
    <h1 v-if="!product">Not found</h1>
    <div
      v-else
      class="relative"
    >
      <div class="z-10 absolute w-full">
        <button
          @click="$router.go(-1)"
          class="bg-black opacity-25 mt-1 mr-1 px-auto py-auto text-center absolute rounded-full top-0 left-0 w-10 h-10"
        >
          <i class="fa fa-long-arrow-left text-white" />
        </button>
        <nuxt-link
          to="/search"
          class="bg-black opacity-25 pt-2 mt-1 mr-1 px-auto py-auto text-center absolute rounded-full top-0 right-0 w-10 h-10"
        >
          <i class="fa fa-search text-white" />
        </nuxt-link>
      </div>
      <div
        v-lazy:background-image="`${product.img}`"
        class="bg-contain h-48 relative flex justify-center"
      >
        <div
          v-if="product.vendor && product.vendor.info"
          class="w-3/4 text-xl bg-black text-center py-2 absolute bottom-0 text-white font-bold"
          style="background-color: rgba(0,0,0,.5);"
        >
          <!-- <div class="opacity-100 text-white"></div> -->
          {{ product.vendor.info.restaurant }}
        </div>
      </div>

      <!-- <img v-lazy="`${product.img}`" alt class="w-full object-cover h-48 mb-2" /> -->
      <div class="rounded-t-lg z-10 px-4">
        <div class="mt-4 mb-2">
          <div class="flex justify-between items-center text-gray-600 text-sm">
            <img
              :src="product.type === 'V' ? 'veg.png' : 'non-veg.png'"
              class="w-5"
            />
            <div>
              <i class="fa fa-history" /> 33min
            </div>
            <div>
              <i class="fa fa-map-marker" /> 27kms
            </div>
            <div v-if="product.vendor && product.vendor.info">By {{ product.vendor.info.restaurant }}</div>
            <div v-if="product.stock < 5">Only {{ product.stock }} left</div>
          </div>
          <h1 class="font-bold text-xl mt-2">{{ product.name }}</h1>
          <!-- <div class="flex justify-between items-center text-sm mt-4">
            <div class="bg-orange-500 rounded-full px-3 text-white">free delivery</div>
            <div class="text-gray-600">
              <i class="fa fa-history" /> 33min
            </div>
            <div class="text-gray-600">
              <i class="fa fa-map-marker" /> 27kms
            </div>
          </div>-->
        </div>
        <div class="flex justify-between">
          <!-- <div class="flex">
            <i class="fa fa-star h-10 text-white bg-yellow-500 rounded-full px-2 py-3"></i>
            <div class="mx-3 leading-tight">
              <div class="font-bold">{{ product.rating }}</div>
              <div class="text-gray-500 font-semibold">Ratings</div>
            </div>
          </div>-->
          <h2 class="text-2xl font-bold">{{ product.rate | currency }}</h2>
          <div class="flex justify-around">
            <CartButtons
              :product="product"
              :variant="userSelectedVariant"
              :notify="true"
            />
          </div>
        </div>
        <div class="font-semibold pb-3 text-xs px-5">{{ product.description }}</div>
      </div>
      <hr class="mb-4" />
      <div v-if="product.vendor">
        <h3 class="font-bold px-3 text-2xl">About Chef</h3>
        <div class="flex bg-gray-100 rounded-lg p-6 mb-6">
          <img
            v-if="product.vendor.avatar"
            class="h-24 w-24 rounded-full mx-0 mr-6"
            v-lazy="product.vendor.avatar"
          />
          <img
            v-else
            class="h-24 w-24 rounded-full mx-0 mr-6"
            src="https://randomuser.me/api/portraits/women/17.jpg"
          />
          <div class="text-left">
            <h2 class="text-lg">{{ product.vendor.firstName }} {{ product.vendor.lastName }}</h2>
            <div class="text-gray-600 text-xs tracking-wide">
              <i class="fa fa-map-marker" />
              {{ product.vendor.city }}
            </div>
            <div class="text-green-500 text-sm">
              <i class="fa fa-star" />
              {{ product.vendor.rating }} 120 reviews
            </div>
            <div
              class="text-gray-600"
              v-if="product.vendor.info"
            >{{ product.vendor.info.speciality }}</div>
          </div>
        </div>
        <!-- <div class="mb-4" v-if="product.vendor.info && product.vendor.info.kitchenPhotos">
          <h3 class="font-bold mb-2 px-3 text-2xl">Chef's today's menu</h3>
          <div class="flex flex-wrap px-2">
            <div
              class="px-1 w-1/3 mb-2"
              v-for="(p, ix) in product.vendor.info.kitchenPhotos"
              :key="ix"
            >
              <img v-lazy="p" class="object-cover h-24 rounded-lg shadow" />
            </div>
          </div>
        </div>-->
        <div
          class="mb-4"
          v-if="product.vendor.info && product.vendor.info.kitchenPhotos"
        >
          <h3 class="font-bold mb-2 px-3 text-2xl">Kitchen Photos</h3>
          <div class="flex flex-wrap px-2">
            <div
              class="px-1 w-1/3 mb-2"
              v-for="(p, ix) in product.vendor.info.kitchenPhotos"
              :key="ix"
            >
              <img
                v-lazy="p"
                class="object-cover h-24 rounded-lg shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CartBar />
    <!-- <StickyFooter class /> -->
  </div>
  <!-- <div>
    <h1 v-if="!product">Not found</h1>
    <div v-else class="relative">
      <button
        class="ml-2 mt-1 px-auto py-auto text-center absolute rounded-full left-0 w-10 h-10"
      >
        <i class="fa fa-long-arrow-left text-white" />
      </button>
      <button
        class="mr-2 mt-1 px-auto py-auto text-center absolute rounded-full right-0 w-10 h-10"
      >
        <i class="fa fa-search text-white" />
      </button>
      <img
        v-lazy="`${product.img}`"
        alt
        class="w-full object-cover h-48 mb-2"
      />
      <h1>{{ product.name }}</h1>
      <div>{{ product.description }}</div>
      <div>{{ product.type }}</div>
      <div>{{ product.rate }}</div>
      <div>{{ product.stock }}</div>
      <div>{{ product.restaurant }}</div>
      <div>{{ product.img }}</div>
      <CartButtons
        :product="product"
        :variant="userSelectedVariant"
        :notify="true"
      />
      <div class="items-center text-sm px-3 bg-gray-100 my-3 p-3 lg:my-0">
        <div class="flex items-center">
          <span class="mr-4"> SELECT SIZE: </span>
        </div>
        <div
          class="flex flex-wrap py-4 relative px-3"
          :class="{ 'shake-animation': shake }"
        >
          <div v-for="v in product.variants" :key="v._id">
            <button
              @click="selectVariant(v)"
              :class="{
                'bg-gray-700 text-white':
                  v.size == (userSelectedVariant && userSelectedVariant.size)
              }"
              v-if="v.stock > 0"
              class="focus:outline:none m-1 rounded-full border border-gray-400 w-12 h-12 hover:border-black hover:font-bold"
            >
              <div class="text-xs">{{ v.size }}</div>
              <div
                v-if="v.stock < 5"
                class="text-xs font-semibold absolute w-12 bg-orange-500 text-white rounded"
              >
                {{ v.stock }} left
              </div>
            </button>
            <button
              v-else
              class="bg-gray-700 text-white focus:outline:none m-1 rounded-full border border-gray-400 w-12 h-12"
            >
              <div class="text-xs">{{ v.size }}</div>
              <div
                class="text-xs font-semibold absolute w-12 bg-orange-500 text-white rounded"
              >
                No stock
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import CartButtons from "~/components/cart/CartButtons";
import CartBar from "~/components/cart/CartBar";
import StickyFooter from "~/components/footer/StickyFooter";
import { mapGetters } from "vuex";
export default {
  components: { CartButtons, StickyFooter, CartBar },
  data() {
    return {
      shake: false,
      product: null,
      userSelectedVariant: null
    };
  },
  async created() {
    try {
      this.product = await this.$axios.$get(
        `/api/foods/slug/${this.$route.params.slug}`
      );
      this.userSelectedVariant = this.product.variants[0];
    } catch (e) {}
  },
  methods: {
    selectVariant(s) {
      this.userSelectedVariant = s;
      this.$emit("variantChanged", s);
      this.selectedImgIndex = 0;
    }
  },
  computed: {
    ...mapGetters({
      checkCart: "cart/checkCart"
    }),
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    calculateOffPercent() {
      if (!this.product || !this.product.variants[0]) return 0;
      let percent =
        ((this.product.variants[0].mrp - this.product.variants[0].price) *
          100) /
        this.product.variants[0].mrp;
      return Math.round(percent);
    },
    calculatePrice() {
      let price = 0;
      if (this.product.variants[0].price < this.product.variants[0].mrp) {
        price = this.product.variants[0].price;
      } else {
        price = this.product.variants[0].mrp;
      }
      return price;
    }
  }
};
</script>

<style></style>
