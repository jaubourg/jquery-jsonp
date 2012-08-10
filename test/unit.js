module( "main", { teardown: moduleTeardown } );

var hasDeferred = $.Deferred ? 1 : 0;

function testJSONP( name, outcome, options ) {
	test( name, function() {
		stop();
		expect( ( options.expect || 0 ) + 1 + hasDeferred );
		var xOptions = $.jsonp( $.extend( {}, options, {
			success: function() {
				ok( outcome === "success", "Success" );
			},
			error: function() {
				ok( outcome === "error", "Error" );
			},
			complete: function() {
				if ( options.complete ) {
					options.complete.call( this );
				}
				start();
			}
		}) );
		if ( hasDeferred ) {
			xOptions.done(function() {
				ok( outcome === "success", "Done" );
			}).fail(function() {
				ok( outcome === "error", "Fail" );
			});
		}
	});
}

testJSONP( "success", "success", {
	url: "http://gdata.youtube.com/feeds/api/users/julianaubourg?callback=?",
	data: {
		alt: "json-in-script"
	}
});

testJSONP( "error (HTTP Code)", "error", {
	url: "http://gdata.youtube.com/feeds/api/users/hgfusyggbvbdbrfvurgbirhtiytjrhjsrhk66?callback=?",
	data: {
		alt: "json-in-script"
	}
});

if ( window.opera && window.opera.version() < 11.60 ) {
	testJSONP( "error (Syntax Error)", "error", {
		expect: window.opera ? 0 : 1,
		url: "data/syntax-error.js",
		cache: true,
		beforeSend: function() {
			this.oldOnError = window.onerror;
			window.onerror = function() {
				ok( true, "Syntax Error Thrown" );
			};
		},
		complete: function() {
			window.onerror = this.oldOnError;
		}
	});
}

testJSONP( "error (callback not called)", "error", {
	expect: 1,
	url: "data/no-callback.js",
	cache: true,
	complete: function() {
		strictEqual( window.bob, 33, "script was executed" );
		window.bob = false;
	}
});

test( "stress test", function() {

	var num = 20,
		count = num;

	expect( num );
	stop();

	for ( ; num ; num-- ) {
		$.jsonp({
			url: "http://gdata.youtube.com/feeds/api/users/julianaubourg?callback=?",
			success: function() {
				ok( true, "success" );
			},
			error: function() {
				ok( false, "error" );
			},
			complete: function() {
				if ( !( --count ) ) {
					start();
				}
			}
		});
	}
});


test( "callback error", function() {
		expect(2);
		$.jsonp({
			url: "http://gdata.youtube.com/feeds/api/users/julianaubourg?callback=?",
			cache: true,
			success: function() {
				return eval("var j = 7 + // syntax error");
			},
			error: function() {
				ok( false, "error" );
			},
			complete: function() {
				start();
			}
		});
		stop();
		ok( true, "Syntax error handled silently"); // code reached here means syntax error did not stop execution

		$.jsonp({
			url: "http://gdata.youtube.com/feeds/api/users/julianaubourg?callback=?",
			cache: true,
			success: function() {
				try {
					return eval("var j = 7 + // syntax error");
				}
				catch(e) {
					ok( true, "Syntax error thrown");
				}
			},
			error: function() {
				ok( false, "error" );
			},
			complete: function() {
				start();
			},
			throwError: true
		});
		stop();
});
