EveryPolitician
===============

The project website is [www.everypolitician.org](http://www.everypolitician.org)

Although that *could* be a dynamic website, in fact we're actually putting it up as a totally static one (thus reaping the benefits of cacheing without any real overhead).

### These are the five key repos of EveryPolitician:

* **[everypolitician](https://github.com/everypolitician/everypolitician)**<br>the static "text copy" portion of the project website, which explains the project, paints the map (clientside JS) and provides the CSV upload tool

* **[everypolitician-data](https://github.com/everypolitician/everypolitician-data)**<br>the static data files -- both the source data, and the EveryPolitican data files generated from it -- together with data source information

* **[viewer-sinatra](https://github.com/everypolitician/viewer-sinatra)**<br>wee sinatra app that makes a dynamic version of the entire EveryPolitician data website from a datasource

* **[viewer-static](https://github.com/everypolitician/viewer-static)**<br>repo containing static contents snapshotted from `viewer-sinatra` output and presented via `gh-pages`

* **[github-event-handler](https://github.com/everypolitician/github-event-handler)**<br>some magic for chaining github events together. We use it as a target URL for github callbacks which trigger events through the github API.


> Note: at some stage we're going to combine the `everypolitician` repo and the
> `viewer-static` repo into one.


### How do they combine to make EveryPolitician?

For details on how this all fits together, see this
[process overview](./process-overview).





