module( "main", { teardown: moduleTeardown } );

test( "success", function() {
	stop();
	expect( 1 );
	$.jsonp({
		url: "http://gdata.youtube.com/feeds/api/users/julianaubourg?callback=?",
		data: {
			alt: "json-in-script"
		},
		success: function() {
			ok( true, "Success" );
		},
		error: function() {
			ok( false, "Error" );
		},
		complete: function() {
			start();
		}
	});
});

test( "error (HTTP Code)", function() {
	stop();
	expect( 1 );
	$.jsonp({
		url: "http://gdata.youtube.com/feeds/api/users/hgfusyggbvbdbrfvurgbirhtiytjrhjsrhk66?callback=?",
		data: {
			alt: "json-in-script"
		},
		success: function() {
			ok( false, "Success" );
		},
		error: function() {
			ok( true, "Error" );
		},
		complete: function() {
			start();
		}
	});
});

test( "error (Syntax Error)", function() {
	stop();
	expect( 1 );
	$.jsonp({
		url: "data/syntax-error.js",
		cache: true,
		success: function() {
			ok( false, "Success" );
		},
		error: function() {
			ok( true, "Error" );
		},
		complete: function() {
			start();
		}
	});
});

test( "error (callback not called)", function() {
	stop();
	expect( 2 );
	$.jsonp({
		url: "data/no-callback.js",
		cache: true,
		success: function() {
			ok( false, "Success" );
		},
		error: function() {
			ok( true, "Error" );
		},
		complete: function() {
			strictEqual( window.bob, 33, "script was executed" );
			start();
		}
	});
});
