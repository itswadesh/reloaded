import { tokenExpiry, userRoles } from '~/config'
import updateProfile from '~/gql/user/updateProfile.gql'
import me from '~/gql/user/me.gql'

export const state = () => ({
  user: null,
  guest: false, // Only used to enter inside /checkout
  roles: userRoles || []
})

// getters
export const getters = {
  hasRole: state => role => {
    return state.user
      ? state.roles.indexOf(state.user.role) >= state.roles.indexOf(role)
      : false
  }
}

// mutations
export const mutations = {
  setGuest(state, data) {
    state.guest = data
  },
  setToken(state, data) {
    state.token = data
  },
  setUser(state, data) {
    state.user = data
  },
  clearUser(state) {
    state.user = null
  },
  setZip(state, zipcode) {
    state.zipcode = zipcode
    localStorage.setItem('zipcode', zipcode)
    Cookie.set('zipcode', zipcode)
  }
}

export const actions = {
  async fetch({ commit, state, getters }) {
    // This is only to get data from saved cart
    try {
      commit('clearErr', null, { root: true })
      commit('busy', true, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.query({
          query: me,
          fetchPolicy: 'no-cache'
        })
      ).data.me
      commit('setUser', data)
      return data
    } catch (e) {
      commit('setErr', e, { root: true })
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async updateProfile({ commit, rootState }, variables) {
    try {
      const data = await this.app.apolloProvider.defaultClient.mutate({
        mutation: updateProfile,
        variables
      })
      if (data) {
        commit('setUser', {
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          verified: data.verified,
          dob: data.dob,
          gender: data.gender,
          language: data.language,
          state: data.state,
          city: data.city,
          zip: data.zip,
          phone: data.phone,
          info: data.info
        })
        commit('info', 'Profile updated.', { root: true })
        return data
      }
    } catch (err) {
      throw err
    }
  }
}
