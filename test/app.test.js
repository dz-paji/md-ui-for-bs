const expect = require('chai').expect
const mock = require('./server')
const puppeteer = require('puppeteer')

let browser
let page
let unmock

describe('App Appearance', function () {
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

  it('should display site name', async () => {
    const siteName = await page.evaluate(() => {
      return document.querySelector('.toolbar-title > div').textContent.trim()
    })
    expect(siteName).to.equal('Blessing Skin Server')
  })

  it('should display footer text', async () => {
    const texts = await page.evaluate(() => {
      return Array.prototype.map.call(
        document.querySelectorAll('.footer-text-bar > span'),
        el => el.textContent
      )
    })
    expect(texts).to.eql([
      'Material Design Test',
      'Powered by Blessing Skin Server'
    ])
  })

  it('should pop a language switch menu', async () => {
    await (await page.$('.toolbar > .q-picker-textfield')).click()
    const locales = await page.evaluate(() => {
      return [1, 2].map(i => document.querySelector(
        `.q-select-popover > div > div:nth-child(${i}) > div > div`
      ).textContent)
    })
    expect(locales).to.eql(['中文（简体）', 'English'])

    await (await page.$('.toolbar > .q-picker-textfield')).click()
  })

  it('should switch language correctly', async () => {
    const getText = () => {
      return document.querySelector(
        '#q-app > div > div.layout-content > div.layout-view > div >' +
        'div.auto > div > div.card-title'
      ).textContent.trim()
    }
    const currentText = await page.evaluate(getText)
    expect(currentText).to.equal('Announcement')

    await (await page.$('.toolbar > .q-picker-textfield')).click()
    await (await page.$('.q-select-popover > div > div:nth-child(1)')).click()

    const newText = await page.evaluate(getText)
    expect(newText).to.equal('公告')
  })
})
