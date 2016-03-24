/**********************************************************************
 Stream for validating HTML with W3C service

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
     * Validate HTML
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
                config.paths.dist + '*.html',
                '!' + config.paths.src + 'iconfont.html'
            ]).pipe(plugins.htmlAngularValidate({
                angular: false,
                reportpath: null,
                reportCheckstylePath: null,
                reportFn: function(fileFailures) {

                    for (var i = 0; i < fileFailures.length; i++) {
                        var fileResult = fileFailures[i];
                        plugins.util.log(fileResult.filepath);

                        for (var j = 0; j < fileResult.errors.length; j++) {
                            var err = fileResult.errors[j];

                            if (err.line !== undefined) {
                                plugins.util.log('[line' + err.line + ', col: ' + err.col + '] ' + err.msg);
                            } else {
                                plugins.util.log(err.msg);
                            }
                        }
                    }

                    return true;
                }
            }));
        };
    };
})(module);
