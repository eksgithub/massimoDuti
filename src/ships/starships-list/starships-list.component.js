(function () {

    'use strict';
    angular.module('app')
    .component('starshipsList', {
        controller: StarshipsListController,
        templateUrl: './ships/starships-list/starships-list.component.html',
        bindings: {
            starships: '<',
            nodata: '<',
            onFetchNextPage: '&'
        }
    })
    function StarshipsListController($scope) {
        var ctrl = this;
        ctrl.fetchNextPage = function () {
            ctrl.onFetchNextPage();
        }
    }


})();