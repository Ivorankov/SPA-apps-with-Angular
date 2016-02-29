(function () {
    'use strict';

    function LoginController($location, auth, notifier) {
        var vm = this;

        vm.login = function (user, loginForm) {
            if (loginForm.$valid) {
                console.log('...Trying to login user...');
                auth.login(user)
                    .then(function (data) {
                        notifier.success('Welcome back =) ' + data.userName);
                        console.log('...User logged in...');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.error_description);
                    })
            }
        }
    }

    angular.module('gitApp.controllers')
        .controller('LoginController', ['$location', 'auth', 'notifier', LoginController]);
}());