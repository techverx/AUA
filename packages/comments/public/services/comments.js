'use strict';

//Comments service used for comments REST endpoint
angular.module('mean').factory('Comments', ['$resource',
	function($resource) {
		return $resource('comments/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
