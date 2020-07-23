define(['../core', '../selector'], function (core, selector) { 'use strict';

core.expr.pseudos.hidden = function( elem ) {
	return !core.expr.pseudos.visible( elem );
};
core.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};

});
