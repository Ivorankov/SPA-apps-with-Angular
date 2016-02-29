(function () {
    'use strict';

    function CommitsDetailsController($routeParams, commits, notifier) {
        var vm = this;

        vm.commitId = $routeParams.commitId;

        commits.getCommit(vm.commitId)
            .then(function (response) {
                console.log(response);
                vm.commit = response;
            }, function (err) {
                notifier.error(err);
            })

        return vm;
    }

    angular.module('gitApp.controllers')
        .controller('CommitsDetailsController', ['$routeParams', 'commits', 'notifier', CommitsDetailsController]);
}());