define(['../var/document', '../core', '../deferred', './readyException'], function (document, core, deferred, readyException) { 'use strict';

// The deferred used on DOM ready
var readyList = core.Deferred();

core.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			core.readyException( error );
		} );

	return this;
};

core.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --core.readyWait : core.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		core.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --core.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ core ] );
	}
} );

core.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	core.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
if ( document.readyState !== "loading" ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( core.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}

});
