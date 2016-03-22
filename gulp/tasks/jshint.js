/**********************************************************************
 Stream for JSHint check

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
     * JSHint check
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            return gulp.src([
                'gulpfile.js',
                'gulp/*.js',
                paths.src + '**/*.js',
                '!' + paths.assets + 'js/vendors/**/*.js'
            ]).pipe(plugins.jshint())
                .pipe(plugins.jshint.reporter('jshint-stylish'))
                .pipe(plugins.jshint.reporter('fail'));
        };
    };
})(module);
