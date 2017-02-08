'use strict';

const codes = require('./codes.json');
const {chain} = require('lodash');

module.exports = {
  DEFAULT_BASE_URL: 'https://itunes.apple.com',
  FEED_TYPES: {
    new_applications: 'newapplications',
    new_free_applications: 'newfreeapplications',
    new_paid_applications: 'newpaidapplications',
    top_free_applications: 'topfreeapplications',
    top_free_ipad_applications: 'topfreeipadapplications',
    top_grossing_applications: 'topgrossingapplications',
    top_grossing_ipad_applications: 'topgrossingipadapplications',
    top_paid_applications: 'toppaidapplications',
    top_paid_ipad_applications: 'toppaidipadapplications'
  },
  GENRES: {
    Business: 6000,
    Weather: 6001,
    Utilities: 6002,
    Travel: 6003,
    Sports: 6004,
    'Social Networking': 6005,
    Reference: 6006,
    Productivity: 6007,
    'Photo & Video': 6008,
    News: 6009,
    Navigation: 6010,
    Music: 6011,
    Lifestyle: 6012,
    'Health & Fitness': 6013,
    Games: 6014,
    Finance: 6015,
    Entertainment: 6016,
    Education: 6017,
    Book: 6018,
    Medical: 6020,
    'Magazines & Newspapers': 6021,
    Catalogs: 6022,
    'Food & Drink': 6023,
    Shopping: 6024,
    Stickers: 6025
  },
  COUNTRIES: chain(codes).map((t) => [t[0], t[0].toLowerCase()]).fromPairs().value()
};
