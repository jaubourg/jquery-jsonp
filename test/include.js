/**
 * Ensures that tests have cleaned up properly after themselves. Should be passed as the
 * teardown function on all modules' lifecycle object.
 */
(function () {
	// Store the old counts so that we only assert on tests that have actually leaked,
	// instead of asserting every time a test has leaked sometime in the past
	var oldCacheLength = 0,
		oldFragmentsLength = 0,
		oldTimersLength = 0,
		oldActive = 0;

	window.moduleTeardown = function () {
		var i, fragmentsLength = 0, cacheLength = 0;

		// Allow QUnit.reset to clean up any attached elements before checking for leaks
		QUnit.reset();

		for ( i in jQuery.cache ) {
			++cacheLength;
		}

		jQuery.fragments = {};

		for ( i in jQuery.fragments ) {
			++fragmentsLength;
		}

		// Because QUnit doesn't have a mechanism for retrieving the number of expected assertions for a test,
		// if we unconditionally assert any of these, the test will fail with too many assertions :|
		if ( cacheLength !== oldCacheLength ) {
			equal( cacheLength, oldCacheLength, "No unit tests leak memory in jQuery.cache" );
			oldCacheLength = cacheLength;
		}
		if ( fragmentsLength !== oldFragmentsLength ) {
			equal( fragmentsLength, oldFragmentsLength, "No unit tests leak memory in jQuery.fragments" );
			oldFragmentsLength = fragmentsLength;
		}
		if ( jQuery.timers.length !== oldTimersLength ) {
			equal( jQuery.timers.length, oldTimersLength, "No timers are still running" );
			oldTimersLength = jQuery.timers.length;
		}
		if ( jQuery.active !== oldActive ) {
			equal( jQuery.active, 0, "No AJAX requests are still active" );
			oldActive = jQuery.active;
		}
	};
})();

(function() {

	function loadScript( url ) {
		document.write( "<script src='" + url + "'></script>" );
	}

	function getParams() {
		var params = document.location.search.replace( /^\?/, "" ).split( "&" ),
			output = {},
			i = params.length;
		while( i-- ) {
			params[ i ] = params[ i ].split( "=" );
			output[ params[ i ][ 0 ] ] = params[ i ][ 1 ];
		}
		return output;
	}

	var params = getParams(),
		jQueries = {
			git: "http://code.jquery.com/jquery-git.js"
		};

	params.jquery = params.jquery || "1";
	loadScript( jQueries[ params.jquery ] || "https://ajax.googleapis.com/ajax/libs/jquery/" + params.jquery + "/jquery.min.js" );
	loadScript( "../src/jquery.jsonp.js" );
	loadScript( "qunit/qunit/qunit.js" );
	loadScript( "./unit.js" );

})();