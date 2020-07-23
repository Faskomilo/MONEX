define(['../var/document', './var/whitespace', '../var/isIE'], function (document, whitespace, isIE) { 'use strict';

var rbuggyQSA = [],
	testEl = document.createElement( "div" ),
	input = document.createElement( "input" );

// Support: IE 9 - 11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
if ( isIE ) {
	rbuggyQSA.push( ":enabled", ":disabled" );
}

// Support: IE 11+, Edge 15 - 18+
// IE 11/Edge don't find elements on a `[name='']` query in some cases.
// Adding a temporary attribute to the document before the selection works
// around the issue.
// Interestingly, IE 10 & older don't seem to have the issue.
input.setAttribute( "name", "" );
testEl.appendChild( input );
if ( !testEl.querySelectorAll( "[name='']" ).length ) {
	rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
		whitespace + "*(?:''|\"\")" );
}

rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

var rbuggyQSA$1 = rbuggyQSA;

return rbuggyQSA$1;

});
