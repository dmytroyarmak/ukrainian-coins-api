var request = require('request');
var cheerio = require('cheerio');
var constants = require('./constants');
var ukrainianCoinsParser = require('./ukrainian-coins-parser');

var COIN_ID_REG_EXP = /coin_id=(\d+)$/;

function getСategories () {
  return getPage(constants.urls.SEARCH_URL)
    .then(ukrainianCoinsParser.parseСategories);
}

function getList () {
  return getPage(constants.urls.LIST_URL)
    .then(ukrainianCoinsParser.parseList);
}

function getDetails (id) {
  return getPage(constants.urls.DETAILS_URL + id)
    .then(ukrainianCoinsParser.parseDetails);
}

function getListWithDetails () {
  return getList().then(function(coins) {
    return coins.slice(0, 2).reduce(function(result, coin) {
      return Promise.all([result, getDetails(coin.id)]).then(function(resultAndCurrentItem) {
        return resultAndCurrentItem[0].concat(resultAndCurrentItem[1]);
      });
    }, Promise.resolve([]));
  });
}

function getPage (url) {
  return new Promise(function(resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(cheerio.load(body));
        } else {
          reject();
        }
      });
  });
}

module.exports = {
  getСategories: getСategories,
  getList: getList,
  getDetails: getDetails,
  getListWithDetails: getListWithDetails
};
