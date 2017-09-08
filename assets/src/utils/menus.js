const mapping = {
  '皮肤工具': {
    title: 'plugins.skinUtilities.menu',
    icon: 'card_travel',
    link: '/user/skin-utilities'
  },
  '我的举报': {
    title: 'plugins.reportTexture.userMenu',
    icon: 'add_alert',
    link: externalLink('/user/report')
  },
  'Blessing\\ConfigGenerator::config.generate-config': {
    title: 'plugins.configGenerator.menu',
    icon: 'tune',
    link: externalLink('/user/config')
  }
}

function externalLink (link) {
  return `/go?dst=${encodeURI(link)}`
}

export default ({ title, link }) => {
  return title in mapping
    ? mapping[title]
    : {
      title,
      icon: 'polymer',
      link: externalLink(link)
    }
}
