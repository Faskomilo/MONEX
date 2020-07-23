define(['../core', '../ajax'], function (core, ajax) { 'use strict';

core._evalUrl = function( url, options, doc ) {
	return core.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			core.globalEval( response, options, doc );
		}
	} );
};

});
