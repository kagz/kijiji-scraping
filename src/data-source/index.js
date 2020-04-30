'use strict';
const createKijijiDataSource =require('./kijiji');

module.exports= function createDataSource(...args){
    return {
        hekaya:createKijijiDataSource(...args),
    }
}
