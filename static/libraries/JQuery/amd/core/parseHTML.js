define(['../var/document', '../core', './var/rsingleTag', '../manipulation/buildFragment'], function (document, core, rsingleTag, buildFragment) { 'use strict';

// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
core.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		context = document.implementation.createHTMLDocument( "" );

		// Set the base href for the created document
		// so any parsed elements with URLs
		// are based on the document's URL (gh-2965)
		base = context.createElement( "base" );
		base.href = document.location.href;
		context.head.appendChild( base );
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		core( scripts ).remove();
	}

	return core.merge( [], parsed.childNodes );
};

});
