'use strict';

angular.module('mean').controller('ScenariosController', ['$scope', '$stateParams', '$location', 'Global', 'Scenarios','ngTableParams',
    function($scope, $stateParams, $location, Global, Scenarios, ngTableParams) {
        $scope.global = Global;

        $scope.hasAuthorization = function(scenario) {
            if (!scenario || !scenario.user) return false;
            return $scope.global.isAdmin || scenario.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
            var scenario = new Scenarios({
                name: this.name,
                description: this.description,
                classification: this.cllassification,
                scenarioStatus: this.scenarioStatus,
                analysisStatus: this.analysisStatus,
                due: this.due
            });
            scenario.$save(function(response) {
                // $location.path('scenarios' + response._id);
                $location.path('scenarios');
            });

            this.name = '';
            this.description = '';
            this.classification = '';
            this.scenarioStatus= '';
            this.analysisStatus= '';
            this.due = '';
        };

        $scope.remove = function(scenario) {
            if (scenario) {
                scenario.$remove();

                for (var i in $scope.scenarios) {
                    if ($scope.scenarios[i] === scenario) {
                        $scope.scenarios.splice(i, 1);
                    }
                }
            } else {
                $scope.scenario.$remove(function(response) {
                    $location.path('scenarios');
                });
            }
        };

        $scope.update = function() {
            var scenario = $scope.scenario;
            if (!scenario.updated) {
                scenario.updated = [];
            }
            scenario.updated.push(new Date().getTime());

            scenario.$update(function() {
                $location.path('scenarios');
            });
        };

        $scope.find = function() {
            Scenarios.query(function(scenarios) {
               
 $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            name: 'asc'     // initial sorting
        }
    }, {
        total: scenarios.length, // length of data
    });     
  $scope.scenarios = scenarios;
            });
        };

        $scope.findOne = function() {
            Scenarios.get({
                scenarioId: $stateParams.scenarioId
            }, function(scenario) {
                $scope.scenario = scenario;
            });
        };
    }
]);
