(function () {
    'use strict';

    function topProjects() {
        return {
            restrict: 'A',
            templateUrl: 'app/projects/projects-view.html',
        }
    }

    angular.module('gitApp.directives')
        .directive('projectDetails', [topProjects]);
}());