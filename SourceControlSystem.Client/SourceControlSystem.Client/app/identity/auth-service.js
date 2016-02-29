(function () {
    'use strict';

    var authService = function authService($http, $q, $cookies, identity, baseUrl) {
        var TOKEN_KEY = 'authentication'; // cookie key
        var currentUser = {};
        var register = function register(user) {
            var defered = $q.defer();

            $http.post(baseUrl + 'api/account/register', user)
                .then(function () {
                    defered.resolve(true);
                }, function (err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        var login = function login(user) {
            var deferred = $q.defer();

            // process data with url encoded format because API expects it this way
            var data = "grant_type=password&username=" + (user.username || '') + '&password=' + (user.password || '');

            // set header in order to prevent Angular making data to JSON
            $http.post(baseUrl + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    var tokenValue = response.access_token; // token for authorized access

                    // cookie expiration date (set it to whatever you want)
                    var theBigDay = new Date();
                    theBigDay.setHours(theBigDay.getHours() + 72);

                    // save cookie for refresh scenarios
                    $cookies.put(TOKEN_KEY, tokenValue, { expires: theBigDay });

                    // set default Authorization header so that we do not need to provide the header with every request
                    $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

                    currentUser = response.userName;
                    console.log(response);
                    identity.setUser(currentUser);
                    deferred.resolve(response);

                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var logout = function () {
            var defered = $q.defer();

            $http.post(baseUrl + 'api/account/logout')
                .then(function () {
                    $cookies.remove(TOKEN_KEY);
                    $http.defaults.headers.common.Authorization = null;
                    identity.removeUser();                    
                    defered.resolve(true);
                }, function (err) {
                    defered.reject(err);
                });

            return defered.promise;
        }


        var getIdentity = function () {
            if (this.isAuthenticated) {
                identity.setUser(currentUser);
            }

        };

        return {
            register: register,
            login: login,
            getIdentity: getIdentity,
            isAuthenticated: function () {
                return !!$cookies.get(TOKEN_KEY);
            },
            logout: logout
        };
    };

    angular
        .module('gitApp.services')
        .factory('auth', ['$http', '$q', '$cookies', 'identity', 'baseUrl', authService]);
}());