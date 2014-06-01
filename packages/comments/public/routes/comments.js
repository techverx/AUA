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
            .state('all comments', {
                url: '/comments',
                templateUrl: 'comments/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create comment', {
                url: '/comments/create',
                templateUrl: 'comments/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit comment', {
                url: '/comments/:articleId/edit',
                templateUrl: 'comments/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('comment by id', {
                url: '/comments/:articleId',
                templateUrl: 'comments/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
