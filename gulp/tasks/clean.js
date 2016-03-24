/**********************************************************************
 Stream for cleaning project environment

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
     * Clean created assets
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {

            // For some reason inject module isn't cleaning injected files for SASS/SCSS files
            // So we need to do it manually
            plugins.fs.readFile(config.paths.src + 'assets/css/sass/main.scss', 'utf-8', function(err, _data) {
                plugins.fs.writeFileSync(
                    config.paths.src + 'assets/css/sass/main.scss',
                    _data.replace(
                        _data.substring(
                            _data.indexOf('/* inject:scss */') + 17,
                            _data.indexOf('/* endinject */')
                        ),
                        '\n'
                    )
                );
            });

            // Reset auto generated files
            plugins.fs.writeFileSync(config.paths.src + 'assets/css/sass/base/_sprite.scss', '');
            plugins.fs.writeFileSync(config.paths.src + 'assets/css/sass/base/_iconfont.scss', '');

            // Clean
            return gulp.src([
                config.paths.assets + 'img/sprite.png',
                config.paths.assets + 'img/sprite@2x.png',
                config.paths.assets + 'fonts/*',
                config.paths.src + 'iconfont.html',
                config.paths.dist + '*'
            ], {
                read: false
            }).pipe(plugins.clean({
                force: true
            }));
        };
    };
})(module);
