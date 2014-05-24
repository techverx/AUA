'use strict';

//Scenarios service used for scenarios REST endpoint
angular.module('mean').factory('Scenarios', ['$resource',
	function($resource) {
		return $resource('scenarios/:scenarioId', {
			scenarioId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
