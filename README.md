EveryPolitician
----

The project website is [www.everypolitician.org](http://www.everypolitician.org)

These are the five repos of EveryPolitician:
================================

* **[everypolitician](https://github.com/everypolitician/everypolitician)**<br>the static "text copy" portion of the project website

* **[everypolitician-data](https://github.com/everypolitician/everypolitician-data)**<br>the static data files (obviously the most recent data is presented) together with data source information

* **[viewer-sinatra](https://github.com/everypolitician/viewer-sinatra)**<br>wee sinatra app that dynamically generates the entire EveryPolitician data website from a datasource

* **[viewer-static](https://github.com/everypolitician/viewer-static)**<br>repo containing static contents snapshotted from `viewer-sinatra` output

* **[github-event-handler](https://github.com/everypolitician/github-event-handler)**<br>some magic for chaining github events together. We use it as a target URL for github callbacks which trigger events through the github API.


> Note: at some stage we're going to combine the `everypolitician` repo and the
> `everypolitician-data` repo into one.


How do they combine to make EveryPolitician?
=========================================

For details on how this all fits together, see this
[process overview](process-overview).





