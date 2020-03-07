<template>
  <div class="flex flex-col w-full">
    <div class="height">
      <img v-lazy="$store.state.settings.CDN_URL+d.img+'?tr=w-300,h-200'" class="backgroundimg" />
    </div>
    <div class="fx">
      <div></div>
      <div class="m-choice m-align" v-if="d.time=='12 - 2 PM'">Lunch</div>
    </div>
    <div class="row" v-if="d.ratings">
      <span>
        <Ratingcircle :rating="d.ratings" class="m-review" />
      </span>
      <span class="pl-2 review-font">{{d.reviews}} reviews</span>
    </div>
    <div class="restroname">{{d.name}}</div>
    <div class="card-container">
      <div class="a-contain">
        <div style="font-weight:600;min-width: 3rem;">{{d.rate | currency}}</div>
        <div class="f-pink">
          Sold out on
          <br />
          {{d.updatedAt | date}}
        </div>
        <img v-if="d.type=='N'" src="/non-veg.png" class="image-size" />
        <img v-else src="/veg.png" class="image-size" />
      </div>
      <div class="p-name">By : {{d.restaurant}}</div>
      <!-- <div v-if="d.sales" class="sales">{{d.sales}} sold</div> -->
    </div>
  </div>
</template>
<script>
const Ratingcircle = () => import('~/components/Ratingcircle')

export default {
  props: ['d'],
  components: { Ratingcircle }
}
</script>

<style scoped>
.err-banner {
  width: 100%;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: deeppink;
  color: #000;
  font-weight: 700;
}
.mask {
  top: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 10rem;
  padding: 4rem;
}
.v-btn--active {
  border-bottom: 2px solid red;
}
.product-card {
  display: flex;
  background-color: rgb(247, 247, 247);
  justify-content: center;
  border-radius: 0.2rem;
  margin: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
  width: calc(50% - 1rem);
}
@media (min-width: 650px) {
  .product-card {
    width: calc(25% - 1rem);
  }
}
@media (min-width: 1000px) {
  .product-card {
    width: calc(20% - 1rem);
  }
}
.backgroundimg {
  border-radius: 0.3rem 0.3rem 0 0;
  min-height: 126px;
  /* box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important; */
}

.image-size {
  width: 1.5rem;
  height: 1.5rem;
}
.a-contain {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.p-name {
  font-size: 0.9rem;
  line-height: 1rem;
  color: #3279ff;
  padding-top: 0.5rem;
  border-top: 1px solid lightgrey;
  margin-top: 0.5rem;
}
.align-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.f-pink {
  color: rgb(255, 0, 104);
  font-size: 0.7rem;
  letter-spacing: 1px;
  font-weight: 500;
}
.card-container {
  padding: 0.4rem;
}
.time {
  font-size: 0.8rem;
  color: #eee;
}
.v-dialog__content {
  background: rgba(0, 0, 0, 0.6);
}
.restroname {
  padding-left: 0.4rem;
  padding-top: 0.4rem;
  font-weight: 500;
  color: #0c921e;
  font-size: 0.9rem;
}
.fz6 button {
  padding-left: 1rem;
  font-size: 0.8rem;
  padding-left: 0.5rem !important;
}
.m-choice {
  border: none;
  background-color: darkorange;
  border-radius: 0 1rem;
  padding: 0.2rem 0.8rem;
  color: cornsilk;
  font-size: 0.8rem;
}
.m-align {
  margin-top: -0.7rem;
  margin-right: 0.2rem;
}
.border-t {
  border-top: 2px solid #d0c7c7;
  width: 100%;
  margin-top: 0.3rem;
}
.inline {
  inline-size: -webkit-fill-available;
}
.older-text {
  color: red;
  font-size: 1.2rem;
}
.review-font {
  font-size: 0.8rem;
  color: #4448f5;
  margin-top: 0.5rem;
  font-weight: 600;
}
.m-review {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}
.sales {
  color: #e88403;
  font-size: 0.8rem;
  padding-top: 0.15rem;
}
</style>
