export default {
  data: () => ({
    data: [],
    count: 0,
    meta: {
      page: 1,
      count: 0,
      sort: null, // null will honour the search result weight
      search: "",
      end: false
    }
  }),
  methods: {
    async getData(scrolled = false) {
      if (this.meta.busy) return
      if (scrolled && this.meta.end) return;
      this.loading = true;
      try {
        this.meta.busy = true;
        let params = this.$route.query;
        params.page = this.meta.page;
        params.search = this.$route.params.q
        let auth = this.$cookies.get("Authorization");
        // this.$axios.setToken(auth, "Bearer");
        let result = await this.$axios.$get(this.apiQ, { params });
        let data = result.data;
        this.data = scrolled ? this.data.concat(data) : data;
        this.loading = false;
        this.loadmoreSpin = false;
        this.meta.busy = false;
        this.meta.count = result.count;
        this.meta.filtered =
          parseInt(data.length) +
          (parseInt(result.pageSize) - 1) * parseInt(result.page);
        this.meta.end = data.length < result.pageSize ? true : false;
      } catch (e) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async loadMore() {
      this.meta.page++;
      this.getData(true);
    },
    go(url) {
      this.$router.push(url);
    }
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) return;
        this.getData();
      }
    }
  }
}