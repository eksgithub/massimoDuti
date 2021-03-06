﻿(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .directive('errSrc', function() {
		  return {
		    link: function(scope, element, attrs) {
		      var defaultSrc = attrs.src;
		      element.bind('error', function() {
		        if(attrs.errSrc) {
		            element.attr('src', attrs.errSrc);
		        }
		        else if(attrs.src) {
		            element.attr('src', defaultSrc);
		        }
		      });
		    }
		  }
		})
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
	        .when('/shipsdetail', {
	            controller: 'ShipsdetailController',
	            //templateUrl: 'ships/starships-list/starship/starships-detail/starship-detail.html',
	            templateUrl: 'ships/starships-list/starship/starship-detail/starship-detail.html',
	            controllerAs: 'vm'
	            
	        })
            .when('/ships', {
                controller: 'ShipsController',
                templateUrl: 'ships/ships.view.html',
                controllerAs: '$ctrl'
                
            })
            .when('/', {
                controller: 'ShipsController',
                templateUrl: 'home/home.view.html',
                controllerAs: '$ctrl'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();