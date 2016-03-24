/**********************************************************************
 Angular routing modules

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

// RequireJS
define(['angularAMD', 'angular-route'], function (angularAMD) {
    'use strict';

    /**
     * @ngdoc module
     * @name angular.module
     * @description
     * Declare our routing modules
     */
    angular.module('routing', ['ngRoute'])

        /**
         * @ngdoc config
         * @param {Object} $routeProvider Angular modules for routing
         * @param {Object} $locationProvider Angular deep linking paths
         * @description
         * App routing configuration
         */
        .config(function ($routeProvider, $locationProvider) {

            // Set routing for default and drivers views
            $routeProvider
                .when('/', angularAMD.route({
                    templateUrl: 'app/components/home/home.tmpl.html',
                    controller: 'HomeCtrl'/*,
                    controllerUrl: 'app/components/home/home.controller.js'*/
                }))
                .when('/drivers/:year?', angularAMD.route({
                    templateUrl: 'app/components/drivers/drivers.tmpl.html',
                    controller: 'DriversCtrl'/*,
                    controllerUrl: 'app/components/drivers/drivers.controller.js'*/
                }))
                .otherwise({redirectTo: '/'});

            // Use the HTML5 history API
            $locationProvider.html5Mode(true);
        }
    );
});
