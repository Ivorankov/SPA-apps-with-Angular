(function () {
    'use strict';

    function config($routeProvider, $locationProvider) {

        var CONTROLLER_VIEW_MODEL_NAME = 'vm';
        var BASE_FILE_LOCATION = 'app/';

        var routeResolvers = {
            authenticationRequired: {
                authenticate: ['$q', 'auth', function ($q, auth) {
                    if (auth.isAuthenticated()) {
                        return true;
                    }

                    return $q.reject('not authorized');
                }]
            }
        }

        $routeProvider
            .when('/', {
                templateUrl: BASE_FILE_LOCATION + 'home/home-view.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/register', {
                templateUrl: BASE_FILE_LOCATION + 'identity/register-view.html',
                controller: 'RegisterController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/identity/login', {
                templateUrl: BASE_FILE_LOCATION + 'identity/login-view.html',
                controller: 'LoginController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/projects', { // public/private
                templateUrl: BASE_FILE_LOCATION + 'projects/projects-public-view.html',
                controller: 'ProjectsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
            })
            .when('/projects/add', { // as button in nav and in /projects
                templateUrl: BASE_FILE_LOCATION +  'projects/add-project-view.html',
                controller: 'AddProjectController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/projects/:id', { // on click on view project 
                templateUrl: BASE_FILE_LOCATION + 'projects/project-details-view.html',
                controller: 'ProjectDetailsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/projects/:id/:addcommits', {
                templateUrl: BASE_FILE_LOCATION + 'commits/add-commit-view.html',
                controller: 'AddCommitController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/commits/:commitId', {
                templateUrl: BASE_FILE_LOCATION + 'commits/commit-view.html',
                controller: 'CommitsDetailsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/unauthorized', {
                template: '<h1 class="text-center">You do not have permission to view this part of the page</h1>'
            })
            .otherwise({ redirectTo: '/' });
    }

    function run($http, $cookies, $rootScope, $location, auth) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/unauthorized');
            }
        });

        if (auth.isAuthenticated()) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('authentication');
            auth.getIdentity();
        }
    };

    angular.module('gitApp.services', []);
    angular.module('gitApp.directives', []);
    angular.module('gitApp.controllers', ['gitApp.services']);

    angular.module('gitApp', ['ngRoute', 'ngCookies', 'gitApp.controllers', 'gitApp.directives'])
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run])
        .value('jQuery', jQuery)
        .value('toastr', toastr)
        .constant('baseUrl', 'http://spa.bgcoder.com/'); // IS NAN
}());