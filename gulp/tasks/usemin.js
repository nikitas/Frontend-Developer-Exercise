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
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            return gulp.src([
                paths.src + '*.html',
                '!' + paths.src + 'iconfont.html'
            ]).pipe(plugins.usemin({
                    jsAttributes: {
                        async: true
                    },
                    css: [plugins.cssnano, plugins.rev],
                    html: [ function () {return plugins.htmlMinifier({
                        collapseWhitespace: true,
                        removeComments: true
                    });} ],
                    js: [plugins.uglify, plugins.rev]
                }))
                .pipe(plugins.rename(function (path) {
                    if (path.extname !== '.html') {
                        path.basename += '.min';
                    }
                }))
                .pipe(gulp.dest(
                    paths.dist
                ));
        };
    };
})(module);
