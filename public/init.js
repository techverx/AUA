'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['mean']);

});

// Dynamically add angular modules declared by packages
var packageModules = [];
for (var index in window.modules) {
    angular.module(window.modules[index].module, window.modules[index].angularDependencies || []);
    packageModules.push(window.modules[index].module);
}

// Default modules
var modules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.auth', 'ngTable'];
modules = modules.concat(packageModules);

// Combined modules
var mean = angular.module('mean', modules);

mean.factory('Utils', function() {
	return {
		doSort: function(modelArray, params) {
			modelArray.sort(function(a, b) {
                var key = Object.keys(params.$params.sorting)[0];
                var order = params.$params.sorting[key];

                if (order === 'asc') {
                    if (a[key] < b[key]) {
                        return -1;
                    }
                    else if (a[key] > b[key]) {
                        return 1;
                    }
                    return 0;
                }
                else {
                    if (a[key] > b[key]) {
                        return -1;
                    }
                    else if (a[key] < b[key]) {
                        return 1;
                    }
                    return 0;   
                }
            });
		}
	};
});

