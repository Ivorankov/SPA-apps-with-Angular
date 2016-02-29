(function () {
    'use strict';

    function AddProjectController($location, projects, notifier) {
        var vm = this;

        projects.getAllLicenses()
                .then(function (response) {
                    console.log(response);
                    vm.licenses = response;
                }, function (err) {

                });

        vm.addProject = function (projectData) {
            //TODO if there is time extract in validator 
            if (projectData.Name.length > 100) {
                notifier.warning('Projects name cannot contain more then 100 chars');
                return;
            } else if (projectData.Description.length > 1000) {
                notifier.warning('Projects description cannot contain more then 1000 chars');
                return;
            }

            projects.addProject(projectData)
                    .then(function (response) {
                        console.log(response);
                        notifier.success('Project created :)');
                        $location.path('/projects/' + response);
                    }, function (err) {
                        notifier.error(err.message);
                    });
        };



        return vm;
    }

    angular.module('gitApp.controllers')
        .controller('AddProjectController', ['$location', 'projects', 'notifier', AddProjectController]);
}());