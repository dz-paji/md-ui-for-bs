const puppeteer = require('puppeteer')
const mock = require('../test/server')

mock.start({
  '/md/info/site': {
    locale: 'en'
  }
})

async function gotoPage (url, browser) {
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url)
    return page
  } catch (e) {
    console.log(e)
  }
}

;(async () => {
  const browser = await puppeteer.launch()
  let page = await gotoPage('http://localhost:3000', browser)
  await page.screenshot({ path: './screenshots/User_Index.png' })
  await page.close()

  page = await gotoPage('http://localhost:3000/#/user/closet', browser)
  await page.screenshot({ path: './screenshots/User_Closet.png' })
  await page.close()

  page = await gotoPage('http://localhost:3000/#/user/player', browser)
  await page.screenshot({ path: './screenshots/User_Player.png' })
  await page.close()

  page = await gotoPage('http://localhost:3000/#/user/profile', browser)
  await page.screenshot({ path: './screenshots/User_Profile.png' })
  await page.close()

  browser.close()
  mock.close()
})()
