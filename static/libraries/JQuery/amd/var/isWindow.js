define(function () { 'use strict';

function isWindow( obj ) {
	return obj != null && obj === obj.window;
}

return isWindow;

});
