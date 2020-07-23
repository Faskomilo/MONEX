define(['../../core'], function (core) { 'use strict';

function dir( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && core( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
}

return dir;

});
