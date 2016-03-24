/**********************************************************************
 Example of dummy controller ready for testing

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

/**
 * Anonymous function
 */
;(function () {
    'use strict';

    angular.module('header',[])
        .controller('HeaderController', ['$scope', function($scope) {

            $scope.add = function (num1, num2) {
                return num1 + num2;
            };

            $scope.subtract = function (num1, num2) {
                return num1 - num2;
            };

            $scope.difference = function (num1, num2) {
                if (num1 > num2) {
                    return num1 - num2;
                }

                return num2 - num1;
            };

    }]);

}());
