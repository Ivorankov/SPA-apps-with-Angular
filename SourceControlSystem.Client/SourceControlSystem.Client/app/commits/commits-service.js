(function () {
    'use strict';

    function commitsService($q, data, baseUrl) {
        var deferred = $q.defer();

        function getCommit(commitId) {
            var deferred = $q.defer();
            data.get('api/commits/' + commitId)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err.Message);
                })

            return deferred.promise;
        };

        function addCommit(code) {
            var deferred = $q.defer();
            data.post('api/commits', code)
            .then(function (response) {
                deferred.resolve(response);
            }, function (err) {
                deferred.reject(err.Message);
            })

            return deferred.promise;
        }

        return {
            getCommit: getCommit,
            addCommit: addCommit
        }
    }

    angular.module('gitApp.services')
        .factory('commits', ['$q', 'data', 'baseUrl', commitsService]);
}());