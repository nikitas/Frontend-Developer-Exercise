/**********************************************************************
 Helper methods for sharing a cross Angular

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

// RequireJS
define(['app/app.module'], function (app) {
    'use strict';

    /**
     * @ngdoc factory
     * @name HelperService
     * @param {Object} $window Global window object
     * @description
     * Helper methods for usage across Angular app
     */
    app.factory('HelperService', function($window) {
        return {

            /**
             * Check for storage support in current browser
             *
             * @returns {boolean}
             */
            hasLocaleStorage: function() {
                var uid = new Date().getTime().toString();
                var storage;
                var result;
                try {
                    (storage = $window.localStorage).setItem(uid, uid);
                    result = storage.getItem(uid) === uid;
                    storage.removeItem(uid);
                    return result && storage;
                } catch (exception) {
                }
            },

            /**
             * Simple function to create loop in view
             *
             * @param min {Number} Starting number
             * @param max {Number} Max number
             * @param step {Number} Step ti iterate
             * @returns {Array} Ready array for loop
             */
            range: function(min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            }
        };
    });
});
