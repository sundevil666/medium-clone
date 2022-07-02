const state = {
  isSubmitting: false,
  validationErrors: null,
}

const mutations = {
  updateCurrentUserStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  updateCurrentUserSuccess(state) {
    state.isSubmitting = false
  },
  updateCurrentUserFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
