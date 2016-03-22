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
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            plugins.fs.writeFileSync(paths.src + 'assets/css/sass/base/_sprite.scss', '');
            plugins.fs.writeFileSync(paths.src + 'assets/css/sass/base/_iconfont.scss', '');
            return gulp.src([
                paths.assets + 'img/sprite.png',
                paths.assets + 'img/sprite@2x.png',
                paths.assets + 'fonts/*',
                paths.src + 'iconfont.html',
                paths.dist + '*'
            ], {
                read: false
            }).pipe(plugins.clean({
                force: true
            }));
        };
    };
})(module);
