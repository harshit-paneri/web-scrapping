const { default: puppeteer } = require('puppeteer')
const { load } = require('cheerio')
const fs = require('fs');
const {parse} = require('json2csv')

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 1280,
        height: 720
    }
  });

    const page = await browser.newPage();
    await page.goto('https://flipkart.com/');
    // await page.type('button[id="pushDenied"]');
    // click pop decined

    await page.click('._2KpZ6l._2doB4z');
    // const searchResultSelector = '_2KpZ6l _2doB4z';
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);
    // console.log('searchResultSelector');

    await page.type('input[type="text"]', 'iphone')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(5000)
    const data = [];
    const $ = load(await page.content())

    $('._1fQZEK').each((index, element) => {
      const name = $('div._4rR01T', element).text();
      const price = $('div._30jeq3._1_WHN1', element).text()
      const image = $(element).find('img').attr('src');
      const desc = $('li.rgWa7D', element).text()
      // console.log({name, price, image, desc});
      data.push({ name, price, image, desc });
    })

    await browser.close();
    fs.writeFileSync('output.csv', parse(data));
}
main();