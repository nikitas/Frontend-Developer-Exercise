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
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {

            // Start injecting CSS and JS files
            return gulp.src([
                config.paths.src + '*.html',
                '!' + config.paths.src + 'iconfont.html',
                config.paths.assets + 'css/sass/main.scss'
            ]).pipe(plugins.inject(
                gulp.src([
                    config.paths.assets + 'css/*.css',
                    config.paths.src + 'app/**/*.scss',
                    config.paths.assets + 'vendors/**/*.scss',
                    config.paths.assets + '**/*.js',
                    '!' + config.paths.assets + 'js/main.js',
                ], {read: false}),
                {
                    relative: true
                }
            )).pipe(plugins.util.buffer(function (err, files) {
                for (var i in files) {
                    if (files.hasOwnProperty(i)) {
                        plugins.fs.writeFileSync(files[i].history.toString(), files[i].contents.toString());
                    }
                }
            }));
        };
    };
})(module);
