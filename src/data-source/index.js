'use strict';

const createKijijiDataSource = require('../sites/kenyatalk');

module.exports = function createDataSource(...args) {
  return {
    hekaya: createKijijiDataSource(...args),
  };
};
