import addToFavoriteApi from '@/api/addToFavorites'

const mutations = {
  addToFavoritesStart() {},
  addToFavoritesSuccess() {},
  addToFavoritesFailure() {},
}

const actions = {
  addToFavorites(context, { slug, isFavorited }) {
    return new Promise((resolve) => {
      context.commit('addToFavoritesStart')

      const promise = isFavorited
        ? addToFavoriteApi.removeFromFavorite(slug)
        : addToFavoriteApi.addToFavorite(slug)

      promise
        .then((article) => {
          context.commit('addToFavoritesSuccess', article)
          resolve(article)
        })
        .catch(() => {
          context.commit('addToFavoritesFailure')
        })
    })
  },
}

export default {
  namespaced: true,
  mutations,
  actions,
}
