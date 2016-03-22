/**********************************************************************
 Stream for validating built CSS files

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
     * Validate CSS via W3C service
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            var fileName,
                fileContent,
                errorJSON,
                error;

            return gulp.src([
                paths.assets + 'css/*.css'
            ]).pipe(plugins.w3cCss({
                    sleep: 3000
                }))
                .pipe(plugins.util.buffer(function (err, files) {
                    for (var i in files) {
                        if (files.hasOwnProperty(i)) {
                            fileName = files[i].history[0].split('\\').pop().split('/').pop();
                            fileContent = files[i].contents.toString();

                            // Check do we have an error
                            if (fileName && fileContent) {
                                errorJSON = JSON.parse(fileContent);
                                if (errorJSON.hasOwnProperty('errors') && Object.keys(errorJSON.errors).length) {
                                    for (var x in errorJSON.errors) {
                                        if (errorJSON.errors.hasOwnProperty(x)) {
                                            error = errorJSON.errors[x];

                                            // Check for "attr" CSS function
                                            if (error.hasOwnProperty('skippedString') && error.skippedString.indexOf('attr(') === -1) {
                                                plugins.util.log(plugins.util.colors.bold.red('Error found'), 'in', '"' + fileName + '"' +
                                                    '', 'file under selector', '"' + error.context + '"', 'with message', '"' +
                                                    '' + error.message.replace(':', '').trim() + '"', 'and at line', error.line);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }));
        };
    };
})(module);
