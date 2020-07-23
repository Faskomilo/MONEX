define(['../core'], function (core) { 'use strict';

var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

core.noConflict = function( deep ) {
	if ( window.$ === core ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === core ) {
		window.jQuery = _jQuery;
	}

	return core;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = core;
}

});
