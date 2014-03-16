'use strict';

var espruino = angular.module('espruino', ['ngRoute']).config([

    '$compileProvider',
    '$routeProvider',

    function ($compileProvider, $routeProvider) {

        // Whitelist file urls
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(file):/);

        // Configure routers
        $routeProvider
            .when('/editor', { 
                templateUrl: 'views/editorView.html',
                controller: 'EditorCtrl'
            })
            .otherwise({
                redirectTo: '/editor'
            });
    }

]);