/**********************************************************************
 Controller for drivers view

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
     * @name DriversCtrl
     * @param {Object} $scope Angular scope
     * @param {Object} $routeParams Routing parameters
     * @param {Object} $log Angular object for logging
     * @param {Object} $window Global window object
     * @param {Object} $q Angular query object
     * @param {Object} $http Angular object for handling HTTP requests
     * @param {Object} HelperService helper object
     * @description
     * Controller for drivers page
     */
    app.controller('DriversCtrl', function ($scope, $routeParams, $log, $window, $q, $http, HelperService) {

        // Vars
        $scope.error = '';
        $scope.f1Data = {};
        $scope.f1Data.prepared = {};
        $scope.f1Data.year = parseInt($routeParams.year, 10);

        /**
         * Check do we have requested year in local browser cache
         *
         * @param year {Number} Requested year
         * @returns {boolean}
         */
        $scope.checkCache = function (year) {
            var cacheData,
                storage;

            // Check does our browser support local storage
            if (HelperService.hasLocaleStorage()) {
                storage = $window.localStorage;
                cacheData = JSON.parse(storage.getItem('geckof1Data')) || {};

                // Do we cached data
                if (cacheData && cacheData[year]) {
                    $scope.f1Data.prepared = cacheData[year];
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        };

        /***
         * Set current year data in local browser cache
         *
         * @param data {Object} Current year data
         */
        $scope.setCache = function (data) {
            var cacheData,
                storage;

            // Check does our browser support local storage
            if (HelperService.hasLocaleStorage()) {
                storage = $window.localStorage;
                cacheData = JSON.parse(storage.getItem('geckof1Data')) || {};

                // Check do we already have something cached
                cacheData[data.year] = data.prepared;
                storage.setItem('geckof1Data', JSON.stringify(cacheData));
            }
        };

        /**
         * Request data from Ergast developer API
         *
         * @param year {Number} Requested year
         */
        $scope.getData = function (year) {
            var data = {
                error: false
            };

            // Lets get all the data we need
            $q.all([
                $http.get('http://ergast.com/api/f1/' + year + '/results/1.json').then(function(response) {
                    if (typeof response.data !== 'undefined' && response.data.hasOwnProperty('MRData') &&
                        response.data.MRData.hasOwnProperty('RaceTable') &&
                        response.data.MRData.RaceTable.hasOwnProperty('Races')) {
                            data.results = response.data.MRData.RaceTable.Races;
                    } else {
                        data.error = true;
                    }
                }),
                $http.get('http://ergast.com/api/f1/' + year + '/driverStandings.json?limit=1').then(function(response) {
                    if (typeof response.data !== 'undefined' && response.data.hasOwnProperty('MRData') &&
                        response.data.MRData.hasOwnProperty('StandingsTable') &&
                        response.data.MRData.StandingsTable.hasOwnProperty('StandingsLists') &&
                        response.data.MRData.StandingsTable.StandingsLists.length &&
                        response.data.MRData.StandingsTable.StandingsLists[0].hasOwnProperty('DriverStandings') &&
                        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.length &&
                        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].hasOwnProperty('Driver')) {
                            data.seassinChampion = response.data.MRData.StandingsTable.
                                StandingsLists[0].DriverStandings[0].Driver;
                    } else {
                        data.error = true;
                    }
                })
            ]).then(function() {

                // Check for error
                if (!data.error) {
                    $scope.prepareData(data);
                } else {
                    $scope.error = 'Error occur during data retrial, please try again!';
                }
            });
        };

        /**
         * Prepare data for this page view
         *
         * @param data {Object} Current year received data
         */
        $scope.prepareData = function(data) {

            // Check for session Champion
            if (Object.keys(data.results).length) {
                angular.forEach(data.results, function(value, key) {
                    if (value.hasOwnProperty('Results') && value.Results.length &&
                        value.Results[0].hasOwnProperty('Driver') &&
                        value.Results[0].Driver.hasOwnProperty('driverId') &&
                        data.seassinChampion.hasOwnProperty('driverId')) {
                            $scope.f1Data.prepared[key] = {
                                raceURL: value.hasOwnProperty('url') ? value.url : '#',
                                raceName: value.hasOwnProperty('raceName') ? value.raceName : '/',
                                driverName: value.Results[0].Driver.hasOwnProperty('givenName') ? value.Results[0].Driver.givenName : '',
                                driverSurname: value.Results[0].Driver.hasOwnProperty('familyName') ? value.Results[0].Driver.familyName : '',
                                constructorURL: value.Results[0].Constructor.hasOwnProperty('url') ? value.Results[0].Constructor.url : '#',
                                constructorName: value.Results[0].Constructor.hasOwnProperty('name') ? value.Results[0].Constructor.name : '/',
                                lapsCount: value.Results[0].hasOwnProperty('laps') ? value.Results[0].laps : '/',
                                finishTime: value.Results[0].hasOwnProperty('Time') ? value.Results[0].Time.time : '/',
                                isSeassinChampion: value.Results[0].Driver.driverId === data.seassinChampion.driverId ? 'Yes' : 'No'
                            };
                    } else {
                        $scope.error = 'Error occur during data retrial, please try again!';
                    }
                });
            } else {
                $scope.error = 'Error occur during data retrial, please try again!';
            }

            // Finally cache the data
            $scope.setCache($scope.f1Data);
        };

        // First we check do we have a proper year format
        if (isNaN($scope.f1Data.year) || $scope.f1Data.year < 2005 || $scope.f1Data.year > 2015) {
            $scope.error = 'Please provide a valid session year!';
        } else {

            // Check local storage cache or get the data
            if (!$scope.checkCache($scope.f1Data.year)) {
                $scope.getData($scope.f1Data.year);
            }
        }
    });
});
