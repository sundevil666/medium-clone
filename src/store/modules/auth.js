import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  isLoading: false,
}

const getters = {
  currentUser: (state) => {
    return state.currentUser
  },
  isLoggedIn: (state) => {
    return Boolean(state.isLoggedIn)
  },
  isAnonymous: (state) => {
    return state.isLoggedIn === false
  },
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  loginStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  loginSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  loginFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  getCurrentUserStart(state) {
    state.isLoading = true
  },
  getCurrentUserSuccess(state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  getCurrentUserFailure(state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },

  updateCurrentUserStart() {},
  updateCurrentUserSuccess(state, payload) {
    state.currentUser = payload
  },
  updateCurrentUserFailure() {},
  logout(state) {
    state.currentUser = null
    state.isLoggedIn = false
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then((res) => {
          const data = res.data.user
          context.commit('registerSuccess', data)
          setItem('accessToken', data.token)
          resolve(data)
        })
        .catch((err) => {
          const data = err.response.data.errors
          context.commit('registerFailure', data)
          console.log('err', err)
          reject(data)
        })
    })
  },
  login(context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit('loginStart')
      authApi
        .login(credentials)
        .then((res) => {
          const data = res.data.user
          context.commit('loginSuccess', data)
          setItem('accessToken', data.token)
          resolve(data)
        })
        .catch((err) => {
          const data = err.response.data.errors
          context.commit('loginFailure', data)
          console.log('err', err)
          reject(data)
        })
    })
  },
  getCurrentUser(context) {
    return new Promise((resolve) => {
      context.commit('getCurrentUserStart')

      authApi
        .getCurrentUser()
        .then((res) => {
          const data = res.data.user
          context.commit('getCurrentUserSuccess', data)
          resolve(data)
        })
        .catch((err) => {
          console.log(err)
          context.commit('getCurrentUserFailure')
        })
    })
  },
  updateCurrentUser(context, { currentUserInput }) {
    return new Promise((resolve) => {
      context.commit('updateCurrentUserStart')

      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit('updateCurrentUserSuccess', user)
          resolve(user)
        })
        .catch((res) => {
          context.commit('updateCurrentUserFailure', res.response.data.errors)
        })
    })
  },
  logout(context) {
    return new Promise((resolve) => {
      setItem('accessToken', '')
      context.commit('logout')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
