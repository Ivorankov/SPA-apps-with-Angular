(function () {
    'use strict';

    function ProjectDetailsController($routeParams, projects, notifier) {
        var vm = this;

        vm.projectId = $routeParams.id;
        projects.getProject(vm.projectId)
            .then(function (response) {
                vm.project = response;
                console.log(vm.project)
            }, function (err) {
                notifier.warning(err.data.Message);
            });

        return vm;
    }

    angular.module('gitApp.controllers')
        .controller('ProjectDetailsController', ['$routeParams', 'projects', 'notifier', ProjectDetailsController]);
}());