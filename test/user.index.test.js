const expect = require('chai').expect
const mock = require('./server')
const puppeteer = require('puppeteer')

let browser
let page
let unmock

describe('User > Index', function () {
  this.timeout(0)

  before(async () => {
    unmock = mock()
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3000')
  })

  after(() => {
    browser.close()
    unmock()
  })

  it('should display announcement', async () => {
    const announcement = await page.evaluate(() => {
      return document.querySelector(
        '#q-app > div > div.layout-content > div.layout-view > div >' +
        'div.auto > div > div.card-content > div'
      ).innerHTML
    })
    expect(announcement).to.equal('<p><s>Just for test!</s></p>\n')
  })
})
