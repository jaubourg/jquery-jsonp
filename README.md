# jQuery-JSONP

jQuery-JSONP is a compact (1.8kB minified), yet feature-packed, alternative solution to jQuery's implementation of JSONP.

## Licensing

jQuery-JSONP is released under the [MIT license](https://github.com/jaubourg/jquery-jsonp/blob/master/MIT-LICENSE.txt).

## Download

You can download jQuery-JSONP [here](https://github.com/jaubourg/jquery-jsonp/downloads) (full text and minified versions available).

## Features

jQuery-JSONP features:
* *error recovery* in case of network failure or ill-formed JSON responses,
* precise *control over callback naming* and how it is transmitted in the URL,
* multiple requests with the *same callback name running concurrently*,
* *two caching mechanisms* (browser-based and page based),
* the possibility to *manually abort* the request just like any other AJAX request,
* a *timeout* mechanism.

jQuery-JSONP publishes a $.ajax()-like function called $.jsonp(): similarity ensures programmers get up-to-speed easily.

For instance, as of version 2.3.0, $.jsonp() returns a promise when used in conjunction with jQuery 1.5+.

## Compatibility

jQuery-JSONP has been tested and runs within all major browsers, namely:
* *Internet Explorer 6+*
* *Firefox 2+*
* *Chrome 1+*
* *Safari 3+*
* *Opera 9+*

jQuery-JSONP has also been tested with jQuery 1.3.x up to 1.7.x

## Documentation

* [API Documentation](https://github.com/jaubourg/jquery-jsonp/blob/master/doc/API.md)
* [Tips & Tricks](https://github.com/jaubourg/jquery-jsonp/blob/master/doc/TipsAndTricks.md)
