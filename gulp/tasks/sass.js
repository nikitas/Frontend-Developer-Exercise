/**********************************************************************
 Stream for SASS build

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
     * SASS
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {
            return gulp.src(config.paths.assets + 'css/sass/*.scss')
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass({
                    outputStyle: 'expanded',
                    indentWidth: 4
                }).on('error', plugins.sass.logError))
                .pipe(plugins.sourcemaps.write('maps'))
                .pipe(gulp.dest(config.paths.assets + 'css/'));
        };
    };
})(module);
