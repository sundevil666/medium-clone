import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
}

const mutations = {
  createArticleStart(state) {
    state.isSubmitting = true
  },
  createArticleSuccess(state) {
    state.isSubmitting = true
  },
  createArticleFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  createArticle(context, { articleInput }) {
    return new Promise((resolve) => {
      context.commit('createArticleStart')

      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit('createArticleSuccess', article)
          resolve(article)
        })
        .catch((res) => {
          console.log(res)
          context.commit('createArticleFailure', res.response.data.errors)
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
