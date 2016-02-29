(function () {
    'use strict';

    function RegisterController($location, auth, notifier) {
        var vm = this;

        vm.register = function (user, registerForm) {
            if (registerForm.$valid) {
                console.log('...Registering user...');
                auth.register(user)
                    .then(function () {
                        notifier.success('Elo there :), you are now registered');
                        console.log('...User registered...');
                        $location.path('/identity/login');
                    }, function (err) {
                        notifier.error(err.data.Message); // I hope thats how it returns it, for now its a mistery 
                    });
            }
        }
    }

    angular.module('gitApp.controllers')
        .controller('RegisterController', ['$location', 'auth', 'notifier', RegisterController]);
}());