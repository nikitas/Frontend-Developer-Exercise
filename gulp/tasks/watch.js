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
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            gulp.watch(paths.assets + 'css/sass/**/*.scss', ['validateCSS']);
            gulp.watch([
                'gulpfile.js',
                'gulp/*.js',
                paths.src + '**/*.js',
                '!' + paths.assets + 'js/vendors/**/*.js'
            ], ['jshint']);
        };
    };
})(module);
