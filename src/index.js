'use strict';

const puppeteer = require('puppeteer');
const createDatasource = require('./data-source');

module.exports = async function scrapeKijiji() {
  const browser = await puppeteer.launch({ headless: true });
  const dataSource = createDatasource(browser);
  return Promise.all(
    Object.values(dataSource).map(({ fetchAll }) => fetchAll()),
  );
};
