define(['../core', '../selector', '../effects'], function (core, selector, effects) { 'use strict';

core.expr.pseudos.animated = function( elem ) {
	return core.grep( core.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};

});
