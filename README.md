[![Build Status](https://travis-ci.org/dweinstein/node-itunes-rss.svg?branch=master)](https://travis-ci.org/dweinstein/node-itunes-rss)

# SYNOPSIS

A CLI tool for the iTunes RSS feed.

# USAGE

```sh
$ itunes-rss -h
  Usage: bin [options]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -f, --feed [feed]        Select feed (default: top_free_applications)
    -g, --genre [genre]      Select genre (default: all)
    -c, --country [country]  Select country (default: US)
    --format [json|xml]      Output format (default: json)
    -l, --limit [limit]      Limit/count (default 100)
    -F, --list-feeds         List feeds
    -G, --list-genres        List genres
    -C, --list-countries     List countries
```

# INSTALL

```
$ npm i -g itunes-rss-cli
```
