const state = {
  isSubmitting: false,
};

const actions = {
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  },
};

export default {
  state,
  mutations,
  actions,
};
