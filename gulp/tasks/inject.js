/**********************************************************************
 Stream for injecting CSS and JS files

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
     * Inject our assets
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {

            // Start injecting CSS and JS files
            return gulp.src([
                paths.src + '*.html',
                '!' + paths.src + 'iconfont.html'
            ]).pipe(plugins.inject(
                gulp.src([
                    paths.assets + 'css/*.css',
                    paths.assets + 'js/*.js'
                ], {read: false}),
                {
                    relative: true
                }
            )).pipe(gulp.dest(paths.src));
        };
    };
})(module);
