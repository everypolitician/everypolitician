# EveryPolitician

> Data about every national legislature in the world, freely available for you to use

- **[everypolitician.org](http://everypolitician.org)** —  [data](http://everypolitician.org/countries.html) | [about](http://docs.everypolitician.org/)
- [Report an issue](https://github.com/everypolitician/everypolitician/issues)

## Repo summary

These are some of the key repos in the EveryPolitician family. There are others.

- **everypolitician** (this repo): contains no code, but is where [issues/tickets for the whole project](https://github.com/everypolitician/everypolitician/issues) live

- **[everypolitician-data](https://github.com/everypolitician/everypolitician-data)**: where the data is stored -- but if you want to download it, get it from:
  - human? go via the [EveryPolitician website](http://everypolitician.org)
  - program? use the RawGit CDN, via links in `countries.json`, which we [explain here](http://docs.everypolitician.org/repo_structure.html)

- **[viewer-static](https://github.com/everypolitician/viewer-static)**: the live website http://everypolitician.org (`gh-pages`)

- **[viewer-sinatra](https://github.com/everypolitician/viewer-sinatra)**: Sinatra app for generating a dynamic version EveryPolitician website

- **[webhook-manager](https://github.com/everypolitician/webhook-manager)**: sends out EveryPolitician WebHooks: [register your URL here!](https://everypolitician-app-manager.herokuapp.com/)

- **[everypolitician-docs](https://github.com/everypolitician/everypolitician-docs)**: documentation at http://docs.everypolitician.org/ (`gh-pages`)

* **[rebuilder](https://github.com/everypolitician/rebuilder)** rebuilds data from source

- Ruby gems for easily manipulating EveryPolitician data (useful for all devs, but we use them too, of course!):
  **[everypolitician-ruby](https://github.com/everypolitician/everypolitician-ruby)**
  and **[everypolitician-popolo](https://github.com/everypolitician/everypolitician-popolo)**.

- handy gems we use when getting the data:
  **[wikidata-fetcher](https://github.com/everypolitician/wikidata-fetcher)**,
  **[wikisnakker](https://github.com/everypolitician/wikisnakker])**,
  **[twitter_username_extractor](https://github.com/everypolitician/twitter_username_extractor])**,
  **[facebook_username_extractor](https://github.com/everypolitician/facebook_username_extractor)**,
  **[twitter_list](https://github.com/everypolitician/twitter_list)**
  
- **[gender-balance](https://github.com/everypolitician/gender-balance)**:
  repo for the [Gender Balance](http://www.gender-balance.org/) website that crowdsources gender data for EveryPolitician

- **[review_changes](https://github.com/everypolitician/review_changes)**:
  code used by the bot to review a data PR and leave a helpful summary [as a comment](https://medium.com/@everypolitician/i-m-a-bot-who-comments-d1d93b6cab63)

The repos for many of our scrapers are kept separately in [github.com/everypolitician-scrapers](https://github.com/everypolitician-scrapers).

## Technical blog

The [EveryPolitician bot's own page](http://docs.everypolitician.org/bot.html)
is a good jumping-off point to lots of semi-technical explanations of what's
going on (it has its own blog on Medium). For example:

* [how the website is built](https://medium.com/@everypolitician/how-i-build-the-everypolitician-website-6fd581867d10) (spoiler: [viewer-sinatra](https://github.com/everypolitician/viewer-sinatra) &rarr; [viewer-static](https://github.com/everypolitician/viewer-static))
* [how webhooks are used](https://medium.com/@everypolitician/i-webhooks-pass-it-on-703e35e9ee93) (you can easily [register your app](https://everypolitician-app-manager.herokuapp.com/)!)
* [how the scrapers run](https://medium.com/@everypolitician/getting-busy-with-scraper-data-957a2ddd9963) (many [live on morph.io](https://morph.io/everypolitician-scrapers))

The bot is on [twitter as @everypolitbot](https://twitter.com/everypolitbot)

## Contributing

If you have data for us, or know where to get it, please read our page about
[how to contribute](http://docs.everypolitician.org/contribute.html).

## Team

EveryPolitician is a [mySociety](https://www.mysociety.org) project.
