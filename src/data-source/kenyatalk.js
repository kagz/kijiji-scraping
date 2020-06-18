'use strict';

const { writeFileSync } = require('fs');

module.exports = function createKijijiDataSource(browser) {
  async function fetchAll() {
    const page = await browser.newPage();
    await page.goto('https://www.kenyatalk.com/index.php?all-threads/', { waitUntil: 'domcontentloaded' });
    await page.waitFor(2000);
    await page.waitForSelector('.structItemContainer');
    // eslint-disable-next-line no-undef
    const hekaya = await page.evaluate(() => Array.from(document.querySelectorAll('div.structItem'))
      .map(eventRowEl => ({
        titleName: eventRowEl.querySelector('div.structItem-title >a')
          .textContent,
        talkerName: eventRowEl
          .querySelector('div.structItem-cell.structItem-cell--main > div.structItem-minor > ul > li:nth-child(1) >a')
          .textContent,

        categoryName: eventRowEl
          .querySelector('div.structItem-cell.structItem-cell--main > div.structItem-minor > ul > li:nth-child(3) >a')
          .textContent,
      })));

    console.log('ALL HEKAYAS HERE', hekaya);
    writeFileSync('./src/data/hekaya.json', JSON.stringify(hekaya));

    return hekaya;
  }
  return { fetchAll };
};
