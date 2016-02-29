(function () {
    'use strict';

    function projectsService($q, data, baseUrl) {
        var deferred = $q.defer();

        function addProject(projectData) {
            var deferred = $q.defer();
            data.post('api/projects', projectData)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        function getAllLicenses() {
            var deferred = $q.defer();
            data.get('api/licenses')
                .then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                })

            return deferred.promise;
        };

        function getProject(projectId) {
            var deferred = $q.defer();
            data.get('api/projects/' + projectId)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                })

            return deferred.promise;
        };

        function filterProjects(params) {
            var deferred = $q.defer();
            data.get('api/projects/all',  params)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                })

            return deferred.promise;
        };


        return {
            addProject: addProject,
            getAllLicenses: getAllLicenses,
            getProject: getProject,
            filterProjects: filterProjects
        }
    }

    angular.module('gitApp.services')
        .factory('projects', ['$q', 'data', 'baseUrl', projectsService]);
}());