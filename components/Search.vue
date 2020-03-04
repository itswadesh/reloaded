<template>
  <div class="bg-white fixed text-center lg:w-1/2 top-0 w-full px-2 py-2 z-10">
    <form class="relative" novalidate autocomplete="off" @submit.stop.prevent="submit(search)">
      <div class="absolute">
        <i class="fa fa-search m-3 text-gray-500" aria-hidden="true" />
      </div>
      <input
        aria-label="Search Box"
        type="text"
        v-model="search"
        class="w-full px-10 bg-purple-white pr-4 border border-gray-200 rounded-full border-0 h-10 focus:outline-none text-xs shadow"
        placeholder="Search for food"
        name="search"
      />
      <button @click="go(-1)" class="absolute right-0 top-0">
        <i class="fa fa-long-arrow-left m-3 text-gray-500" aria-hidden="true" />
      </button>
    </form>
  </div>
</template>

<script>
import { typingTimeout } from "~/config";
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    submit(q) {
      this.$router.push(`/search/${q}`);
    },
    go(url) {
      this.$router.go(-1);
    }
  },
  created() {
    this.search = this.$route.params.q;
  },
  watch: {
    search: {
      immediate: false,
      handler(value, oldValue) {
        // if (value.length < 4) return;
        if (!oldValue) return; // Do not trigger on page load
        clearTimeout(this.typingTimer);
        let vm = this;
        this.typingTimer = setTimeout(function() {
          if (!value || value == "undefined") value = ""; // When clear button clicked
          vm.searchString = value;
          vm.$router.push(`/search/${value}`);
        }, typingTimeout);
      }
    },
    "$route.query.q": {
      immediate: true,
      handler(value) {
        let pathName = null;
        if (this.$route.name) pathName = this.$route.name.substr(0, 8);
        if (pathName === "category") return;
        if (!value || value == "undefined") value = "";
        if (value == "") return;
        if (this.search == "") this.search = value;
      }
    }
  }
};
</script>
