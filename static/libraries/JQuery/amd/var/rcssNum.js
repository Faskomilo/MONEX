define(['./pnum'], function (pnum) { 'use strict';

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );

return rcssNum;

});
