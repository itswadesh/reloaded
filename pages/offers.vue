<template>
  <div>
    <Heading title="Offers" />

    <div class="bg-gray-900 min-h-screen">
      <div class="flex flex-wrap">
        <Coupon
          v-for="c in coupons.data"
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
      coupons: []
    }
  },
  async created() {
    try {
      this.$store.commit('busy', true)
      this.$store.commit('clearErr')
      this.coupons = (
        await this.$apollo.query({
          query: coupons,
          fetchPolicy: 'no-cache'
        })
      ).data.coupons
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  }
}
</script>

<style></style>
