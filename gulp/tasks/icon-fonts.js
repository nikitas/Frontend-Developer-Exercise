/**********************************************************************
 Stream for icon font generator

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
     * Auto generate icon fonts with SASS support and HTML preview
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {
            var templateOptions;

            // Please pay attention to manually increment unicode prefix!
            return gulp.src([config.paths.assets + 'icons/*.svg'])
                .pipe(plugins.iconfont({
                    fontName: 'gecko-icons',
                    prependUnicode: true,
                    formats: ['woff2', 'woff', 'ttf', 'svg'],
                    timestamp: config.timestamp,
                    normalize: true
                }))
                .on('glyphs', function (glyphs, options) {
                    templateOptions = {
                        glyphs: glyphs,
                        fontName: options.fontName,
                        classPrefix: 'gecko-icon-',
                        path: '../fonts/gecko-icons/gecko-icons',
                        formats: options.formats.join(' ')
                    };

                    // Insert glyphs into SASS template
                    gulp.src(config.paths.assets + 'templates/_iconfont.scss')
                        .pipe(plugins.consolidate('lodash', templateOptions))
                        .pipe(gulp.dest(config.paths.assets + 'css/sass/base/'));

                    // Insert glyphs into HTML template
                    gulp.src(config.paths.assets + 'templates/iconfont.html')
                        .pipe(plugins.consolidate('lodash', templateOptions))
                        .pipe(gulp.dest(config.paths.src));

                }).pipe(gulp.dest(config.paths.assets + 'fonts/gecko-icons/'))
                .pipe(gulp.dest(config.paths.dist + 'assets/fonts/gecko-icons/'));
        };
    };
})(module);
