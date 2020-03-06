import cart from '~/gql/cart/cart.gql'
import addToCart from '~/gql/cart/addToCart.gql'
import checkout from '~/gql/cart/checkout.gql'
import applyCoupon from '~/gql/cart/applyCoupon.gql'

const state = state => ({
  cart: {},
  items: [],
  qty: 0,
  subtotal: 0,
  discount: null,
  shipping: null,
  tax: null,
  total: 0,
  offer_total: 0,
  showCart: false
})

// getters
const getters = {
  showCart(state) {
    return state.showCart
  },
  checkCart: state => ({ pid, vid }) => {
    // Returns true when there is item in cart
    var found = state.items.some(function(el) {
      return el.pid === pid
    })
    return found
  },
  getItemQty: state => ({ pid, vid }) => {
    // Gets cart qty of that item
    for (let i of state.items) {
      if (i.pid === pid) {
        return i.qty
      } else {
        return 0
      }
    }
  }
}
const actions = {
  async fetch({ commit, state, getters }) {
    // This is only to get data from saved cart
    try {
      const data = (
        await this.app.apolloProvider.defaultClient.query({ query: cart })
      ).data.cart
      commit('setCart', data)
      return data
    } catch (e) {
      console.log('err... ', e)
    }
  },
  async addToCart({ commit }, payload) {
    try {
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: addToCart,
          variables: payload
        })
      ).data.addToCart
      commit('setCart', data)
    } catch (e) {
      throw e
    }
  },
  async applyCoupon({ commit }, payload) {
    let data = (
      await this.app.apolloProvider.defaultClient.mutate({
        mutation: applyCoupon,
        variables: payload
      })
    ).data.applyCoupon
    commit('setCart', data)
  },
  async checkout(
    { commit, state, rootState, getters },
    { paymentMethod, address }
  ) {
    paymentMethod = paymentMethod || 'COD'
    switch (paymentMethod) {
      case 'COD':
        try {
          commit('busy', true, { root: true })
          let order = (
            await this.app.apolloProvider.defaultClient.mutate({
              mutation: checkout,
              variables: {
                address,
                paymentMethod
              }
            })
          ).data.checkout
          this.$router.push('/success?id=' + order._id)
        } catch (err) {
          commit('setErr', err, { root: true })
        } finally {
          commit('busy', false, { root: true })
        }
        break
      case 'Stripe':
        commit('setErr', 'Stripe not implemented yet. Proceed with COD', {
          root: true
        })
        break
      default:
        commit(
          'setErr',
          'The checkout service ' + paymentMethod + ' not yet implemented',
          { root: true }
        )
        console.log('Unknown checkout service: ' + paymentMethod)
        break
    }
  }
}

const mutations = {
  setPromo(state, data) {
    state.promo = data.details
    state.total = data.amount
  },
  setCart(state, data) {
    if (!data) return
    state.items = data.items || []
    state.qty = data.qty
    state.discount = data.discount || 0
    state.subtotal = data.subtotal
    state.total = data.total
    state.offer_total = data.offer_total
  },
  toggleCart(state, payload) {
    state.showCart = payload
  },
  applyDiscount(state, amount) {
    state.discount = amount
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
