(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipsController', ShipsController);
    
    ShipsController.$inject = ['ShipsService', '$scope'];
    function ShipsController(ShipsService,$scope) {
        var _this = this;        
        _this.fetchNext = function ()  {
            var url = _this.lastResponse ? _this.lastResponse.next : null;

            ShipsService.CacheFront(url)
            .then(function (data) {
                _this.starships = _this.starships.concat(data.results);
                _this.lastResponse = data;
            	if(data.count <= _this.starships.length){
            		//alert('no hay mas naves');
            		 _this.nodata = true;
            	}
                $scope.$digest;
    
            })
            .catch(function () {
                _this.error = true;
                $scope.$digest();
            });            
        }       
        _this.nodata = false;
        _this.error = undefined;
        _this.lastResponse = {};
        _this.starships = [];                
        
        _this.fetchNext();
        
    }
})();