import axios from "axios";

const state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "",
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, user) {
    state.status = "success";
    state.user = user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.user = null;
  },
};

const actions = {
  async login({ commit }, credentials) {
    commit("auth_request");
    const { data: user } = await axios.get("http://localhost:8001/users", {
      params: {
        login: credentials.username,
        password: credentials.password,
      },
    });
    if (user.length) {
      localStorage.setItem("user", JSON.stringify(user));
      commit("auth_success", user);
    } else {
      commit("auth_error");
      localStorage.removeItem("user");
    }
  },
  async logout({ commit }) {
    commit("logout");
    localStorage.removeItem("user");
  },
};

const getters = {
  isLoggedIn: (state) => !!state.user,
  authStatus: (state) => state.status,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
