const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const mock = require('../test/server')

function resolve (relative) {
  return path.resolve(__dirname, '..', relative)
}

if (!fs.existsSync(resolve('screenshots'))) {
  fs.mkdirSync(resolve('screenshots'))
}

async function gotoPage (url, browser) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto(url)
  return page
}

;(async () => {
  const browser = await puppeteer.launch()
  let page = await browser.newPage()
  page = await gotoPage('http://localhost:3000', browser)
  await page.screenshot({ path: './screenshots/User_Index.png' })

  page = await gotoPage('http://localhost:3000/#/user/closet', browser)
  await page.screenshot({ path: './screenshots/User_Closet.png' })

  page = await gotoPage('http://localhost:3000/#/user/player', browser)
  await page.screenshot({ path: './screenshots/User_Player.png' })

  page = await gotoPage('http://localhost:3000/#/user/profile', browser)
  await page.screenshot({ path: './screenshots/User_Profile.png' })

  browser.close()
  mock.close()
})()
