(function () {
    'use strict';

    function MainController($location, auth, identity, notifier) {
        var vm = this;
        // this is for initial load of the page
        waitForLogin();

        vm.logout = function () {
            vm.globallySetCurrentUser = undefined;
            auth.logout().then(function () {
                notifier.success('Yey you just logged out?');
                $location.path('#/');
            }, function (err) {
                notifier('You falied to logout of the server ? xD');
            });
            waitForLogin(); // this is for second login
            $location.path('#/');
        };

        function waitForLogin() {
            identity.getUser()
                .then(function (user) {
                    vm.globallySetCurrentUser = user;
                });
        }
    }

    angular.module('gitApp')
        .controller('MainController', ['$location', 'auth', 'identity', 'notifier', MainController]);
}());