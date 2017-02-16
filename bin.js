#!/usr/bin/env node

'use strict';

const co = require('bluebird-co');
const commander = require('commander');
const isoCountry = require('i18n-iso-countries');
const request = require('axios');
const {keys, defaults} = require('lodash');
const {version} = require('./package.json');

const ITunesFeed = require('./index');
const buildUrl = require('./build-url');
const {FEED_TYPES, GENRES, COUNTRIES, CLI_DEFAULTS} =
  require('./constants');

const program = commander
  .version(version)
  .option('-f, --feed [feed]', `Select feed (default: top_free_applications) `)
  .option('-g, --genre [genre]', `Select genre (default: all)`)
  .option('-c, --country [country]', 'Select country (default: US)')
  .option('--format', 'Output format (default: json)')
  .option('-l, --limit [limit]', 'Limit/count (default 100)')
  .option('-F, --list-feeds', 'List feeds')
  .option('-G, --list-genres', 'List genres')
  .option('-C, --list-countries', 'List countries')
  .parse(process.argv);

let listOnly = false;

if (program.listFeeds) {
  listOnly = true;
  console.log(`Feed types:
 - ${keys(FEED_TYPES).join('\n - ')}
`);
}

if (program.listGenres) {
  listOnly = true;
  console.log(`Genres:
 - ${keys(GENRES).join('\n - ')}
`);
}

if (program.listCountries) {
  listOnly = true;
  console.log(`countries:
 - ${keys(COUNTRIES)
    .map(c => `${isoCountry.getName(c, 'en')} - ${c}`)
    .join('\n - ')}
`);
}

if (listOnly) {
  process.exit();
}

program.limit = parseInt(program.limit, 10) || 100;

const opt = defaults({}, program, CLI_DEFAULTS);

co.execute(function * () {
  const url = buildUrl(
    opt.country,
    opt.feed,
    opt.limit,
    opt.genre,
    opt.format
  );

  const feed = new ITunesFeed({
    request: request,
    baseURL: 'https://itunes.apple.com',
    feed: url
  });

  const res = yield feed.read();
  console.log(JSON.stringify(res.data, null, 4));
}).done();
