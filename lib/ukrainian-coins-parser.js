var COIN_ID_REG_EXP = /coin_id=(\d+)$/;

function parseСategories ($) {
  return $('select[name="theme_id"] > option').map(function() {
    var $option = $(this);
    return {
      id: parseInt($option.attr('value'), 10),
      name: $option.text()
    };
  }).filter(function() {
    return this.id > 0;
  }).get();
}

function parseList ($) {
  return $('#coins_table > tbody > tr').map(function() {
    var $tr = $(this);
    var $nameLink = $tr.find('td:first-child > a');
    var $metalTd = $tr.find('td:nth-child(2)');
    var $denominationTd = $tr.find('td:nth-child(3)');
    var $dateTd = $tr.find('td:nth-child(5)');
    return {
      id: parseInt($nameLink.attr('href').match(COIN_ID_REG_EXP)[1], 10),
      name: $nameLink[0].innerText,
      metal: $metalTd[0].innerText,
      denomination: $denominationTd[0].innerText,
      date: $dateTd[0].innerText
    };
  }).get();
}

module.exports = {
  parseСategories: parseСategories,
  parseList: parseList
};
