import { tokenExpiry, userRoles } from "~/config";
export const state = () => ({
  user: null,
  guest: false, // Only used to enter inside /checkout
  roles: userRoles || []
});

// getters
export const getters = {
  hasRole: state => role => {
    return state.user
      ? state.roles.indexOf(state.user.role) >= state.roles.indexOf(role)
      : false;
  }
};

// mutations
export const mutations = {
  setGuest(state, data) {
    state.guest = data;
  },
  setToken(state, data) {
    state.token = data;
  },
  setUser(state, data) {
    state.user = data;
  },
  clearUser(state) {
    state.user = null;
  },
  setZip(state, zipcode) {
    state.zipcode = zipcode;
    localStorage.setItem("zipcode", zipcode);
    Cookie.set("zipcode", zipcode);
  }
};

export const actions = {
  async fetch({ commit }) {
    try {
      const res = await this.$axios.$get("api/users/me");
      commit("setUser", res);
      return res;
    } catch (err) {
      this.$axios.setToken(false);
      commit("clearUser");
      throw err;
    }
  },
  async socialLogin({ commit }, token) {
    try {
      if (token) {
        this.$axios.setToken(token, "Bearer");
        const user = await this.$axios.$get("api/users/me");
        commit("setUser", user);
        this.$cookies.set("Authorization", token, {
          path: "/",
          maxAge: tokenExpiry
        });
        return user;
      }
    } catch (err) {
      commit("setErr", err, { root: true });
    }
  },
  async phone({ commit }, payload) {
    if (!payload.phone || payload.phone == "") {
      throw "Please enter otp";
    }
    try {
      const data = await this.$axios.$post("api/auth/phone", payload);
      if (data && data.token) {
        this.$axios.setToken(data.token, "Bearer");
        commit("setUser", data.user);
        commit("success", "Verified! Thank You.", { root: true });
        this.$cookies.set("Authorization", data.token, {
          path: "/",
          maxAge: tokenExpiry
        });
        let returnUrl = payload.route || "/my";
        this.$router.push(returnUrl);
        commit("cart/setCart", data.cart, { root: true });
        return data;
      } else {
        throw "Invalid phone number";
      }
    } catch (err) {
      commit("setErr", err, { root: true });
    }
  },
  async login({ commit }, payload) {
    if (!payload.password || payload.password == "") {
      throw "Please enter password";
    }
    try {
      const data = await this.$axios.$post("api/auth/local", payload);
      if (data && data.token) {
        this.$axios.setToken(data.token, "Bearer");
        commit("setUser", data.user);
        commit("success", "Verified! Thank You.", { root: true });
        this.$cookies.set("Authorization", data.token, {
          path: "/",
          maxAge: tokenExpiry
        });
        let returnUrl = payload.route || "/my";
        this.$router.push(returnUrl);
        commit("cart/setCart", data.cart, { root: true });
        // Ask for location
        let geoCookie = this.$cookies.get("geo");
        if (!geoCookie) this.$router.push("/change-location");
        else
          await this.$axios.$put("api/users/profile", {
            address: geoCookie
          });
        return data;
      } else {
        throw "Invalid email";
      }
    } catch (err) {
      throw err;
    }
  },
  async signup({ commit }, payload) {
    try {
      let data = await this.$axios.$post("api/users", payload);
      if (data && data.token) {
        this.$axios.setToken(data.token, "Bearer");
        commit("setUser", data.user);
        commit("success", "Verified! Thank You.", { root: true });
        this.$cookies.set("Authorization", data.token, {
          path: "/",
          maxAge: tokenExpiry
        });
        let returnUrl = payload.route || "/my";
        this.$router.push(returnUrl);
        commit("cart/setCart", data.cart, { root: true });
        // Ask for location
        let geoCookie = this.$cookies.get("geo");
        if (!geoCookie) this.$router.push("/change-location");
        else
          await this.$axios.$put("api/users/profile", {
            address: geoCookie
          });
        return data;
      } else {
        throw "Invalid email";
      }
    } catch (err) {
      commit("setErr", err, { root: true });
    }
  },
  async forgotPassword({ commit }, payload) {
    try {
      return await this.$axios.$post("api/users/forgot", payload);
    } catch (err) {
      throw err;
    }
  },
  async changePassword({ commit, rootState }, payload) {
    if (rootState.settings.demo) {
      commit("setErr", "Demo mode: Unable to change password", { root: true });
      return;
    }
    try {
      const data = await this.$axios.$put("api/users/password", payload);
      commit("info", data.message, { root: true });
      this.$router.push("/my");
      return data;
    } catch (err) {
      commit("setErr", err, { root: true });
    }
  },
  async resetPassword({ commit }, payload) {
    try {
      const data = await this.$axios.$post(
        "api/users/reset/" + payload.id,
        payload
      );
      if (data) {
        commit("info", data, { root: true });
        // router.push('/')
      }
      return data;
    } catch (err) {
      commit("setErr", err, { root: true });
    }
  },
  async updateProfile(
    { commit, rootState },
    {
      firstName,
      lastName,
      state,
      city,
      zip,
      phone,
      avatar,
      gender,
      dob,
      language
    }
  ) {
    if (rootState.settings.demo) {
      commit("info", "Demo mode: Unable to update profile info", {
        root: true
      });
      return;
    }
    try {
      const data = await this.$axios.$put("api/users/profile", {
        firstName,
        lastName,
        state,
        city,
        zip,
        phone,
        avatar,
        gender,
        dob,
        language
      });
      if (data) {
        commit("setUser", {
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          dob: data.dob,
          gender: data.gender,
          language: data.language,
          state: data.state,
          city: data.city,
          zip: data.zip,
          phone: data.phone
        });
        commit("info", "Profile updated.", { root: true });
        return data;
      }
    } catch (err) {
      commit("setErr", err, { root: true });
    }
  },
  async logout({ commit }) {
    commit("clearUser"); // Removes user from Store
    this.$cookies.remove("Authorization");
    this.$axios.setToken(null);
    // const data = await this.$axios.post('auth/local/logout')
    // commit('cart/setCart', data, { root: true })
  }
};
