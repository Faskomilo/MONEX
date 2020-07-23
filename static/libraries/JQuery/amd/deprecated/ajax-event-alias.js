define(['../core', '../event', '../ajax'], function (core, event, ajax) { 'use strict';

core.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	core.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );

});
