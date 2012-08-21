# API

## `jQuery.jsonp( options )`

### Overview

Loads a remote JSON object using a JSONP request.

`$.jsonp()` returns the extended options (the `xOptions` object) for the query (that is an object containing all the options passed to the function plus defaults for those not provided). In most cases you won't need `xOptions` to manipulate directly, but it is available if you need to abort the request manually (`xOptions` provides an `abort()` method to that end).

*_As of version 2.3.0, if you use jQuery-JSONP with jQuery 1.5+, the `xOptions` object is a Promise. See [jQuery's documentation](http://api.jquery.com/deferred.promise/) for more information on Promises and Deferreds._* 

`$.jsonp()` takes one argument, an object of key/value pairs, that are used to initialize and handle the request. All options are optional. A default can be set for any option with `$.jsonp.setup()`. See below for a full list of the key/values that can be used.

### Options

#### beforeSend - `function` (`undefined`)

A function called before the request is even performed. You may return `false` in the callback to cancel the request.

```js
function (xOptions) {
  this; // the xOptions object or xOptions.context if provided
}
```

#### cache - `boolean` (`false`)

If set to `false` it will force the data that you request not to be cached by the browser, unless the `pageCache` option is set to true.

#### callback - `string` (`"_jqjsp"`)

Name of the JSONP callback as provided in the request url. Most of the time, you won't have to change this value but some JSONP providers have a predefined callback name that cannot be overidden. Set the name of said callback in the `callback` option and `$.jsonp` will catch the call.

*_As of version 2.0, the library defines a function for the callback in the global scope, so it is no longer safe to use the name of a function already defined: said function will be redefined by jQuery-JSONP._*

*_On the other hand, it is still perfectly safe to have several concurrent requests using the same callback name: in that case, jQuery-JSONP ensures no collision occurs internally._*

#### callbackParameter - `string` (`undefined`)

*_as of version 1.0.1_*

If provided, specifies the name of the url parameter that conveys the callback name to the service.

Example:

```js
$.jsonp({
  url: "http://service.org/path?param1=xx&param2=xx",
  callbackParameter: "callback"
});
```

is strictly equivalent to:

```js
$.jsonp({
  url: "http://service.org/path?param1=xx&param2=xx&callback=?"
});
```

#### charset - `string` (`undefined`)

*_as of version 2.1.1_*

Forces the request to be interpreted as a certain charset. Only needed for charset differences between the remote and local content.

#### complete - `function` (`undefined`)

A function to be called when the request finishes (after success and error callbacks are executed). The function gets passed two arguments: The `xOptions` object and a string describing the type of completion of the request (`"success"`, `"error"` or `"timeout"`).

```js
function (xOptions, textStatus) {
  this; // the xOptions object or xOptions.context if provided
}
```

#### context - `object` (`undefined`)

*_as of version 2.1.1_*

This object will be made the context of all `xOptions`-related callbacks. For example specifying a DOM element as the context will make it the context for the complete callback of a request, like so:

```js
$.jsonp({
  url: "test.php?callback=?",
  context: document.body,
  complete: function() {
    $(this).addClass("done");
  }
});
```

#### data - `object | string` (`undefined`)

Data to be sent to the server. It is converted to a query string, if not already a string, and then appended to the url. Object must be key/value pairs. If value is an array, jQuery serializes multiple values with same key i.e. `{ foo: [ "bar1", "bar2" ] }` becomes `"&foo=bar1&foo=bar2"`.

#### dataFilter - `function` (`undefined`)

A function to be used to handle the raw responsed JSON object. This is a pre-filtering function to sanitize the response. You should return the sanitized data. The function gets one argument: The raw JSON object returned from the server.

```js
function (json) {
  // do something
  // return the sanitized json
  return json;
}
```

#### error - `function` (`undefined`)

A function to be called if the request fails. The function is passed two arguments: The `xOptions` object and a string describing the type of error that occurred. Possible values for the second argument are `"error"` (the request finished but the JSONP callback was not called) or `"timeout"`.

```js
function (xOptions, textStatus) {
  this; // the xOptions object or xOptions.context if provided
}
```

#### pageCache - `boolean` (`false`)

If set to true, will override the `cache` option and provide a page based caching of the result of the request. Whenever another request is made later on with `pageCache` set to `true` and with options inducing the exact same final url for the request, the cached response is used and no distant call is actually made.

Lifetime of this cache is page-based which means it gets erased at each page reload.

#### success - `function` (`undefined`)

A function to be called if the request succeeds. The function gets passed three arguments: The JSON object returned from the server, a string describing the status (always `"success"`) and, *_as of version 2.4.0_* the `xOptions` object.

```js
function (json, textStatus, xOptions) {
  this; // the xOptions object or xOptions.context if provided
}
```

#### timeout - `number` (`0`)

If greater than `0`, sets a local timeout (in milliseconds) for the request. This will override the global timeout, if one is set via `$.jsonp.setup`. For example, you could use this property to give a single request a longer timeout than all other requests that you've set to time out in one second.

#### traditional - `boolean` (`false`)

*_as of version 2.0.2_*

Set this to true if you wish to use the traditional style of [param serialization](http://api.jquery.com/jQuery.param/).

#### url - `string` (`location.href`)

The URL to request. If more than one `?` character is found in the url, the latest will be replaced by the value of the `callback` option. Note that, given this rule, no valid url can have more than two `?` characters.

## `jQuery.jsonp.setup( options )`

### Overview

Setup global settings for JSONP requests.

### Options

See $.jsonp for a description of all available options.
