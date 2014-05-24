'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all scenarios', {
                url: '/scenarios',
                templateUrl: 'scenarios/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create scenario', {
                url: '/scenarios/create',
                templateUrl: 'scenarios/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit scenario', {
                url: '/scenarios/:scenarioId/edit',
                templateUrl: 'scenarios/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('scenario by id', {
                url: '/scenarios/:scenarioId',
                templateUrl: 'scenarios/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
