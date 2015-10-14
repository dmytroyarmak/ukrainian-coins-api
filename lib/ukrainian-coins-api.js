var fetch = require('node-fetch');
var cheerio = require('cheerio');
var constants = require('./constants');

function getСategories () {
  return fetch(constants.urls.SEARCH_URL)
    .then(function(resp) {
      return cheerio.load(resp.text());
    })
    .then(function($) {
      return $('select[name="theme_id"] > option').map(function() {
        var $this = $(this);
        return {
          id: parseInt($this.attr('value'), 10),
          name: $this.text()
        };
      }).filter(function() {
        return this.id > 0;
      }).get();
    });
}

module.exports = {
  getСategories: getСategories
};
