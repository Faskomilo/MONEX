define(['../../var/pnum'], function (pnum) { 'use strict';

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

return rnumnonpx;

});
