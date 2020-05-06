(function () {
"use strict";

    Array.prototype.contains = function(element){
        return this.indexOf(element) > -1;
    };

    angular.module("wpsbApp")
    
    .directive("shareButtons", function() {

        var directive = {};
        var uniqueId = 1;
        directive.restrict = "E";
        directive.templateUrl = "/wp-content/plugins/wp-share-buttons/assets/app/directives/templates/share-buttons.html";
        directive.scope = {};

        directive.link = function(scope, element, attrs) {

            angular.element(document).ready(function () {
                jQuery("#shareButtonsWidget .info").tooltip();

                jQuery("#shareButtonsWidget .desktop-share").popover(); 

                jQuery("#shareButtonsWidget .desktop-share").on("click", function (e) {
                    jQuery("#shareButtonsWidget .desktop-share").not(this).popover("hide");
                });
            });

            scope.enableToggle = (attrs.enabletoggle == "true") ? true : false;

            scope.showFeaturedNetwork = function(network){
                var socialNetworks = (attrs.showfeatured) ? attrs.showfeatured : null;
                socialNetworks = socialNetworks.replace(/[\s?\+?\-]+/g, "").toLowerCase().split(",");
                return socialNetworks.contains(network);
            };

            // Show as featured
            scope.featuredFacebook = scope.showFeaturedNetwork("facebook");
            scope.featuredTwitter = scope.showFeaturedNetwork("twitter");
            scope.featuredGoogleplus = scope.showFeaturedNetwork("googleplus");
            scope.featuredWhatsapp = scope.showFeaturedNetwork("whatsapp");
            scope.featuredEmail = scope.showFeaturedNetwork("email");
            scope.featuredDelicious = scope.showFeaturedNetwork("delicious");
            scope.featuredDigg = scope.showFeaturedNetwork("digg");
            scope.featuredEvernote = scope.showFeaturedNetwork("evernote");
            scope.featuredFbmessenger = scope.showFeaturedNetwork("fbmessenger");
            scope.featuredFlipboard = scope.showFeaturedNetwork("flipboard");
            scope.featuredLinkedin = scope.showFeaturedNetwork("linkedin");
            scope.featuredPinterest = scope.showFeaturedNetwork("pinterest");
            scope.featuredPocket = scope.showFeaturedNetwork("pocket");
            scope.featuredSkype = scope.showFeaturedNetwork("skype");
            scope.featuredStumbleupon = scope.showFeaturedNetwork("stumbleupon");
            scope.featuredTumblr = scope.showFeaturedNetwork("tumblr");
            scope.featuredViber = scope.showFeaturedNetwork("viber");
            scope.featuredWordpress = scope.showFeaturedNetwork("wordpress");

            scope.showToggleNetwork = function(network){
                var socialNetworks = (attrs.showontoggle) ? attrs.showontoggle : null;
                socialNetworks = socialNetworks.replace(/[\s?\+?\-]+/g, "").toLowerCase().split(",");
                return socialNetworks.contains(network);
            };

            // Show as featured
            scope.toggleFacebook = scope.showToggleNetwork("facebook");
            scope.toggleTwitter = scope.showToggleNetwork("twitter");
            scope.toggleGoogleplus = scope.showToggleNetwork("googleplus");
            scope.toggleWhatsapp = scope.showToggleNetwork("whatsapp");
            scope.toggleEmail = scope.showToggleNetwork("email");
            scope.toggleDelicious = scope.showToggleNetwork("delicious");
            scope.toggleDigg = scope.showToggleNetwork("digg");
            scope.toggleEvernote = scope.showToggleNetwork("evernote");
            scope.toggleFbmessenger = scope.showToggleNetwork("fbmessenger");
            scope.toggleFlipboard = scope.showToggleNetwork("flipboard");
            scope.toggleLinkedin = scope.showToggleNetwork("linkedin");
            scope.togglePinterest = scope.showToggleNetwork("pinterest");
            scope.togglePocket = scope.showToggleNetwork("pocket");
            scope.toggleSkype = scope.showToggleNetwork("skype");
            scope.toggleStumbleupon = scope.showToggleNetwork("stumbleupon");
            scope.toggleTumblr = scope.showToggleNetwork("tumblr");
            scope.toggleViber = scope.showToggleNetwork("viber");
            scope.toggleWordpress = scope.showToggleNetwork("wordpress");
            
            scope.extractMetaOgContent = function(meta){
                var metaContent = document.querySelector("meta[property=\"og:"+ meta +"\"]");
                metaContent = metaContent && metaContent.getAttribute("content");
                return metaContent;  
            };

            scope.ogUrl = scope.extractMetaOgContent("url");
            scope.ogImg = scope.extractMetaOgContent("image");
            scope.ogTitle = scope.extractMetaOgContent("title");
            scope.ogSiteName = scope.extractMetaOgContent("site_name");
        };

        return directive;
    });
}());