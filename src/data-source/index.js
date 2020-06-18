'use strict';

const createKijijiDataSource = require('./kenyatalk');

module.exports = function createDataSource(...args) {
  return {
    hekaya: createKijijiDataSource(...args),
  };
};
