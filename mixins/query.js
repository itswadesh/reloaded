import search from '~/gql/product/search.gql'

export default {
  data: () => ({
    meta: { end: false, data: [], busy: false },
    data: [],
    count: 0
  }),
  methods: {
    async getData() {
      let params = this.$route.query
      params.page = this.meta.page
      params.search = this.$route.params.q
      if (this.meta.busy || this.meta.end) return
      this.errors = []
      try {
        this.$store.commit('busy', true)
        this.$store.commit('clearErr')
        let { data, count, pageSize, page } = (
          await this.$apollo.query({
            query: search,
            variables: params,
            fetchPolicy: 'no-cache'
          })
        ).data.my
        if (data) {
          this.meta.page = this.$route.query.page
          this.count = count
          this.pageSize = pageSize
          this.currentPage = page
          this.noOfPages = Math.ceil(count / pageSize)
          this.data = data
        }
      } catch ({ graphQLErrors, networkError }) {
        if (graphQLErrors)
          graphQLErrors.map(
            err => this.errors.push(err)
            // console.error(
            //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            // )
          )
        if (networkError) {
          this.errors = networkError.result.errors
          console.error(`[Network error]:`, networkError.result)
        }
      } finally {
        this.$store.commit('busy', false)
      }
    },
    flush() {
      this.meta.end = false
      this.data = [] // Reset query parameters
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
        if (value.sort) {
          if (value.sort.charAt(0) == '-') {
            this.sortBy = value.sort.substring(1)
            this.descending = true
          } else {
            this.sortBy = value.sort
            this.descending = false
          }
        }
        this.flush()
        this.getData()
      }
    }
  }
}
