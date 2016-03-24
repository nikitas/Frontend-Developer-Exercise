/**********************************************************************
 Example of testing methods for Angular dummy controller

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

    describe('Header tests', function () {
        var scope,
            ctrl;

        beforeEach(module('header'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('HeaderController', {$scope: scope});
        }));

        it('Add gives the correct result', function () {

            // Arrange
            var num1 = 1;
            var num2 = 3;
            var expected = 4;

            // Act
            var result = scope.add(num1, num2);

            // Assert
            expect(result).toBe(expected);
        });

        it('Subtract gives the correct result', function () {

            // Arrange
            var num1 = 1;
            var num2 = 3;
            var expected = -2;

            // Act
            var result = scope.subtract(num1, num2);

            // Assert
            expect(result).toBe(expected);
        });

        it('Difference gives the correct result when first number is larger', function () {

            // Arrange
            var num1 = 5;
            var num2 = 3;
            var expected = 2;

            // Act
            var result = scope.difference(num1, num2);

            // Assert
            expect(result).toBe(expected);
        });

        it('Difference gives the correct result when second number is larger', function () {

            // Arrange
            var num1 = 5;
            var num2 = 3;
            var expected = 2;

            // Act
            var result = scope.difference(num1, num2);

            // Assert
            expect(result).toBe(expected);
        });

        it('Difference gives zero when both numbers are the same', function () {
            for (var i = 0; i <= 100; i++) {

                // Arrange
                var expected = 0;

                // Act
                var result = scope.difference(i, i);

                // Assert
                expect(result).toBe(expected);
            }
        });

    });

})();
