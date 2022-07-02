import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

const mutations = {
  getUserProfileStart(state) {
    state.isLoading = true
    state.data = null
  },
  getUserProfileSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },
  getUserProfileFailure(state) {
    state.isLoading = false
  },
}

const actions = {
  getUserProfile(context, { slug }) {
    return new Promise((resolve) => {
      context.commit('getUserProfileStart')

      userProfileApi
        .getUser(slug)
        .then((userProfile) => {
          context.commit('getUserProfileSuccess', userProfile)
          resolve(userProfile)
        })
        .catch((err) => {
          console.log(err)
          context.commit('getUserProfileFailure')
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
