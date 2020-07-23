define(function () { 'use strict';

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );

return rscriptType;

});
