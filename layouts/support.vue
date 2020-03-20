<template>
  <div
    style="min-height:71.8vh"
    class="antialiased "
  >
  <div v-if="$store.state.errors" class="err">
      <span v-for="(e,ix) in $store.state.errors" :key="ix">{{e.message}}</span>
    </div>
    <support-header />
    <nuxt />
    <new-footer />
  </div>
</template>
<script>
const newFooter = () => import("~/components/footer/newFooter");
const supportHeader = () => import("~/components/support/supportHeader");
export default {
  components: {
    newFooter,
    supportHeader
  }
};
</script>
<style scoped>
.footer-sub-content {
  font-size: 14px;
  opacity: 0.5;
}
.footer-icon {
  padding-right: 10px;
  height: 32px;
  width: 32px;
}
.footer-block {
  background-color: #2a3441;
  width: 100%;
  color: white;
  padding: 35px 20px 25px 0;
  display: flex;
}
.faq-footer {
  display: flex;
  width: 100%;
  margin: auto;
  flex-direction: row;
}
.responsive-top-logo-and-login {
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 32px 0 24px 0;
}
.top-header {
  width: 60%;
  margin: auto;
}
.help-heading {
  width: 100%;
  text-align: center;
  font-size: 40px;
  font-weight: bolder;
  padding: 40px 0 40px 0;
  font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}
.faq-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.contact-button {
  width: 27% !important;
  height: 125px;
  padding: 24px;
  font-size: 18px;
  font-weight: bold;
  font-family: Helvetica;
}
.faqs {
  width: 70% !important;
}
.faq-heading-active {
  font-weight: bold;
  font-size: 16px;
}
.header-background {
  background-image: url(data:image/png;base64,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);
}
.container {
  width: 60%;
}
.card-faq {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.faq-list {
  cursor: pointer;
  padding: 0 40px 0 40px;
}
.faq-list:hover {
  transition: 0.3s;
  background-color: #f7f8fa !important;
}
.faq-list:last-child > .faq-list-item {
  border-bottom: initial !important;
}
.faq-list-item {
  color: #454242;
  font-size: medium;
  font-weight: 100;
  padding: 22px 0 22px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  font-family: Helvetica;
  /*justify-content: space-between;*/
}
.card {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  max-width: initial;
  display: flex;
  height: 170px;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.cards {
  display: flex;
  width: 100%;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
}
.d-direction {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
}
.self-align {
  align-self: center;
  font-size: 14px;
  text-align: center;
}
.header {
  width: 100%;
  background-color: #ed8538;
}
.faq-button {
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  background-color: #ed8538;
  color: #fff;
  padding: 10px 12px;
  border-radius: 2px;
  letter-spacing: 0.4px;
  border: 0;
}
.faq-active:hover {
  background-color: initial !important;
}

.image-align-center {
  text-align: center;
}
.image-align-center-footer {
  text-align: center;
}

.login-area {
  display: flex;
  justify-content: space-between;
  width: 250px;
}

@media only screen and (max-width: 600px) {
  .image-align-center-footer {
    text-align: center !important;
  }
  .mobile-view {
    justify-content: center;
    padding-top: 38px !important;
    padding-bottom: 35px !important;
    order: 3;
    background-color: #16202d !important;
  }
  .footer-contact {
    padding: 25px 0 15px 20px !important;
  }
  .footer-block {
    padding: 25px 25px 5px 25px;
  }
  .faq-footer {
    flex-direction: column;
    width: 100%;
  }
  .help-heading {
    padding: 0 0 25px 0;
  }
  .responsive-top-logo-and-login {
    padding: 20px 4px 24px 20px;
  }

  .login-area {
    justify-content: space-evenly;
    width: 200px;
  }

  .back-to-shop-text {
    display: none;
  }

  .home-text {
    display: initial;
  }

  .d-direction {
    flex-direction: column;
  }

  .container {
    width: 100%;
  }

  .faq-block {
    flex-direction: column;
  }

  .contact-button {
    width: 100% !important;
    margin-top: 20px;
  }

  .faqs {
    width: 100% !important;
  }

  .help-heading {
    font-size: 24px;
  }

  .top-header {
    width: 100%;
  }
}

@media only screen and (min-width: 600px) {
  .image-align-center-footer {
    text-align: center !important;
  }
  .mobile-view {
    justify-content: center;
    padding-top: 38px !important;
    padding-bottom: 35px !important;
    order: 3;
    background-color: #16202d !important;
  }
  .footer-contact {
    padding: 25px 0 15px 20px !important;
  }
  .footer-block {
    padding: 25px 25px 5px 25px;
  }
  .faq-footer {
    flex-direction: column;
    width: 100%;
  }
  .help-heading {
    padding: 0 0 25px 0;
  }

  .responsive-top-logo-and-login {
    padding: 20px 4px 24px 20px;
  }

  .login-area {
    justify-content: space-evenly;
    width: 200px;
  }

  .back-to-shop-text {
    display: none;
  }

  .home-text {
    display: initial;
  }

  .container {
    width: 100%;
  }

  .d-direction {
    flex-direction: column;
  }

  .faq-block {
    flex-direction: column;
  }

  .contact-button {
    width: 100% !important;
    margin-top: 20px;
  }

  .faqs {
    width: 100% !important;
  }

  .help-heading {
    font-size: 28px;
  }

  .top-header {
    width: 100%;
  }
}

@media only screen and (min-width: 768px) {
  .image-align-center-footer {
    text-align: initial !important;
  }
  .mobile-view {
    justify-content: initial;
    padding: 25px !important;
    order: initial;
    background-color: #2a3441 !important;
  }
  .footer-contact {
    padding: 25px 0 15px 20px;
  }
  .footer-block {
    padding: 30px 20px 15px 24px !important;
  }
  .faq-footer {
    flex-direction: row;
    width: 100%;
  }
  .help-heading {
    padding: 10px 0 25px 0;
  }

  .responsive-top-logo-and-login {
    padding: 20px 4px 24px 20px;
  }

  /*.faq-logo{*/
  /*  padding-left: 10%;*/
  /*}*/
  .login-area {
    justify-content: space-evenly;
    width: 250px;
  }

  .back-to-shop-text {
    display: initial;
  }

  .home-text {
    display: none;
  }

  .container {
    width: 100%;
  }

  .d-direction {
    flex-direction: column;
  }

  .faq-block {
    flex-direction: column;
  }

  .contact-button {
    width: 100% !important;
    margin-top: 20px;
  }

  .faqs {
    width: 100% !important;
  }

  .help-heading {
    font-size: 32px;
  }

  .top-header {
    width: 80%;
  }
}

@media only screen and (min-width: 992px) {
  .image-align-center-footer {
    text-align: initial !important;
  }
  .footer-block {
    padding: 30px 20px 15px 24px !important;
  }
  .faq-footer {
    flex-direction: row;
  }
  .help-heading {
    padding: 30px 0 35px 0;
  }

  .responsive-top-logo-and-login {
    padding: 20px 20px 24px 20px;
  }

  .back-to-shop-text {
    display: initial;
  }

  .home-text {
    display: none;
  }

  .d-direction {
    flex-direction: row;
  }

  .faq-block {
    flex-direction: row;
  }

  .contact-button {
    width: 27% !important;
    margin-top: 0 !important;
  }

  .faqs {
    width: 70% !important;
  }

  .help-heading {
    font-size: 34px;
  }

  .top-header {
    width: 85%;
  }
}

@media only screen and (min-width: 1200px) {
  .image-align-center-footer {
    text-align: initial !important;
  }
  .mobile-view {
    justify-content: initial;
    padding: 25px !important;
    order: initial;
    background-color: #2a3441 !important;
  }
  .footer-block {
    padding: 30px 20px 15px 24px !important;
  }
  .faq-footer {
    flex-direction: row;
  }
  .help-heading {
    padding: 35px 0 40px 0;
  }

  .responsive-top-logo-and-login {
    padding: 20px 0 24px 0;
  }

  .back-to-shop-text {
    display: initial;
  }

  .home-text {
    display: none;
  }

  .d-direction {
    flex-direction: row;
  }

  .contact-button {
    width: 27% !important;
    margin-top: 0 !important;
  }

  .help-heading {
    font-size: 40px;
  }

  .top-header {
    width: 85%;
  }
}
</style>
