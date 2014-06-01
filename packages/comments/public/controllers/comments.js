'use strict';

angular.module('mean').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Comments',
    function($scope, $stateParams, $location, Global, Comments) {
        $scope.global = Global;

        $scope.hasAuthorization = function(comment) {
            if (!comment || !comment.user) return false;
            return $scope.global.isAdmin || comment.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
            var comment = new Comments({
                title: this.title,
                content: this.content
            });
            comment.$save(function(response) {
                $location.path('comments/' + response._id);
            });

            this.title = '';
            this.content = '';
        };

        $scope.remove = function(comment) {
            if (comment) {
                comment.$remove();

                for (var i in $scope.comments) {
                    if ($scope.comments[i] === comment) {
                        $scope.comments.splice(i, 1);
                    }
                }
            } else {
                $scope.comment.$remove(function(response) {
                    $location.path('comments');
                });
            }
        };

        $scope.update = function() {
            var comment = $scope.comment;
            if (!comment.updated) {
                comment.updated = [];
            }
            comment.updated.push(new Date().getTime());

            comment.$update(function() {
                $location.path('comments/' + comment._id);
            });
        };

        $scope.find = function() {
            Comments.query(function(comments) {
                $scope.comments = comments;
            });
        };

        $scope.findOne = function() {
            Comments.get({
                articleId: $stateParams.articleId
            }, function(comment) {
                $scope.comment = comment;
            });
        };
    }
]);
