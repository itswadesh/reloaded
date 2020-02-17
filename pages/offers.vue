<template>
  <div>
    <Heading title="Offers" />
    <div class="bg-gray-900 min-h-screen">
      <div class="flex flex-wrap">
        <Coupon
          color="gray"
          code="10 off"
          text="Lorem ipsum, dolor sit amet consectetur"
          terms="Lorem ipsum dolor sit amet consectetur, adipisicing elit"
        />
        <Coupon
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
        />
      </div>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import Heading from "~/components/Heading";
import Coupon from "~/components/Coupon";
import StickyFooter from "~/components/footer/StickyFooter";

export default {
  components: { Heading, Coupon, StickyFooter }
};
</script>

<style></style>
