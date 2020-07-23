define(['../var/indexOf', '../core', '../selector', './var/rneedsContext'], function (indexOf, core, selector, rneedsContext) { 'use strict';

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( typeof qualifier === "function" ) {
		return core.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return core.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return core.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return core.filter( qualifier, elements, not );
}

core.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return core.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return core.find.matches( expr, core.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

core.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( core( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( core.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			core.find( selector, self[ i ], ret );
		}

		return len > 1 ? core.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				core( selector ) :
				selector || [],
			false
		).length;
	}
} );

});
