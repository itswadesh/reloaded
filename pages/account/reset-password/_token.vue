
<template>
  <div>
    <div class="bg-gray-100 xs:mobile-login h-full px-4">
      <div class="container mx-auto h-full flex items-center">
        <div class="lg:w-1/3 w-full">
          <div class="border-teal border-t-12 bg-white mb-6 rounded shadow-2xl">
            <div class="p-0 secondary text-white rounded rounded-b-none">
              <h1 class="text-xl mb-6 text-left p-3">
                <span class="font-extrabold">RESET PASSWORD</span>
              </h1>
            </div>
            <p
              class="success"
              v-if="success"
            >{{success}}</p>
            <p
              class="info"
              v-else
            >Enter your new password</p>
            <form
              novalidate
              autocomplete="off"
              @submit.stop.prevent="submit()"
              class="center"
            >
              <div class="p-6">
                <div>
                  <Textbox
                    v-model="password"
                    name="newPassword"
                    label="New Password"
                    ref="newPassword"
                    type="password"
                    class="w-full"
                    v-validate="'required|min:3'"
                  />
                  <p
                    class="input_err"
                    v-if="errors.first('password')"
                  >{{errors.first('password')}}</p>
                  <Textbox
                    v-model="confirm"
                    name="repeatPassword"
                    label="Repeat Password"
                    ref="repeatPassword"
                    type="password"
                    class="w-full"
                    v-validate="'required|min:3'"
                  />
                  <p
                    class="input_err"
                    v-if="errors.first('password_confirmation')"
                  >{{errors.first('password_confirmation')}}</p>
                </div>
                <div class="flex items-center justify-between">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="flex items-center justify-center h-14 text-2xl outline-none w-full font-bold py-2 rounded"
                    :class="{'primary text-white':!loading,'border border-gray-400 bg-gray-300':loading}"
                  >
                    <div v-if="loading">
                      <img
                        src="/loading.svg"
                        :class="{'loading':loading}"
                        alt=""
                      />
                    </div>
                    <span v-else>Reset Password</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Textbox from "~/components/ui/Textbox";

export default {
  data() {
    return {
      success: null,
      err: null,
      token: null,
      password: "",
      confirm: "",
      loading: false
    };
  },
  created() {
    this.token = this.$route.params.token;
  },
  components: { Textbox },
  methods: {
    async submit() {
      if (!this.password) {
        this.success = null;
        this.$store.commit("setErr", "Please enter a new password");
      } else if (!this.confirm) {
        this.success = null;
        this.$store.commit("setErr", "Please repeat the password again");
      } else if (this.password !== this.confirm) {
        this.success = null;
        this.$store.commit(
          "setErr",
          "New password and confirm password does not match"
        );
      } else {
        try {
          this.success = await this.$axios.$post(
            "/users/reset/" + this.$route.params.token,
            {
              password: this.password
            }
          );
          this.err = null;
          this.$store.commit("info", "Password reset successful");
          this.$router.push("/login");
        } catch (e) {
          this.success = null;
          if (e && e.response) {
            this.err = e.response.data;
            this.$store.commit("setErr", e.response.data);
            this.$router.push(
              "/account/forgot-password?err=" + e.response.data
            );
          }
        }
      }
    }
  },
  head() {
    return {
      title: "Reset Password",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "We all are forgetful. Don't worry, this page will help you to recover your password"
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content:
            "We all are forgetful. Don't worry, this page will help you to recover your password"
        },
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Reset Password"
        },
        // Twitter
        {
          name: "twitter:title",
          content: "Reset Password"
        },
        {
          name: "twitter:description",
          content:
            "We all are forgetful. Don't worry, this page will help you to recover your password"
        }
      ]
    };
  },
  layout: "blank"
};
</script>
<style scoped>
.input_err {
  text-align: left;
  margin: 5px 0;
  font-size: 14px;
  color: red;
}
.border-t {
  border-bottom: 1px solid lightgray;
}
.container {
  max-height: 80vh !important;
  min-height: 80vh !important;
}
</style>