(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipsdetailController', ShipsdetailController);

    ShipsdetailController.$inject = ['$scope','$location'];
    function ShipsdetailController($scope, $location) {
        var vm = this;  
        vm.atras = atras;
        vm.shipAct =  JSON.parse(localStorage.getItem('fichaActiva'));        	

       /* (function initController() {
        	//alert();
        })();*/
        
        function atras(){
        	window.location = 'https://localhost:8080/#!/ships';

        }

    }
})();