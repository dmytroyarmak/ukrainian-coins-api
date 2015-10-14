var selectors = require('./selectors');
var constants = require('./constants');

var COIN_ID_REG_EXP = /coin_id=(\d+)$/;
var THEME_ID_REG_EXP = /theme_id=(\d+)$/;

function parseСategories ($) {
  return $(selectors.categories.CATEGORIES_OPTION).map(function() {
    var $option = $(this);

    return {
      id: parseСategoriesId($option),
      name: parseСategoriesName($option)
    };
  }).filter(function() {
    return this.id > 0;
  }).get();
}

function parseList ($) {
  return $(selectors.list.COIN_TR).map(function() {
    var $tr = $(this);

    return {
      id: parseListId($tr),
      name: parseListName($tr),
      metal: parseListMetal($tr),
      denomination: parseListDenomination($tr),
      date: parseListDate($tr)
    };
  }).get();
}

function parseDetails ($) {
  return {
    id: parseDetailsId($),
    name: parseDetailsName($),
    metal: parseDetailsMetal($),
    denomination: parseDetailsDenomination($),
    date: parseDetailsDate($),
    weight: parseDetailsWeight($),
    diameter: parseDetailsDiameter($),
    thickness: parseDetailsThickness($),
    quality: parseDetailsQuality($),
    edge: parseDetailsEdge($),
    mintage: parseDetailsMintage($),
    categoryId: parseDetailsCategoryId($),
    category: parseDetailsCategory($),
    generalDescription: parseDetailsGeneralDescription($),
    averseDescription: parseDetailsAverseDescription($),
    reverseDescription: parseDetailsReverseDescription($),
    averseImgUrl: parseDetailsAverseImgUrl($),
    reverseImgUrl: parseDetailsReverseImgUrl($)
  };
}

function parseСategoriesId ($option) {
  return parseInt($option.attr('value'), 10);
}

function parseСategoriesName ($option) {
  return $option.text();
}

function parseListId ($tr) {
  return getCoinIdFromA($tr.find(selectors.list.NAME_A));
}

function parseListName ($tr) {
  return trim($tr.find(selectors.list.NAME_A).text());
}

function parseListMetal ($tr) {
  return trim($tr.find(selectors.list.METAL_TD).text());
}

function parseListDenomination ($tr) {
  return trim($tr.find(selectors.list.DENOMINATION_TD).text());
}

function parseListDate ($tr) {
  return trim($tr.find(selectors.list.DATE_TD).text());
}


function parseDetailsId ($) {
  return getCoinIdFromA($(selectors.details.PRINT_A));
}

function parseDetailsName ($) {
  return trim($(selectors.details.NAME_DIV).text());
}

function parseDetailsMetal ($) {
  return trim($(selectors.details.METAL_A).text());
}

function parseDetailsDenomination ($) {
  var denomination  = parseInt($(selectors.details.DENOMINATION_A).text(), 10);
  var currency = (denomination >= 200000 ? 'karbovanets' : 'hryvnias');
  return denomination + ' ' + currency;
}

function parseDetailsWeight ($) {
  return parseFloat($(selectors.details.WEIGHT_TD).text());
}

function parseDetailsDate ($) {
  return getDateFromDateTd($(selectors.details.DATE_TD));
}

function parseDetailsDiameter ($) {
  return parseFloat($(selectors.details.DIAMETER_A).text());
}

function parseDetailsThickness ($) {
  return hasThickness($) ? parseFloat($(selectors.details.THICKNESS_TD).text()) : null;
}

function parseDetailsQuality ($) {
  return trim($(selectors.details[hasThickness($) ? 'QUALITY_A_WITH_THICKNESS' : 'QUALITY_A']).text());
}

function parseDetailsEdge ($) {
  return trim($(selectors.details[hasThickness($) ? 'EDGE_A_WITH_THICKNESS' : 'EDGE_A']).text());
}

function parseDetailsMintage ($) {
  return parseFloat($(selectors.details[hasThickness($) ? 'MINTAGE_TD_WITH_THICKNESS' : 'MINTAGE_TD']).text());
}

function parseDetailsCategoryId ($) {
  return getThemeIdFromA($(selectors.details.CATEGORY_A));
}

function parseDetailsCategory ($) {
  return trim($(selectors.details.CATEGORY_A).text());
}

function parseDetailsGeneralDescription ($) {
  return trim($(selectors.details.GENERAL_DESCRIPTION_TD).text());
}

function parseDetailsAverseDescription ($) {
  return trim($(selectors.details.AVERSE_DESCRIPTION_TD).text());
}

function parseDetailsReverseDescription ($) {
  return trim($(selectors.details.REVERSE_DESCRIPTION_TD).text());
}

function parseDetailsAverseImgUrl ($) {
  var id = parseDetailsId($);
  return getAverseImgUrl(id);
}

function parseDetailsReverseImgUrl ($) {
  var id = parseDetailsId($);
  return getReverseImgUrl(id);
}

function getCoinIdFromA (a) {
  return parseInt(a.attr('href').match(COIN_ID_REG_EXP)[1], 10);
}

function getThemeIdFromA (a) {
  return parseInt(a.attr('href').match(THEME_ID_REG_EXP)[1], 10);
}

function getDateFromDateTd (dateTd) {
  return trim(dateTd.text()).replace('Putting into circulation : ', '');
}

function trim (str) {
  return str.replace(/\s+/mg, ' ').replace(/^\s+/, '').replace(/\s+$/, '');
}

function getAverseImgUrl (id) {
  return constants.urls.AVERSE_IMG_URL + id;
}

function getReverseImgUrl (id) {
  return constants.urls.REVERSE_IMG_URL + id;
}

function hasThickness ($) {
  return $(selectors.details.TECH_TD).length === 8;
}

module.exports = {
  parseСategories: parseСategories,
  parseList: parseList,
  parseDetails: parseDetails
};
