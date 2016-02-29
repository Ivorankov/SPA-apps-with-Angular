(function () {
    'use strict';

    function statistics() {
        return {
            restrict: 'A',
            templateUrl: 'app/home/statistics-view.html'
        }
    }

    angular.module('gitApp.directives')
        .directive('statistics', [statistics]);
}());