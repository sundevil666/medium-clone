import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

const mutations = {
  getArticleStart(state) {
    state.isLoading = true
    state.data = null
  },
  getArticleSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },
  getArticleFailure(state) {
    state.isLoading = false
  },
  deleteArticleStart() {},
  deleteArticleSuccess() {},
  deleteArticleFailure() {},
}

const actions = {
  getArticle(context, { slug }) {
    return new Promise((resolve) => {
      context.commit('getArticleStart', slug)

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
  deleteArticle(context, { slug }) {
    return new Promise((resolve) => {
      context.commit('deleteArticleStart', slug)

      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit('deleteArticleSuccess')
          resolve()
        })
        .catch((err) => {
          console.log(err)
          context.commit('deleteArticleFailure')
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
