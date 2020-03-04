import { typingTimeout } from "@/config";

export default {
  data: () => ({
    meta: { end: false, data: [], busy: false },
    data: [],
    count: 0,
    noOfPages: 1,
    currentPage: 1,
    pageSize: 0,
    showFilter: false,
    filterInput: '',
    typingTimeout: typingTimeout,
    typingTimer: null,
    sortBy: '',
    listFields: {},
    descending: false,
    props: {}
  }),
  created() {
    this.filterInput = this.$route.query.search;
    this.listFields = this.f;
    let vm = this;
    this.listFields.forEach(function (v, k) {
      if (v.noList) {
        vm.listFields.splice(k, 1);
      }
    });
  },
  methods: {
    changePage(p) {
      let query = { ...this.$route.query }
      query.page = p
      this.$router.push({ query });
    },
    flush() {
      this.meta.end = false
      this.data = [] // Reset query parameters        
    },
    sort(pr) {
      this.flush()
      this.descending = !this.descending
      if (this.descending) { pr = '-' + pr }
      let query = { ...this.$route.query }
      query.sort = pr
      this.$router.push({ query });
    },
    clone(item) {
      const vm = this
      if (!item) { return }
      this.item = item // Required for cloneConfirmed()
      const cloneConfirmTitle = 'Would you like to clone the ' + this.api + '?'
      this.$swal({
        title: cloneConfirmTitle,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, do it!"
      }).then(result => {
        if (result.value) {
          vm.cloneConfirmed(item);
        }
      });
    },
    async cloneConfirmed(item) {
      let itemCopy = { ...item }
      delete itemCopy._id
      await this.$axios.$post(this.api, itemCopy)
      this.flush()
      this.getData()
    },
    remove(id) {
      let vm = this
      if (!id) { return }
      this.$swal({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          vm.deleteConfirmed(id);
        }
      });
    },
    async deleteConfirmed(id) {
      try {
        this.$store.commit('busy', true);
        await this.$axios.$delete(this.api + '/' + id)
        this.$store.commit('busy', false);
        this.flush()
        this.getData()
      } catch (e) {
        this.$store.commit('busy', false);
        this.$store.commit('setErr', e);
      } finally {
        this.$store.commit('busy', false);
      }
    },
    async getData() {
      let params = this.$route.query;
      if (this.meta.busy || this.meta.end)
        return
      this.$store.commit('busy', true);
      try {
        let { data, count, pageSize, page } = await this.$axios.$get(this.apiQ || this.api, { params })
        this.$store.commit('busy', false);
        if (data) {
          this.meta.page = this.$route.query.page || 1
          this.count = count
          this.pageSize = pageSize
          this.currentPage = page
          this.noOfPages = Math.ceil(count / pageSize);
          this.data = data
        }
      }
      catch (e) {
        this.$store.commit('setErr', e);
        this.$store.commit('busy', false);
      }
    }, go(id) {
      this.$router.push("/" + this.api + "/" + id);
    },
    hideFilterBox() {
      this.showFilter = false;
      this.filterInput = "";
      this.flush();
      this.getData();
    },
    parse(items, prop) {
      prop.split(".").forEach(i => {
        items = items[i];
      });
      return items;
    },
    parseNested(items, prop) {
      // Parse deeply nested objects
      prop.split(".").forEach(i => {
        if (items[i]) {
          items = items[i];
        } else {
          items = "";
        }
      });
      return items;
    },
    setListImage(i) {
      i = "";
    },
    clone1(item) {
      this.clone(item);
    }
  },
  watch: {
    // filterInput: {
    //   immediate: false,
    //   handler(value, oldValue) {
    //     if (!oldValue) return; // Do not trigger on page load
    //     clearTimeout(this.typingTimer);
    //     let vm = this;
    //     this.typingTimer = setTimeout(function () {
    //       if (!value || value == "undefined") value = ""; // When clear button clicked
    //       let query = { ...vm.$route.query }
    //       query.page = 1
    //       query.search = value
    //       vm.$router.push({ query });
    //     }, vm.typingTimeout);
    //   }
    // },
    "$route.query": {
      immediate: true,
      handler(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) return;
        if (value.sort) {
          if (value.sort.charAt(0) == "-") {
            this.sortBy = value.sort.substring(1);
            this.descending = true;
          } else {
            this.sortBy = value.sort;
            this.descending = false;
          }
        }
        this.flush();
        this.getData();
      }
    }
  },
}