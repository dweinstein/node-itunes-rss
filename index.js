'use strict';

const {UA, DEFAULT_BASE_URL} = require('./constants');

class ITunesFeed {
  constructor (opts) {
    this.opts = opts;
    this._request = opts.request.create({
      baseURL: opts.baseUrl || DEFAULT_BASE_URL,
      headers: {
        'User-Agent': UA
      }
    });
  }

  read () {
    return this._request.get(this.opts.feed);
  }
}

module.exports = ITunesFeed;

if (!module.parent) {
  const co = require('bluebird-co');
  const buildUrl = require('./build-url');
  co.execute(function * () {
    const request = require('axios');
    const feed = new ITunesFeed({
      request: request,
      baseURL: 'https://itunes.apple.com',
      feed: buildUrl('us', 'top_free_applications', 100, 'Utilities', 'json')
    });

    const res = yield feed.read();
    console.log(JSON.stringify(res.data, null, 4));
  }).done();
}
