'use strict';

// const { writeFileSync } = require('fs');

module.exports = function createKijijiDataSource(browser) {
  async function fetchAll() {
    const page = await browser.newPage();
    await page.goto('https://www.kenyatalk.com/index.php?all-threads/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.structItemContainer');
    async function postsUrls() {
      const links = await page.evaluate(() => Array.from(document.querySelectorAll('div.structItem'))
        .map(eventRowEl => ({
          storyLink: eventRowEl.querySelector('div.structItem-title >a')
            .href,
        })));
      return links;
    }
    // my functions
    async function getContent(pageLinks = []) {
      const content = await postsUrls();
      const nextButton = await page.$('.block-outer .pageNav-jump--next');
      if (!nextButton) return pageLinks.concat(content);
      await nextButton.click();
      await page.waitForSelector('.structItemContainer');
      return getContent(pageLinks.concat(content));
    }
    const allLinks = await getContent();
    // console.log(allLinks);
    // await page.screenshot({path: 'sample.png'})
    // scrape links
    return allLinks.reduce((previous, current, i) => {
      if (i > 0) {
        return console.log(i);
      }

      return previous;
    });
  }
  return { fetchAll };
};
