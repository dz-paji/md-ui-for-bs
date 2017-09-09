import axios from 'axios'
import { Toast } from 'quasar-framework'

const bsBackend = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/'
})

export default {
  install (Vue) {
    Vue.prototype.$bs = async function (
      uri,
      data = undefined,
      options = {}
    ) {
      const { success, error, useToast = true } = options
      try {
        const response = await (data
          ? bsBackend.post(uri, data)
          : bsBackend.get(uri))
        const { data: resData } = response

        const { errno, msg } = resData
        if (errno === undefined || msg === undefined) {
          return resData
        }
        if (errno === 0) {
          useToast && Toast.create.positive(msg)
          success && success(resData)
        } else {
          useToast && Toast.create.warning(msg)
          error && error(resData)
        }
        return resData
      } catch (e) {
        return -1
      }
    }

    Vue.prototype.$bsLink = function (uri) {
      return (process.env.NODE_ENV === 'development' ? '/api' : '/') + uri
    }
  }
}
