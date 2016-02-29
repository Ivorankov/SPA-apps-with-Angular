(function () {
    'use strict';

    function HomeController(stats) {
        var vm = this;

        stats.getProjects().then(function (response) {
            console.log('---ALL PROJECTS---');
            console.log(response);
            vm.projects = response
        }, function (err) {

        });

        stats.getCommits().then(function (response) {
            console.log('---ALL Commits---');
            console.log(response);
            vm.commits = response;
        }, function (err) {

        });

        stats.getStatistics().then(function (response) {
            console.log('---ALL Stats---');
            console.log(response);
            vm.statistics = response;
        }, function (err) {

        })

        return vm;
    }

    angular.module('gitApp.controllers')
        .controller('HomeController', ['stats', HomeController]);
}());