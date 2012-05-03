# Tips & Tricks

## Basic example

Get user profiles from [YouTube](http://www.youtube.com/):

```js
function getProfile(userId) {

    $.jsonp({
      "url": "http://gdata.youtube.com/feeds/api/users/"+userId+"?callback=?",
      "data": {
          "alt": "json-in-script"
      },
      "success": function(userProfile) {
          // handle user profile here 
      },
      "error": function(d,msg) {
          alert("Could not find user "+userId);
      }
    });
}
```

## Callback name is not in the url parameters

By default, $.jsonp() uses "_jqjsp" as the callback name. You then just have to put "_jqjsp" where the callback name is supposed to be in the url.

```js
"http://weird-provider.org/_jqjsp/my-service?param1=1&param2=2&..."
```

If you find it confusing or unreadable to have _jqjsp buried inside the url, you can always use the callback option to use a different name and do something like this:

```js
$.jsonp({
    url: "http://weird-provider.org/XXXXXXXX/my-service?param1=1&param2=2&...",
    callback: "XXXXXXXX",
    success: function(json) {
       // This will be called in case of success no matter the callback name
    },
    error: function() {
       // This will be called in case of error no matter the callback name
    }
});
```

## Provider calls a specific callback and I can't override its name in the url

Thankfully, $.jsonp() can handle the situation and you won't have to create a function that's named after the callback and is supposed to handle every response received from this provider.

Say services of _lazy-provider.org_ all call the same callback: _lazyCallback_. All you have to do is something like this:

```js
$.jsonp({
    url: "http://lazy-provider.org/a-service?param1=1&param2=2&...",
    callback: "lazyCallback",
    success: function(json) {
       // Will be given the response of 'a-service'
    },
    error: function() {
       // Will be notified of an error requesting 'a-service'
    }
});

$.jsonp({
    url: "http://lazy-provider.org/another-service?param1=1&param2=2&...",
    callback: "lazyCallback",
    success: function(json) {
       // Will be given the response of 'another-service'
    },
    error: function() {
       // Will be notified of an error requesting 'another-service'
    }
});
```

Both requests can be sent concurrently and $.jsonp() ensures that no collision will ever occur.

## How do I take advantage of the cache?

$.jsonp handles two types of cache. One is browser based, the other is page based.

### Browser cache

Usual JSONP implementations rely on generated callback names to allow concurrent JSONP requests. $.jsonp does not. No matter the situation, provided you don't change it in the options, the callback will always be "_jqjsp". This means that the url used to perform the request is exactly the same from one call to another for the same set of parameters. In that case, "smart" Data APIs can issue a _304: Not Modified_ HTTP response, asking browsers to retrieve the previous response they obtained for the same url from cache.

This is not an exact science. [YouTube](http://www.youtube.com/), for instance, does not always issue a _304_ but when it does eventually, it means further JSONP requests will not involve any network traffic.

To take advantage of browser caching, you have to set the _cache_ option to true. For 1instance:

```js
$.jsonp({
    url: "...",
    cache: true,
    success: function(json) {
       // your success code here
    },
    error: function() {
       // error handling goes here
    }
});
```

### Page-based cache

Some providers just ignore situations when the callback name has not changed. In this case, you can use the page-based cache. This cache is stored in the javascript VM memory and ensures that, when you make a request that has been answered previously, you will get the exact same response and no network traffic will occur.

This cache is wiped out as soon as the page is reloaded.

To take advantage of page-based caching, you have to set the _pageCache_ option to true. Note that doing so overiddes any setting the _cache_ option could have and it is then also considered to be true. For instance:

```js
$.jsonp({
    url: "...",
    pageCache: true,
    success: function(json) {
       // your success code here
    },
    error: function() {
       // error handling goes here
    }
});
```