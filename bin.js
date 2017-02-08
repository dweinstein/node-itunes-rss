#!/usr/bin/env node

'use strict';

// const bunyan = require('bunyan');
const co = require('bluebird-co');
const countries = require('i18n-iso-countries');
const commander = require('commander');
const {keys} = require('lodash');
const {version} = require('./package.json');

const ITunesFeed = require('./index');
const buildUrl = require('./build-url');
const constants = require('./constants');

const program = commander
  .version(version)
  .option('-f, --feed [feed]', `Select feed (default: top_free_applications) `)
  .option('-g, --genre [genre]', `Select genre (default: all)`)
  .option('-c, --country [country]', 'Select country (default: US)')
  .option('--format', 'Output format (default: json)')
  .option('-l, --limit', 'Limit/count (default 100)')
  .option('-F, --list-feeds', 'List feeds')
  .option('-G, --list-genres', 'List genres')
  .option('-C, --list-countries', 'List countries')
  .parse(process.argv);

let listOnly = false;

if (program.listFeeds) {
  listOnly = true;
  console.log(`Feed types:
 - ${keys(constants.FEED_TYPES).join('\n - ')}
`);
}

if (program.listGenres) {
  listOnly = true;
  console.log(`Genres:
 - ${keys(constants.GENRES).join('\n - ')}
`);
}

if (program.listCountries) {
  listOnly = true;
  console.log(`countries:
 - ${keys(constants.COUNTRIES)
    .map(c => `${countries.getName(c, 'en')} - ${c}`)
    .join('\n - ')}
`);
}

if (listOnly) {
  process.exit();
}

program.country = program.country || 'US';
program.limit = program.limit || 100;
program.feed = program.feed || 'top_free_applications';
program.genre = program.genre || null;
program.format = program.format || 'json';

// const logger = bunyan.createLogger({
//   name: 'itunes-feeds',
//   level: 'debug',
//   stream: process.stderr,
//   serializers: bunyan.stdSerializers
// });

// logger.info('initialized');

co.execute(function * () {
  const request = require('axios');

  const url = buildUrl(
    program.country,
    program.feed,
    program.limit,
    program.genre,
    program.format
  );

  const feed = new ITunesFeed({
    request: request,
    baseURL: 'https://itunes.apple.com',
    feed: url
  });

  // logger.debug('reading feed');
  const res = yield feed.read();
  // logger.debug('feed done reading');
  console.log(JSON.stringify(res.data, null, 4));
}).done();
