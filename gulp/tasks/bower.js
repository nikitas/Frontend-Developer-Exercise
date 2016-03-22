/**********************************************************************
 Stream for Bower packages include

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
     * Inject bower packages
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
                paths.assets + 'css/sass/main.scss'
            ]).pipe(plugins.wiredep({
                    exclude: [
                        /what-input/,
                        /foundation.js/,
                        /angular-mocks/
                    ]
                }))
                .pipe(plugins.util.buffer(function (err, files) {
                    for (var i in files) {
                        if (files.hasOwnProperty(i)) {
                            plugins.fs.writeFileSync(files[i].history.toString(), files[i].contents.toString());
                        }
                    }
                }));
        };
    };
})(module);
