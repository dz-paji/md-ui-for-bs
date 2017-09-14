const mapping = {
  '皮肤工具': {
    title: 'plugins.skinUtilities.menu',
    icon: 'card_travel',
    link: '/user/skin-utilities'
  },
  '我的举报': {
    title: 'plugins.reportTexture.userSide',
    icon: 'feedback',
    link: '/user/report'
  },
  'Blessing\\ConfigGenerator::config.generate-config': {
    title: 'plugins.configGenerator.title',
    icon: 'tune',
    link: '/user/config'
  },
  '文件缓存': {
    title: 'plugins.profileCache.title',
    icon: 'cached'
  },
  '举报管理': {
    title: 'plugins.reportTexture.adminSide',
    icon: 'feedback'
  },
  '批量导入': {
    title: 'plugins.batchImport.title',
    icon: 'subject'
  },
  'GPlane\\PluginsMarket::general.name': {
    title: 'plugins.pluginsMarket.title',
    icon: 'shop'
  },
  '导入数据': {
    title: 'plugins.importData.name',
    icon: 'work',
    link: externalLink('/setup/migrations')
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
