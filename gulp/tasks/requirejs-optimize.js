/**********************************************************************
 Stream for RequireJS optimizer

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * Optimize RequireJS modules
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function (cb) {

            // Run optimizer
            return plugins.rjs.optimize({
                baseUrl: 'src',
                mainConfigFile: config.paths.assets + 'js/main.js',
                optimizeAllPluginResources: true,
                out: config.paths.dist + 'assets/js/main-' + config.timestamp + '.min.js',
                findNestedDependencies: true,
                insertRequire: ['assets/js/main'],
                wrap: true,
                generateSourceMaps: true,
                preserveLicenseComments: false,
                optimize: 'uglify',
                uglify: {
                    output: {
                        beautify: false
                    },
                    compress: {
                        sequences: false
                    },
                    warnings: true,
                    mangle: false,
                    'screw-ie8': true
                },
                include: ['assets/js/main'],
                name: '../bower_components/almond/almond'
            }, function(buildResponse){
                plugins.util.log('Build response', buildResponse);
                cb();
            }, cb);
        };
    };
})(module);
