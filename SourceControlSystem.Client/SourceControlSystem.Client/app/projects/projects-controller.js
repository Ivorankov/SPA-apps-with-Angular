(function () {
    'use strict';

    function ProjectsController(stats, projects, notifier, auth) {
        var vm = this;

        vm.request = {
            page: 1
        };

        stats.getProjects().then(function (response) {
            console.log(response);
            vm.projects = response
        }, function (err) {

        });

        vm.filterProjects = function () {
            projects.filterProjects(vm.request)
                .then(function (filteredProjects) {
                    vm.projects = filteredProjects;
                });
        }


        vm.prevPage = function () {
            vm.request.page--;
            vm.filterTrips();
        }

        vm.nextPage = function () {
            vm.request.page++;
            vm.filterProjects();
        }


        vm.isForPublic = auth.isAuthenticated();

        return vm;
    }

    angular.module('gitApp.controllers')
        .controller('ProjectsController', ['stats', 'projects', 'notifier','auth', ProjectsController]);
}());