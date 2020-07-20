'use strict';

const puppeteer = require('puppeteer');

(async function () {
  // Extract partners on the page, recursively check the next page in the URL pattern
  const fetchAll = async url => {
    const browser = await puppeteer.launch({
      headless: process.env.DEBUG !== 'true',
      timeout: process.env.DEFAULT_TIMEOUT ? parseInt(process.env.DEFAULT_TIMEOUT, 10) : 120000,
      defaultViewport: null,
      args: ['--window-size=1920,1080'],
    });
    // Scrape the data we want
    const page = await browser.newPage();

    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);

    await page.goto(url, {
      waitUntil: 'load',
      // Remove the timeout
      timeout: 0,
    });
    const partnersOnPage = await page.evaluate(() => Array.from(document.querySelectorAll('div.structItem'))
      .map(eventRowEl => ({
        titleLink: eventRowEl.querySelector('div.structItem-title >a')
          .href,
      })));

    await page.close();

    // Recursively scrape the next page
    if (partnersOnPage.length < 1) {
      // Terminate if no partners exist
      return partnersOnPage;
    }
    // Go fetch the next page ?page=X+1
    const nextPageNumber = parseInt(url.match(/page-(\d+)$/)[1], 5) + 1;
    const nextUrl = `https://www.kenyatalk.com/index.php?all-threads/4639660/page-${nextPageNumber}`;

    return partnersOnPage.concat(await fetchAll(nextUrl));
  };

  const browser = await puppeteer.launch({ headless: false });
  const firstUrl = 'https://www.kenyatalk.com/index.php?all-threads/4639660/page-0';
  const partners = await fetchAll(firstUrl);

  // Todo: Update database with partners
  console.log(partners);

  await browser.close();
}());
