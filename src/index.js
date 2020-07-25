'use strict';

const puppeteer = require('puppeteer');
const createDatasource = require('./data-source');

module.exports = async function scrapeKijiji() {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0,
    defaultViewport: null,

    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
    ],
  });
  const dataSource = createDatasource(browser);
  return Promise.all(
    Object.values(dataSource).map(({ fetchAll }) => fetchAll()),
  );
};
