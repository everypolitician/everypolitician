EveryPolitician system overview
===============================

Behind the scenes, the EveryPolitician project is driven by several distinct  github repos. It's set up to make Good Things happen when data is updated. This is an overview of how it all hangs together (currently).

> Note: at some stage we're going to combine the `everypolitician` repo and the
> `viewer-static` repo into one

Key things to know:
-------------------

* the public project website is at [everypolitician.org](http://everypolitician.org)
* repo [everypolitician](https://github.com/everypolitician/everypolitician) contains the static site (served from github `gh-pages`)
* repo [everypolitician-data](https://github.com/everypolitician/everypolitician-data) contains the static site's data that's been collected and collated:
  - expressed both as one JSON (Popolo) file
  - ...and CSV files, one per term (e.g., the current parliament is one term)
  - and as this is the data, we're serving those data files off github (in fact, it's from the [RawGit cacheing proxy](https://rawgit.com/faq), because that does the Right Thing with MIME-types)
* the file `countries.json` in `everypolitician-data` is important because it not only declares which countries are represented, but also links to the most up-to-date files (because `countries.json` includes `lastmod` timestamps and git commit SHAs for the countries' data files)

The EveryPolitician project is fundamentally about collating data for each country. That data comes from external sources of Open Data, and those are identified in the each country's own directory within the `everypolitician-data` repo too (for example: here's [Australia's source](https://github.com/everypolitician/everypolitician-data/tree/master/data/Australia/Parliament ). In there you can usually see

   * `source` directory containing the "raw" data
   * a `Rakefile` that gets and processes that raw data -- for example, if it's using the [morph.io](https://morph.io/) scraping platform, this is a call out to that
   * all the data, expressed in Popolo (called `final.json` or TBC `popolo.json`)
   * CSV files for the data sliced up for each term of the legislature

How the data gets added, in detail
-----------------------

Here's the detailed technical process for absorbing new data. This is basically the same whether the data is entirely new, or an update to existing data.

The process:

* Data changes in a source (for example, a new politician is added). Often the following steps happen because we're aware that the data has changed, but
  alternatively it could be a regular, speculative update to absorb any changes.
  There are two parts to how this gets absorbed, which are usually wholly managed by rake tasks.

  - Firstly the data is retreived (for example, some sources are scraped from [morph.io](http://morphi.io)) and the country's data files regenerated from that source (that means building the Popolo JSON and also slicing it into the right CSV files, one for each term).

  - Secondly `countries.json` is updated to include all the metadata about this change.

* A merge commit of these changes on `everypolitician-data` then triggers :magic:

* We use [github-event-handler](https://github.com/everypolitician/github-event-handler)
  running on a heroku dyno to notice that commit: this triggers the creation of 
  a pull request against the `viewer-sinatra` repo. That pull request contains
  a single commit containing just one change: `DATASOURCE` now  contains the new, latest SHA in the URL of the just-updated `countries.json`.

* Repo [viewer-sinatra](https://github.com/everypolitician/viewer-sinatra) contains a wee Sinatra app that generates EveryPolitician pages on demand from a datasource -- specifically [*this* datasource](https://github.com/everypolitician/viewer-sinatra/blob/master/DATASOURCE) ...which of course is pointing to the new data that was just added in `everypolitician-data`.

* The presence of the new pull request triggers the creation of a new heroku dyno of `viewer-sinatra`: effectively, this is a *complete
  staging site* previewing the new data with a URL of the form
  `https://everypolitician-viewer-pr-XXX.herokuapp.com/`, where `XXX` is the
  pull request number (remember, that's the [pull request against viewer-sinatra](https://github.com/everypolitician/viewer-sinatra/pulls)).

* You can be notified of the creation of these staging sites via github
  notifications.

* If that's all in order (after inspecting the new data on its staging site, of course), one of the team will merge that pull-request into the master branch of `viewer-sinatra`.
  
* When travis does a successful build of the master branch, more magic happens.
  (Note this is only triggered when the master branch build wasn't triggered by
  a pull request -- that is, because one of the team explicitly authenticated this by bringing it into master).

* The preview website is spidered and the whole site is captured as static files. That entire collection of files is added as a commit to the `gh-pages` branch of [viewer-static](https://github.com/everypolitician/viewer-static).

* The `viewer-static` repo is really a snapshot of the latest, definitive files generated by `viewer-sinatra` -- the difference being that, unlike the Sinatra app's dynamically-generated responses, these really are just static files. These are hosted at `data.everypolitician.org` (on github -- this is why it's a `gh-pages` branch).

* At this point the data can be considered published! The first hit on it will cause it to be cached in RawGit.

* The static site on everypolitician (currently, this is just the map of countries) is automagically updated because it gets its data from `viewer-static`'s `countries.json`.

* The automatically-created staging sites melt away when the pull request that generated them is closed. All that remains is the static [everypolitician.org](http://everypolitician.org) site and its links to the data on `everypolitician-data`.
