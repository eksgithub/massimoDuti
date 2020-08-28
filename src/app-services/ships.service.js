(function () {

    'use strict';

    angular
        .module('app')
        .factory('ShipsService', ShipsService);

    ShipsService.$inject = ['$http', '$q'];
    function ShipsService($http, $q) {
        
        var service = {GetStarships: GetStarships,
        			   CacheFront: CacheFront};
        
        //var segundosPorDia = (24 * 60 * 60);
    	var expires; 
    	var expirado = undefined;

        return service;

        function GetStarships(url) {
            if (!url) {
                url  ='https://swapi.dev/api/starships/'
                //url  ='https://swapi.co/api/starships/'
            }
            return $http.get(url.replace('http:','https:'),{
                headers: {
                    'Authorization': 'none'        
                }
            }).then(function(res){
            	res.data.url = url;
                return res.data;
            });            
        }
        
        function CacheFront(url){
        	var res = undefined; 
        	var listaCacheada = localStorage.getItem(url); 
        	if(listaCacheada == undefined || listaCacheada == "undefined"){
        		expirado = true;
        	}else{
        		var now = new Date();
        		expires = localStorage.getItem('EXPIRE'+url);
        		var difference = now.getTime() - expires;
        		//if(Math.round(difference / 60000)>0){
        		alert(Math.round(difference / 60000));
            	if(Math.round(difference / 60000)>5){
            		//alert('expirado');
        			expirado = true;
        			localStorage.removeItem(url);
        			localStorage.removeItem('EXPIRE'+url);
        		}else{
        			//alert('no expirado');
        			expirado = false;
        		}    			
        	}
        	     // return service.GetList(url);  	
        	
        	if(!expirado){
        		res = JSON.parse(localStorage.getItem(url));

                return $q(function (resolve) {
                    resolve(res);
                });

        	}else{
        		return GetStarships(url)
        		.then(function(r){
        			var lap = new Date();
        			expires = lap.setSeconds(lap.getMinutes() + 5);
                 	localStorage.setItem(r.url, JSON.stringify(r));        	
                 	localStorage.setItem('EXPIRE'+r.url, expires);        	

                	return r;
                });            
        	}
        
        	//return res;
        }
       
    }

    
})();