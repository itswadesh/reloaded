<template>
  <div>
    <Heading title="Offers" />
    <div
      v-if="errors"
      class="mx-2 text-center"
    >
      <span
        v-for="(e,ix) in errors"
        :key="ix"
      >{{e.message}}</span>
    </div>
    <div class="bg-gray-900 min-h-screen">
      <div class="flex flex-wrap">
        <Coupon
          v-for="c in coupons"
          :key="c._id"
          :color="c.color"
          :code="c.code"
          :text="c.text"
          :terms="c.terms"
        />
        <!-- <Coupon
          color="red"
          code="10 off"
          text="Lorem ipsum, dolor sit amet consectetur"
          terms="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
        />
        <Coupon
          color="violet"
          code="10 off"
          text="Lorem ipsum, dolor sit amet consectetur"
          terms="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
        />
        <Coupon
          color="cyan"
          code="10 off"
          text="Lorem ipsum, dolor sit amet consectetur"
          terms="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
        />
        <Coupon
          color="orange"
          code="10 off"
          text="Lorem ipsum, dolor sit amet consectetur"
          terms="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
        />-->
      </div>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import Heading from '~/components/Heading'
import Coupon from '~/components/Coupon'
import StickyFooter from '~/components/footer/StickyFooter'
import coupons from '~/gql/cart/coupons.gql'

export default {
  components: { Heading, Coupon, StickyFooter },
  data() {
    return {
      coupons: [],
      errors: []
    }
  },
  async created() {
    this.errors = []
    try {
      this.$store.commit('busy', true)
      this.$store.commit('clearErr')
      this.coupons = (
        await this.$apollo.query({
          query: coupons,
          fetchPolicy: 'no-cache'
        })
      ).data.coupons
    } catch ({ graphQLErrors, networkError }) {
      if (graphQLErrors) this.errors = graphQLErrors
      if (networkError)
        this.errors = networkError.result && networkError.result.errors
    } finally {
      this.$store.commit('busy', false)
    }
  }
}
</script>

<style></style>
