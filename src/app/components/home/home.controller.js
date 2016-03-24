/**********************************************************************
 Controller for home view

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

// RequireJS
define(['app/app.module', 'app/shared/app.factory'], function (app) {
    'use strict';

    /**
     * @ngdoc controller
     * @name HomeCtrl
     * @param {Object} $scope Angular scope
     * @param {Object} HelperService helper object
     * @description
     * Controller for home page
     */
    app.controller('HomeCtrl', function ($scope, HelperService) {

        /**
         * Extension of simple function to create loop in view
         *
         * @param min {Number} Starting number
         * @param max {Number} Max number
         * @param step {Number} Step ti iterate
         * @returns {Array} Ready array for loop
         */
        $scope.range = function(min, max, step) {
            return HelperService.range(min, max, step);
        };
    });
});
