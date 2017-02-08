'use strict';

const assert = require('assert');
const {FEED_TYPES, GENRES} = require('./constants');

module.exports = buildUrl;

function buildUrl (country, feedType, limit, genre, format) {
  assert(country, 'country');
  assert(FEED_TYPES[feedType], 'feed type');
  assert(limit <= 200 && limit >= 0, 'limit');
  assert(format === 'json' || format === 'xml', 'format');

  if (genre) {
    assert(GENRES[genre], 'genre');
    return `/${country}/rss/${FEED_TYPES[feedType]}/limit=${+limit}/genre=${GENRES[genre]}/${format}`;
  } else {
    return `/${country}/rss/${FEED_TYPES[feedType]}/limit=${+limit}/${format}`;
  }
}

if (!module.parent) {
  console.log(buildUrl(
    'us',
    'top_free_applications',
    100,
    'Utilities',
    'json'
  ));
}
