'use strict';

angular.module('mean').controller('ScenariosController', ['$scope', '$stateParams', '$location', 'Global', 'Scenarios', 'ngTableParams', '$filter', 'Utils',
    function($scope, $stateParams, $location, Global, Scenarios, ngTableParams, $filter, Utils) {
        $scope.global = Global;

        $scope.hasAuthorization = function(scenario) {
            if (!scenario || !scenario.user) return false;
            return $scope.global.isAdmin || scenario.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
            var scenario = new Scenarios({
                name: this.name,
                nipf: this.nipf,
                classification: this.classification,
                scenarioStatus: this.scenarioStatus,
                analysisStatus: this.analysisStatus,
                due: this.due,
                taskNumber: this.taskNumber,
                actor: this.actor,
                discoverable: this.discoverable
            });
            scenario.$save(function(response) {
                // $location.path('scenarios' + response._id);
                $location.path('scenarios');
            });

          this.name = '';
          this.nipf = '';
          this.classification = '';
          this.scenarioStatus = '';
          this.analysisStatus = '';
          this.due = '';
          this.taskNumber = '';
          this.actor = '';
          this.discoverable = '';
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

                $scope.scenarios = scenarios;

                $scope.scenarios.forEach(function(s) {
                    s.user.roles.forEach(function(r) {
                        console.dir(r);
                    });
                });

                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10,          // count per page
                    sorting: {
                        name: 'asc'     // initial sorting
                    }
                }, 
                {
                    total: $scope.scenarios.length, // length of data
                    getData: function($defer, params) {
                        Utils.doSort($scope.scenarios, params);
                    }
                }); 
            });
        };

        $scope.findOne = function() {
            Scenarios.get({
                scenarioId: $stateParams.scenarioId
            }, function(scenario) {
                $scope.scenario = scenario;
            });
        };

        $scope.toggleCollapse = function(scenario) {
            scenario.collapsed = !scenario.collapsed;

        };

        $scope.changeClass = function(scenario){
          if (scenario.class === 'active')
            scenario.class = 'deactive';
          else
            scenario.class = 'active';
        };

        $scope.showDetail = function(scenario) {
            var url = '#!/scenarios/' + scenario._id;
            if ($scope.$$phase) {
                window.open(url, '_blank');
            }
            else {
                $location.path(url);
                $scope.$apply();
            }
        };
    }
]);
