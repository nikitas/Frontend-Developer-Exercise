/**********************************************************************
 Angular application declaration

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

// RequireJS
define(['angularAMD', 'angular-route', 'app/shared/app.routes'], function (angularAMD) {
    'use strict';

    // Before everything we need to get our controllers,
    // because they will got lost when we use r.js optimizer
    require(['HomeCtrl', 'DriversCtrl']);

    /**
     * @ngdoc module
     * @name angular.module
     * @description
     * Main Angular application declaration
     */
    var app = angular.module('geckoApp', ['routing']);

    // Start it
    return angularAMD.bootstrap(app);
});
