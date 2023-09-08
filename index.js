const { default: puppeteer } = require('puppeteer')
const { load } = require('cheerio')

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

    const $ = load(await page.content())
    // $('div[#_4rR01T]').each((_, el)=>{
    //   console.log($(el).text())
    // })
    $('div._4rR01T').each((_, el) => {
      console.log($(el).text());
    });

    // await page.click('button[type="submit"]','mouse');
    // await page.waitForNavigation();
    // await page.waitForSelector('div._3wU53n');
    // await page.waitForSelector('div._1vC4OE._2rQ-NK');
    // const names = await page.evaluate(() => {
    //     const names = Array.from(document.querySelectorAll('div._3wU53n'));
    //     return names.map(name => name.innerText);
    // });
    // const prices = await page.evaluate(() => {
    //     const prices = Array.from(document.querySelectorAll('div._1vC4OE._2rQ-NK'));
    //     return prices.map(price => price.innerText);
    // });
    // console.log(names);
    // console.log(prices);
    // await browser.close();

}
main();