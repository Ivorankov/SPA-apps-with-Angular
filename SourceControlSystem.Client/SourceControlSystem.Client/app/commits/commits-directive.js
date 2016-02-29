(function () {
    'use strict';

    function commitDetails() {
        return {
            restrict: 'A',
            templateUrl: 'app/commits/commit-details-view.html'
        }
    }

    angular.module('gitApp.directives')
        .directive('commitDetails', [commitDetails]);
}());