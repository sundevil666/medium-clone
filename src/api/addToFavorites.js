import axios from '@/api/axios'

const getUrl = (slug) => `/articles/${slug}/favorite`

const addToFavorite = (slug) => {
  const url = getUrl(slug)
  return axios.post(url).then((res) => res.data.article)
}

const removeFromFavorite = (slug) => {
  const url = getUrl(slug)
  return axios.delete(url).then((res) => res.data.article)
}

export default {
  addToFavorite,
  removeFromFavorite,
}
