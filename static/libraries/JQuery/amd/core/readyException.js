define(['../core'], function (core) { 'use strict';

core.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};

});
