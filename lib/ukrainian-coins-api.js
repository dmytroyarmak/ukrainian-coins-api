var fetch = require('node-fetch');
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

function getPage (url) {
  return fetch(constants.urls.SEARCH_URL).then(function(resp) {
    return cheerio.load(resp.text());
  });
}

module.exports = {
  getСategories: getСategories,
  getList: getList
};
