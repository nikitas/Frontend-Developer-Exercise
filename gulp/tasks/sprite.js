/**********************************************************************
 Stream for automatic sprite generation

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
     * Sprite generator
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            var spriteData = gulp.src([
                paths.assets + 'img/sprite/**/*.png',
                paths.assets + 'img/sprite/**/*.jpg'
            ]).pipe(plugins.spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                imgPath: '../img/sprite.png',
                cssVarMap: function (sprite) {
                    sprite.name = 'sprite-' + sprite.name;
                },
                retinaSrcFilter: [
                    paths.assets + 'img/sprite/**/*@2x.png',
                    paths.assets + 'img/sprite/**/*@2x.jpg'
                ],
                retinaImgName: 'sprite@2x.png'
            }));

            spriteData.css.pipe(gulp.dest(paths.assets + 'css/sass/base/'));
            return spriteData.img.pipe(gulp.dest(paths.assets + 'img'));
        };
    };
})(module);
