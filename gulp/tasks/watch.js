/**********************************************************************
 Stream for watching file changes

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
     * Watch for changes in CSS and JS files
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {
            gulp.watch(config.paths.assets + 'css/sass/**/*.scss', ['validateCSS']);
            gulp.watch([
                'gulpfile.js',
                'gulp/*.js',
                config.paths.src + '**/*.js',
                '!' + config.paths.assets + 'js/vendors/**/*.js'
            ], ['jshint']);
        };
    };
})(module);
