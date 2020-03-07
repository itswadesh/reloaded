import settingQ from '~/gql/settings.gql'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  categories: [],
  settings: null,
  loading: false,
  error: {},
  errors: [],
  isError: null // Only required to inform App.vue that an error is there hence initiate the snackbar
})
export const getters = {
  loading(state) {
    return state.loading
  }
}
export const mutations = {
  categories(state, payload) {
    state.categories = payload
  },
  settings(state, payload) {
    state.settings = payload
  },
  busy(state, payload) {
    state.loading = payload
  },
  success(state, msg) {
    this.$toast.success(msg).goAway(2000)
  },
  warning(state, msg) {
    this.$toast.warning(msg).goAway(5000)
  },
  info(state, msg) {
    this.$toast.info(msg).goAway(5000)
  },
  clearErr(state) {
    state.errors = []
  },
  setGuest(state, guestId) {
    state.guestId = guestId
  },
  setErr(state, e) {
    if (e.graphQLErrors) state.errors = e.graphQLErrors
    if (e.networkError)
      state.errors = e.networkError.result && e.networkError.result.errors
    console.log('xxxxxxxxxxxxxxxxx', e)
    if (state.errors && state.errors[0])
      this.$toast.error(state.errors[0].message).goAway(5000)
  }
}
export const actions = {
  async fetch({ commit, state, getters }) {
    try {
      commit('clearErr')
      const settings = (
        await this.app.apolloProvider.defaultClient.query({
          query: settingQ
        })
      ).data.settings
      await commit('settings', settings)
    } catch (e) {}
  },
  async nuxtClientInit({ state, commit, dispatch }, context) {
    await dispatch('fetch')
    await dispatch('auth/fetch')
    await dispatch('cart/fetch')
  }
}
