import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
}

const mutations = {
  updateArticleStart(state) {
    state.isSubmitting = true
  },
  updateArticleSuccess(state) {
    state.isSubmitting = true
  },
  updateArticleFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  getArticleStart(state) {
    state.isLoading = true
  },
  getArticleSuccess(state, payload) {
    state.isLoading = false
    state.article = payload
  },
  getArticleFailure(state) {
    state.isLoading = false
  },
}

const actions = {
  updateArticle(context, { slug, articleInput }) {
    return new Promise((resolve) => {
      context.commit('updateArticleStart')

      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit('updateArticleSuccess', article)
          resolve(article)
        })
        .catch((res) => {
          console.log(res)
          context.commit('updateArticleFailure', res.response.data.errors)
        })
    })
  },
  getArticle(context, { slug }) {
    return new Promise((resolve) => {
      context.commit('getArticleStart')

      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit('getArticleSuccess', article)
          resolve(article)
        })
        .catch((err) => {
          console.log(err)
          context.commit('getArticleFailure')
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
