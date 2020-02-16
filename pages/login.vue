<template>
  <div>
    <div class="bg-gray-100 xs:mobile-login h-full px-4">
      <div class="container mx-auto h-full flex items-center">
        <div class="lg:w-1/3 w-full">
          <div class="border-teal border-t-12 bg-white mb-6 rounded shadow-2xl">
            <div class="p-0 secondary text-white rounded rounded-b-none">
              <h1 class="text-xl mb-6 text-left p-3">
                <span class="font-extrabold" v-if="!signup">SIGN IN</span>
                <span class="font-extrabold" v-else>SIGN UP</span> TO YOUR ACCOUNT
              </h1>
            </div>
            <form novalidate autocomplete="off" @submit.stop.prevent="submit()" class="center">
              <div class="p-6">
                <div>
                  <Textbox v-model="uid" label="Email/Phone" @keyup="onPhoneChange" />
                </div>
                <div v-if="showOTP">
                  <Textbox v-if="signup" v-model="firstName" label="Fisrt Name" class="w-full" />
                  <Textbox v-if="signup" v-model="lastName" label="Last Name" class="w-full" />
                  <!-- <p class="text-red-500 mb-5 text-xs font-hairline">Please enter password</p> -->
                  <!-- Show password box -->
                  <div v-if="!isPhone">
                    <Textbox
                      v-model="password"
                      name="password"
                      label="Password"
                      ref="password"
                      type="password"
                      class="w-full"
                    />
                  </div>
                  <!-- Show OTP box -->
                  <div v-else>
                    <div
                      id="wraper1"
                      class="otp-seperator w-1 h-1 rounded absolute"
                      :class="{'wraper-hide':otp.length>0}"
                    ></div>
                    <div
                      id="wraper2"
                      class="otp-seperator w-1 h-1 rounded absolute"
                      :class="{'wraper-hide':otp.length>1}"
                    ></div>
                    <div
                      id="wraper3"
                      class="otp-seperator w-1 h-1 rounded absolute"
                      :class="{'wraper-hide':otp.length>2}"
                    ></div>
                    <div
                      id="wraper4"
                      class="otp-seperator w-1 h-1 rounded absolute"
                      :class="{'wraper-hide':otp.length>3}"
                    ></div>
                    <input
                      v-model="otp"
                      name="otp"
                      ref="otp"
                      class="outline-none pl-4 otp-content w-32 bg-transparent border border-gray-400"
                      maxlength="4"
                      autocomplete="off"
                      @keyup="onKeyUpEvent(otp.length, $event)"
                    />
                  </div>
                </div>
                <div class="flex-col items-center justify-between">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="flex items-center justify-center h-14 text-2xl outline-none w-full font-bold py-2 rounded"
                    :class="{'primary text-white':!loading,'border border-gray-400 bg-gray-300':loading}"
                  >
                    <div v-if="loading">
                      <img src="/loading.svg" :class="{'loading':loading}" alt />
                    </div>
                    <span v-else>{{submitText}}</span>
                  </button>
                  <p class="text-xs mt-2">
                    <nuxt-link to="/account/forgot-password">Forgot Password?</nuxt-link>
                  </p>
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
      loading: false,
      fadeIn: "",
      disable: "disable",
      p: {},
      msg: null,
      signup: false,
      uid: "",
      password: "",
      firstName: "",
      lastName: "",
      otp: "",
      showOTP: false
    };
  },
  components: { Textbox },
  computed: {
    isEmail() {
      if (this.uid.includes("@")) return true;
      else return false;
    },
    isPhone() {
      const phoneno = /^[+()\d-]+$/;
      if (this.uid.length >= 10 && this.uid.match(phoneno)) return true;
      else return false;
    },
    submitText() {
      if (this.signup) {
        return "Signup New Account";
      } else if (!this.isPhone && !this.isEmail && !this.showOTP) {
        return "Verify";
      } else if (this.isPhone && !this.showOTP) {
        return "Verify Phone"; //Login Now
      } else if (this.isEmail && !this.showOTP) {
        return "Verify Email"; //Login Now
      } else if (this.isPhone && this.showOTP) {
        return "Verify OTP";
      } else {
        return "Login Now";
      }
    }
  },
  methods: {
    async submit() {
      if (!this.uid || this.uid == "") {
        this.$store.commit("setErr", "Please enter your email/phone no");
        return;
      }
      if (!this.isPhone && !this.isEmail) {
        this.$store.commit("setErr", "Entered email is not valid");
        return;
      }
      if (this.isPhone) {
        await this.phoneLogin();
      } else {
        await this.emailLogin();
      }
    },
    async phoneLogin() {
      this.loading = true;
      if (!this.showOTP) {
        // When clicked 1st time
        try {
          const otp = await this.$axios.get("api/users/phone/" + this.uid);
          if (otp.status == 200 || otp.status == 201) {
            this.showOTP = true;
            this.msg = "Please enter OTP sent to your Mobile";
            // this.$refs.otp.focus();
            return;
          }
        } catch (e) {
          console.log("err...", e);
        } finally {
          this.loading = false;
        }
      } else {
        try {
          this.loading = true;
          const res = await this.$store.dispatch("auth/login", {
            phone: this.uid,
            password: this.otp,
            route: this.$route.query.return
          });
        } catch (e) {
        } finally {
          this.loading = false;
        }
      }
    },
    async emailLogin() {
      if (!this.showOTP) {
        // When clicked 1st time
        try {
          const otp = await this.$axios.get("api/users/email/" + this.uid);
          this.showOTP = true;
          this.msg = "Please enter your password";
          // this.$refs.otp.focus();
          return;
        } catch (e) {
          if (e.response && e.response.status == "400") {
            this.signup = true;
            this.showOTP = true;
            console.log("err...", e.response.status);
          } else {
            console.log("err...", e.toString());
          }
        } finally {
          this.showOTP = true;
          this.loading = false;
        }
      } else {
        try {
          this.loading = true;
          if (this.signup) {
            const res = await this.$store.dispatch("auth/signup", {
              email: this.uid,
              firstName: this.firstName,
              lastName: this.lastName,
              password: this.password,
              route: this.$route.query.return
            });
          } else {
            const res = await this.$store.dispatch("auth/login", {
              uid: this.uid,
              password: this.password,
              route: this.$route.query.return
            });
          }
          this.showOTP = true;
          // this.$refs.password.focus();
        } catch (e) {
          this.showOTP = false;
          this.msg = this.err = e.response && e.response.data;
          this.$store.commit("setErr", this.err, { root: true });
          // this.$refs.uid.focus();
        } finally {
          this.showOTP = true;
          this.loading = false;
        }
      }
    },
    onKeyUpEvent(index, event) {
      const eventCode = event.which || event.keyCode;
      if (index == 4) {
        this.submit(); // Submit code
      }
    },
    onPhoneChange(e) {
      if (e.keyCode != 13) {
        this.showOTP = false;
        this.p = {};
        return;
      }
    }
  },
  head() {
    return {
      title: "Login to Litekart",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "After this checkout process we will ship the item and it should be delivered within 7 working days"
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content:
            "After this checkout process we will ship the item and it should be delivered within 7 working days"
        },

        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Checkout with the products in your cart"
        },
        // Twitter
        {
          name: "twitter:title",
          content: "Checkout with the products in your cart"
        },
        {
          name: "twitter:description",
          content:
            "After this checkout process we will ship the item and it should be delivered within 7 working days"
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