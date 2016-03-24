/**********************************************************************
 Main initiation of functional logic

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

/**
 * Anonymous function
 *
 * @param d {Object} Current document global object
 */
;(function (d) {
    'use strict';

    // Dynamically add base tag to head element because of Angular $locationProvider
    var newBase = d.createElement('base');
    newBase.setAttribute('href', d.location.protocol + '//' + d.location.hostname + d.location.pathname);
    d.getElementsByTagName('head')[0].appendChild(newBase);

    // Set require JS configuration
    require.config({
        baseUrl: '',
        paths: {
            'angular': '../bower_components/angular/angular',
            'angular-route': '../bower_components/angular-route/angular-route',
            'angularAMD': '../bower_components/angularAMD/angularAMD'
        },
        shim: {
            'angularAMD': ['angular'],
            'angular-route': ['angular']
        },
        deps: ['app/app.module']
    });
})(document);
