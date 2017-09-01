const expect = require('chai').expect
const mock = require('./server')
const puppeteer = require('puppeteer')

let browser
let page
let unmock

before(async () => {
  browser = await puppeteer.launch()
})

after(async () => {
  await browser.close()
})

describe('User > Left-side drawer', function () {
  this.timeout(0)

  beforeEach(async () => {
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
    await unmock()
  })

  it('should show avatar and role', async () => {
    unmock = mock()
    await page.goto('http://localhost:3000')

    const avatarSrc = await page.evaluate(() => {
      return document.querySelector('.user-view > img').getAttribute('src')
    })
    expect(avatarSrc).to.equal('/img/avatar.png')

    const nickname = await page.evaluate(() => {
      return document.querySelectorAll('.user-view > span')[0].textContent
    })
    expect(nickname).to.equal('gplane')

    let role = await page.evaluate(() => {
      return document.querySelectorAll('.user-view > span')[1].textContent
    })
    expect(role).to.equal('Admin')
  })
})

describe('User > Index', function () {
  this.timeout(0)

  before(async () => {
    unmock = mock()
    page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3000')
  })

  after(() => {
    page.close()
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
