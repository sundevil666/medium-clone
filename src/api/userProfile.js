import axios from '@/api/axios'

const getUser = (slug) => {
  return axios.get(`/profiles/${slug}`).then((res) => res.data.profile)
}

export default {
  getUser,
}
