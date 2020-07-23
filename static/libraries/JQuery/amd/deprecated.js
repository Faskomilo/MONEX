define(['./var/slice', './core', './deprecated/ajax-event-alias', './deprecated/event'], function (slice, core, ajaxEventAlias, event) { 'use strict';

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
core.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( typeof fn !== "function" ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || core.guid++;

	return proxy;
};

core.holdReady = function( hold ) {
	if ( hold ) {
		core.readyWait++;
	} else {
		core.ready( true );
	}
};

});
