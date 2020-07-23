define(function () { 'use strict';

// rsingleTag matches a string consisting of a single HTML element with no attributes
// and captures the element's name
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );

return rsingleTag;

});
