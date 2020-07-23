define(['../core', '../deferred'], function (core, deferred) { 'use strict';

// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

core.Deferred.exceptionHook = function( error, stack ) {

	if ( error && rerrorNames.test( error.name ) ) {
		window.console.warn(
			"jQuery.Deferred exception: " + error.message,
			error.stack,
			stack
		);
	}
};

});
