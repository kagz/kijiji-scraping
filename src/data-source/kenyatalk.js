'use strict';

// const { writeFileSync } = require('fs');

module.exports = function createKijijiDataSource(browser) {
  async function fetchAll() {
    const page = await browser.newPage();
    await page.goto('https://www.kenyatalk.com/index.php?all-threads/', { waitUntil: 'domcontentloaded' });
    await page.waitFor(12000);
    await page.waitForSelector('.structItemContainer');
    // eslint-disable-next-line no-undef
    async function storyLinks() {
      //
      await page.waitFor(1000);
      // this is a paginating button that should be clicked through for scraping
      const allBtns = await page.waitForSelector('li.pageNav-page--skipEnd >a'); //document.querySelector('span.inputGroup-text');
      // const nextBtn = 'li.pageNav-page >a';


      if (allBtns) await allBtns.click();
      console.log('DONE CLICK', allBtns);

      await page.waitFor(10000);

      const pagedEls = Array.from(await page.$$('li.pageNav-page >a'));
      console.log('NOW SEE THE BUTTONS LIST', pagedEls);
      const hekayas = await page.evaluate(() => Array.from(document.querySelectorAll('div.structItem'))
        .map(eventRowEl => ({
          storyLink: eventRowEl.querySelector('div.structItem-title >a')
            .href,
        })));
      // console.log(hekayas);
      return hekayas;
    }

    // const shots = await page.screenshot({ path: 'kijiji.png' });
    return storyLinks();
  }


  // functions


  return { fetchAll };
};
