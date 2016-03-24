/**********************************************************************
 Stream for optimizing images

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
     * Reduce the size of all the images
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {
            return gulp.src([
                config.paths.assets + 'img/**/*.*',
                '!' + config.paths.assets + 'img/sprite/*'
            ])
                .pipe(plugins.imagemin({
                    optimizationLevel: 5
                }))
                .pipe(gulp.dest(config.paths.dist + 'assets/img'));
        };
    };
})(module);
