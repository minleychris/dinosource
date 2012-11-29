# dinosource


## Prerequisites

You will need [Leiningen][1] 1.7.0 or above installed.

[1]: https://github.com/technomancy/leiningen

## Running

To start a web server for the application, run:

    lein ring server

## Static content

Anything in the public directory will be served directly

## API

The following routes are available:

* `GET /exercises/` - a list of exercises
* `GET /exercises/<id>` - a single exercise
* `POST /solutions/<id>` - send the code produced from a specific exercise, returns an object containing the results of executing it

The `Accept` header in the incoming request defines the mime-type of the response.  JSON is the default.

## License

Copyright © 2012 FIXME
