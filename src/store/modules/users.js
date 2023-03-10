import axios from "axios";

export const statuses = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  LOAD_USERS: "LOAD_USERS",
  LOAD_USERS_START: "LOAD_USERS_START",
  LOAD_USERS_SUCCESS: "LOAD_USERS_SUCCESS",
  LOAD_USERS_ERROR: "LOAD_USERS_ERROR",
  ADD_USER: "ADD_USER",
  UPDATE_USER: "UPDATE_USER",
};

const state = {
  status: statuses.IDLE,
  data: [],
  error: null,
};

const mutations = {
  [statuses.LOAD_USERS_START](state) {
    state.status = statuses.PENDING;
    state.data = [];
    state.error = null;
  },

  [statuses.LOAD_USERS_SUCCESS](state, users) {
    state.status = statuses.SUCCESS;
    state.data = users;
  },

  [statuses.LOAD_USERS_ERROR](state, error) {
    state.status = statuses.ERROR;
    state.error = error;
  },
};

const actions = {
  async [statuses.LOAD_USERS]({ commit }) {
    commit(statuses.LOAD_USERS_START);

    try {
      const { data } = await axios.get("http://localhost:8001/users");
      commit(statuses.LOAD_USERS_SUCCESS, data);
    } catch (error) {
      commit(statuses.LOAD_USERS_ERROR, error);
    }
  },

  async [statuses.ADD_USER]({ commit, dispatch }, user) {
    try {
      await axios.post("http://localhost:8001/users", {
        ...user,
        picture: `https://picsum.photos/seed/${crypto.randomUUID()}/300`,
      });
      dispatch(statuses.LOAD_USERS);
    } catch (error) {
      commit(statuses.LOAD_USERS_ERROR, error);
    }
  },

  async removeUser({ commit, dispatch }, id) {
    try {
      await axios.delete(`http://localhost:8001/users/${id}`);
      dispatch(statuses.LOAD_USERS);
    } catch (error) {
      commit(statuses.LOAD_USERS_ERROR, error);
    }
  },

  async updateUser({ commit, dispatch }, user) {
    try {
      await axios.patch(`http://localhost:8001/users/${user.id}`, user);
      dispatch(statuses.LOAD_USERS);
    } catch (error) {
      commit(statuses.LOAD_USERS_ERROR, error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
