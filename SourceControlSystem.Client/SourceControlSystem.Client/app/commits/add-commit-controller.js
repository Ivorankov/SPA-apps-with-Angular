(function () {
    'use strict';

    function AddCommitController($routeParams, $location, commits, notifier) {
        var vm = this;

        var projectId = $routeParams.id;

        vm.addCommit = function (code) {
            commits.addCommit({ ProjectId: projectId, SourceCode: code })
            .then(function (responce) {
                notifier.success('Merge conflict successfull');
                $location.path('/projects/' + projectId);

            }, function (err) {
                notifier.error(err.Message);
            })
        };

        return vm;
    }

    angular.module('gitApp.controllers')
        .controller('AddCommitController', ['$routeParams', '$location', 'commits', 'notifier', AddCommitController]);
}());