(function () {
    "use strict";
    angular.module("wpsbApp")

        .filter("utmParams", function(){
            return function(string, socialNetwork) {
                var urlParams = string + "?utm_source="+ socialNetwork +"&utm_medium=social-media&utm_campaign=theme-share-widget"; 
                if(socialNetwork == "email"){
                	urlParams = encodeURIComponent(urlParams);
                }
                return urlParams;
            };
        });
}());