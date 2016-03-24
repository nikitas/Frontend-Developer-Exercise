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
     * @param config {Object} Task parameters
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, config) {
        return function () {
            var spriteData = gulp.src([
                config.paths.assets + 'img/sprite/**/*.png',
                config.paths.assets + 'img/sprite/**/*.jpg'
            ]).pipe(plugins.spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                imgPath: '../img/sprite.png',
                cssVarMap: function (sprite) {
                    sprite.name = 'sprite-' + sprite.name;
                },
                retinaSrcFilter: [
                    config.paths.assets + 'img/sprite/**/*@2x.png',
                    config.paths.assets + 'img/sprite/!**/!*@2x.jpg'
                ],
                retinaImgName: 'sprite@2x.png'
            }));

            spriteData.css.pipe(gulp.dest(config.paths.assets + 'css/sass/base/'));
            return spriteData.img.pipe(gulp.dest(config.paths.assets + 'img'));
        };
    };
})(module);
