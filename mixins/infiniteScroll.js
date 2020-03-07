export default {
  data: () => ({
    data: [],
    meta: {
      page: 1,
      count: 0,
      sort: null, // null will honour the search result weight
      search: '',
      end: false
    }
  }),
  methods: {
    async getData(scrolled = false) {
      if (this.meta.busy) return
      if (scrolled && this.meta.end) return
      this.loading = true
      try {
        this.meta.busy = true
        let params = this.$route.query
        params.page = this.meta.page
        params.search = this.$route.params.q
        this.$store.commit('clearErr')
        const { data, count, pageSize, page } = (
          await this.$apollo.query({
            query: this.model,
            variables: params,
            fetchPolicy: 'no-cache'
          })
        ).data[this.attr]
        this.data = scrolled ? this.data.concat(data) : data
        this.loadmoreSpin = false
        this.meta.count = count
        this.meta.filtered =
          parseInt(data.length) + (parseInt(pageSize) - 1) * parseInt(page)
        this.meta.end = data.length < pageSize ? true : false
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.loading = false
        this.meta.busy = false
      }
    },
    async loadMore() {
      this.meta.page++
      this.getData(true)
    },
    go(url) {
      this.$router.push(url)
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) return
        this.getData()
      }
    }
  }
}
