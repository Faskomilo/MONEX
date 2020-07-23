define(['../core', '../var/documentElement', '../selector/contains'], function (core, documentElement, contains) { 'use strict';

var isAttached = function( elem ) {
		return core.contains( elem.ownerDocument, elem );
	},
	composed = { composed: true };

// Support: IE 9 - 11+, Edge 12 - 18+
// Check attachment across shadow DOM boundaries when possible (gh-3504)
if ( documentElement.getRootNode ) {
	isAttached = function( elem ) {
		return core.contains( elem.ownerDocument, elem ) ||
			elem.getRootNode( composed ) === elem.ownerDocument;
	};
}

var isAttached$1 = isAttached;

return isAttached$1;

});
