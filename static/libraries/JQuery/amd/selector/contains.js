define(['../core'], function (core) { 'use strict';

// Note: an element does not contain itself
core.contains = function( a, b ) {
	var adown = a.nodeType === 9 ? a.documentElement : a,
		bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		adown.contains ?
			adown.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};

});
