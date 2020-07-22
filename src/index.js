'use strict';

const puppeteer = require('puppeteer');
const createDatasource = require('./data-source');

module.exports = async function scrapeKijiji() {
  const browser = await pupeteer.launch({
    headless: 'false',
    timeout: process.env.DEFAULT_TIMEOUT ? parseInt(process.env.DEFAULT_TIMEOUT, 10) : 120000,
    defaultViewport: null,
    args: ['--window-size=1920,1080'],
  });
  const dataSource = createDatasource(browser);
  return Promise.all(
    Object.values(dataSource).map(({ fetchAll }) => fetchAll()),
  );
};
