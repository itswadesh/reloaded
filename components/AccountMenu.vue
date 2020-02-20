<template>
  <div class="w-full text-center lg:w-1/5 lg:mt-10 bg-white shadow leading-loose rounded">
    <div class="w-full p-10 border-b border-gray-200">
      <span class="h-20 w-20 p-2 text-4xl text-gray-600 rounded-full bg-gray-200 inline-block">{{user.firstName | first}}</span>
      <br />
      <span class="text-lg">{{user.firstName}}</span>
      <span class="text-sm text-gray-500">{{user.email}}</span>
    </div>
    <ul>
      <li>
        <nuxt-link
          to="/my/orders"
          active-class="text-pink-500"
          class="w-full flex flex-wrap text-lg"
        >
          <div class="w-1/5">
            <i
              class="fa fa-archive p-5"
              aria-hidden="true"
            ></i>
          </div>
          <div class="w-4/5 text-left p-3">Orders</div>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/my/address"
          active-class="text-pink-500"
          class="w-full flex flex-wrap text-lg"
        >
          <div class="w-1/5">
            <i
              class="fa fa-address-card p-5"
              aria-hidden="true"
            ></i>
          </div>
          <div class="w-4/5 text-left p-3">Address</div>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/my/profile"
          active-class="text-pink-500"
          class="w-full flex flex-wrap text-lg"
        >
          <div class="w-1/5">
            <i
              class="fa fa-user-circle p-5"
              aria-hidden="true"
            ></i>
          </div>
          <div class="w-4/5 text-left p-3">Profile Details</div>
        </nuxt-link>
      </li>

      <!-- <li>
        <nuxt-link to="/my/orders/details" class="w-full flex flex-wrap text-lg">
          <div class="w-1/5">
            <i class="fa fa-heart-o p-5" aria-hidden="true"></i>
          </div>
          <div class="w-4/5 text-left p-3">Order Details</div>
        </nuxt-link>
      </li>-->
      <!-- <li>
        <nuxt-link
          to="/my/password"
          active-class="text-pink-500"
          class="w-full flex flex-wrap text-lg"
        >
          <div class="w-1/5">
            <i
              class="fa fa-key p-5"
              aria-hidden="true"
            ></i>
          </div>
          <div class="w-4/5 text-left p-3">Password</div>
        </nuxt-link>
      </li>
      <li>
        <a
          href="#"
          class="w-full flex flex-wrap text-lg"
        >
          <div class="w-1/5">
            <i
              class="fa fa-credit-card p-5"
              aria-hidden="true"
            ></i>
          </div>
          <div class="w-4/5 text-left p-3">Credits</div>
        </a>
      </li>-->
      <li>
        <div
          @click="logout"
          class="logout w-full flex flex-wrap text-lg"
        >
          <div class="w-1/5">
            <i
              class="fa fa-power-off p-5"
              aria-hidden="true"
            ></i>
          </div>
          <div class="w-4/5 text-left p-3">Sign Out</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: true
    };
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || {};
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
ul > li:hover {
  background-color: #f6f6f6;
}
.logout {
  cursor: pointer;
}
.hr-line {
  border-bottom: 1px solid lightgray;
}
.fa-truck {
  transform: scaleX(-1);
}
.bb {
  border-bottom: 1px dashed lightgray;
}
.fa-truck,
.fa-undo,
.fa-shield {
  font-size: 2rem;
}
</style>