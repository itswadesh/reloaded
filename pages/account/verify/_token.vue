<template>
  <div class="signin-page">
    <div class="account-container">
      <center
        v-if="err"
        class="error"
      >
        Account verification failed. Please try again
      </center>
      <center v-else-if="verification">
        <div v-if="verification.status===200">Account verification complete.
          <nuxt-link to="/login">Click here to login</nuxt-link>
        </div>
        <div v-else>
          Account verification failed. Please try again
        </div>
      </center>
    </div>
  </div>
</template>

<script>
import Textbox from "~/components/ui/Textbox";
export default {
  data() {
    return { verification: null, err: null };
  },
  async created() {
    try {
      this.verification = await this.$axios.post(
        "/users/verify/" + this.$route.params.token
      );
      this.err = null;
    } catch (e) {
      this.err = e;
      this.$store.commit("setErr", e, { root: true });
    }
  },
  head() {
    return {
      title: "Verify Email - Litekart",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Forgot Password"
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content: "Forgot Password"
        },

        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Forgot Password"
        },
        // Twitter
        {
          name: "twitter:title",
          content: "Forgot Password"
        },
        {
          name: "twitter:description",
          content: "Forgot Password"
        }
      ]
    };
  }
};
</script>
<style scoped>
.border-t {
  border-bottom: 1px solid lightgray;
}
.container {
  max-height: 80vh !important;
  min-height: 80vh !important;
}
</style>