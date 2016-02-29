(function () {
    'use strict';

    function statsService($q, data, baseUrl) {

        var projects;
        var commits;
        var statistics;

        function getProjects() {
            if (projects) {
                return $q.when(projects);
            }
            else {
                return data.get('api/projects')
                    .then(function (stats) {
                        projects = stats;
                        return stats;
                    });
            }
        }

        function getCommits() {
            if (commits) {
                return $q.when(commits);
            }
            else {
                return data.get('api/commits')
                    .then(function (stats) {
                        commits = stats;
                        return stats;
                    });
            }
        }

        function getStatistics() {
            if (statistics) {
                return $q.when(statistics);
            }
            else {
                return data.get('api/statistics')
                    .then(function (stats) {
                        statistics = stats;
                        return stats;
                    });
            }
        }

        return {
            getProjects: getProjects,
            getCommits: getCommits,
            getStatistics: getStatistics
        }
    }

    angular.module('gitApp.services')
        .factory('stats', ['$q', 'data', 'baseUrl', statsService]);
}());