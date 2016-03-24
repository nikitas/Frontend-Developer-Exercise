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

            return plugins.rjs.optimize({
                baseUrl: 'src',
                mainConfigFile: config.paths.assets + 'js/main.js',
                out: config.paths.dist + 'assets/js/main-' + config.timestamp + '.min.js',
                optimize: 'uglify',
                uglify: {
                    output: {
                        beautify: false,
                        quote_style: 1
                    },
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    },
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
