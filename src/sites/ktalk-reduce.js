'use strict';

// const { writeFileSync } = require('fs');

module.exports = function createKijijiDataSource(browser) {
  async function fetchAll() {
    const page = await browser.newPage();
    await page.goto('https://www.kenyatalk.com/index.php?all-threads/', { waitUntil: 'domcontentloaded' });
    await page.waitFor(1000);
    await page.waitForSelector('.structItemContainer');

    async function postsUrls() {
      await page.waitForSelector('.structItemContainer');
      await page.waitFor(1000);
      const links = await page.evaluate(() => Array.from(document.querySelectorAll('div.structItem'))
        .map(eventRowEl => ({
          storyLink: eventRowEl.querySelector('div.structItem-title >a')
            .href,
        })));
      console.log(links);
      return links;
    }

    async function storyLinks() {
      await page.waitFor(1000);

      const pagedEls = Array.from(await page.$$('li.pageNav-page >a')).slice(0, 7);
      return pagedEls.reduce((p, btnPage, i) => p.then(async value => {
        if (i > 0) {
          await btnPage.click();
          await page.waitForSelector('.structItemContainer');
          await page.waitFor(1000);
        }

        return value.concat(await postsUrls());
      }), Promise.resolve([]));
    }

    return storyLinks();

    
  }
  return { fetchAll };
};
