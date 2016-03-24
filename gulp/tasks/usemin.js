/**********************************************************************
 Stream for unifying and minifying JS and CSS

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
     * Read injected assets and combine them
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {
            return gulp.src([
                config.paths.src + '*.html',
                config.paths.src + 'app/**/*.html',
                '!' + config.paths.src + 'iconfont.html'
            ]).pipe(plugins.usemin({
                    jsAttributes: {
                        async: true
                    },
                    css: [plugins.cssnano],
                    html: [ function () {return plugins.htmlMinifier({
                        collapseWhitespace: true,
                        removeComments: true
                    });} ],
                    js: []
                }))
                .pipe(plugins.rename(function (path) {

                    // Check if these are Angular templates
                    if (path.dirname.indexOf('components') !== -1 || path.dirname.indexOf('shared') !== -1) {
                        path.dirname = 'app/' + path.dirname;
                    }

                    // Also append timestamp to static unified elements
                    if (path.extname !== '.html') {
                        path.basename += '-' + config.timestamp + '.min';
                    }
                }))
                .pipe(plugins.ignore.exclude('*.min.js'))
                .pipe(gulp.dest(
                    config.paths.dist
                ));
        };
    };
})(module);
