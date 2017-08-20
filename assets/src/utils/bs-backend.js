import axios from 'axios'

const bsBackend = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/'
})

export default {
  install (Vue) {
    Vue.prototype.$bs = async function (uri, data = undefined) {
      try {
        const response = await (data
          ? bsBackend.post(uri, data)
          : bsBackend.get(uri))
        return response.data
      } catch (e) {
        return -1
      }
    }
  }
}
