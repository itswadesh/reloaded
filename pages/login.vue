<template>
  <div class="bg-gray-200 h-screen flex flex-col items-center justify-center">
    <div class="lg:w-1/3 w-full px-4">
      <div class="bg-white rounded shadow">
        <div class="text-secondary text-white">
          <h1 class="text-xl mb-2 text-center p-3">
            <span
              class="font-extrabold"
              v-if="!signup"
            >SIGN IN</span>
            <span
              class="font-extrabold"
              v-else
            >SIGN UP</span> TO YOUR ACCOUNT
          </h1>
        </div>
        <form
          novalidate
          autocomplete="off"
          @submit.stop.prevent="submit()"
          class="center"
        >
          <div class="p-6">
            <div>
              <Textbox
                type="tel"
                v-model="uid"
                label="Phone"
                @keyup="onPhoneChange"
                class="bg-gray-200"
              />
            </div>
            <div v-if="showOTP">
              <Textbox
                v-if="signup"
                v-model="firstName"
                label="Fisrt Name"
                class="w-full bg-gray-200"
              />
              <Textbox
                v-if="signup"
                v-model="lastName"
                label="Last Name"
                class="w-full bg-gray-200"
              />
              <!-- <p class="text-red-500 mb-5 text-xs font-hairline">Please enter password</p> -->
              <!-- Show password box -->
              <div v-if="!isPhone">
                <Textbox
                  v-model="password"
                  name="password"
                  label="Password"
                  ref="password"
                  type="password"
                  class="w-full  bg-gray-200"
                />
              </div>
              <!-- Show OTP box -->
              <div
                v-else
                class=" text-center"
              >
                <p class="text-red-500 mb-5 text-xs font-hairline">Please enter OTP sent to mobile number</p>
                <div class="otp-container relative inline-block rounded p-2 w-32 w-12 mb-10 bg-gray-200">
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
                    type="tel"
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
            </div>
            <div class="flex-col items-center justify-between">
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
                    alt
                  />
                </div>
                <span v-else>{{submitText}}</span>
              </button>
              <!-- <p class="text-xs mt-2">
                    <nuxt-link to="/account/forgot-password">Forgot Password?</nuxt-link>
                  </p> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Textbox from "~/components/ui/Textbox";
import { location } from "~/mixins";
export default {
  mixins: [location],
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
  async created() {
    // let geoCookie = await this.$cookies.get("geo");
    // let geo = await this.locateMe(geoCookie.coords);
    // console.log(geo);
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
          let geoCookie = this.$cookies.get("geo");
          if (!geoCookie && process.client) {
            this.$router.push("/change-location");
          }
        } catch (e) {
          this.$store.commit("setErr", e.response.data);
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
.wraper-hide {
  visibility: hidden;
}
.border-t {
  border-bottom: 1px solid lightgray;
}
.big-button {
  background: linear-gradient(87deg, #fb6340, #da1c5f) !important;
  border-color: #fb6340;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.otp-container .otp-seperator {
  background-color: #dfe1e6;
  border: 1px solid #dfe1e6;
}
.otp-container #wraper1 {
  top: 20px;
  left: 28px;
}
.otp-container #wraper2 {
  top: 20px;
  left: 51px;
}
.otp-container #wraper3 {
  top: 20px;
  left: 76px;
}
.otp-container #wraper4 {
  top: 20px;
  left: 100px;
}
.otp-container .otp-content {
  letter-spacing: 15px;
  border: 1px solid transparent;
}
input + label {
  position: relative;
  z-index: 999;
}
</style>