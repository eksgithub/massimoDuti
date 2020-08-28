(function () {

    'use strict';
    angular
        .module('app')
        //.module('app', ['angular-err-src'])
        .component('starship', {
            controller: StarshipController,
            templateUrl: './ships/starships-list/starship/starship.component.html',
            bindings: {
                starship: '<',
            }
        })
    //StarshipController.$inject = ['$location'];

    function StarshipController() {
    //function StarshipController($location) {
        var ctrl = this;
        ctrl.shipId = "";
        ctrl.opendetail = function () {
       	 	//location.href='https://localhost:8080/#!/login';
         	localStorage.setItem('fichaActiva',JSON.stringify(ctrl.starship));        	
        	window.location = 'https://localhost:8080/#!/shipsdetail';
        } 
        ctrl.$onInit = function () {
            getStarshipId();
        };

        
        function getStarshipId() {
            var url = ctrl.starship.url;
            ctrl.shipId = url.split("/").filter(function (item) {
                return item !== "";
            }).slice(-1)[0];
        }
    }


})();