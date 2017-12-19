/* eslint-disable camelcase */
import en from '../../../lang/en.json'
import zh_CN from '../../../lang/zh_cn.json'

const lang = { en, zh_CN }

function $trans (key, placeholder = {}, escape = true) {
  // eslint-disable-next-line no-invalid-this
  const current = this.$store.state.site.locale

  const keys = key.split('.')
  let temp = lang[current]
  let text

  for (const eachKey of keys) {
    temp = temp[eachKey]
    if (!temp) {
      return key
    } else if (typeof temp === 'string') {
      text = temp
      break
    }
  }

  for (const index in placeholder) {
    if (!placeholder.hasOwnProperty(index)) {
      continue
    }

    const data = placeholder[index]

    if (text.indexOf(`:${index.toUpperCase()}`) >= 0) {
      if (/^[A-Z]+$/.test(index)) {
        text = text.replace(`:${index}`, data.toUpperCase())
      } else {
        text = text.replace(`:${index.toUpperCase()}`, data)
      }
    } else {
      text = text.replace(`:${index}`, data)
    }
  }

  if (escape) {
    // Reference: lodash
    // @see https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L14229
    const htmlEscapes = {
      '&': '&amp',
      '<': '&lt',
      '>': '&gt',
      '"': '&quot',
      '\'': '&#39'
    }
    const reUnescapedHtml = /[&<>"']/g,
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
    return reHasUnescapedHtml.test(text)
      ? text.replace(
        reUnescapedHtml,
        unescapedChar => htmlEscapes[unescapedChar]
      )
      : text
  }
  return text
}

export default {
  install (Vue) {
    Vue.prototype.$trans = $trans
  }
}
