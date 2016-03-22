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
            plugins.fs.writeFileSync(paths.assets + 'css/sass/base/_sprite.scss', '');
            return gulp.src([
                paths.assets + 'css/*.min.css',
                paths.assets + 'js/*.min.js',
                paths.assets + 'images/sprite.png',
                paths.assets + 'images/sprite@2x.png',
                'cache/pages/**/*.*'
            ], {
                read: false
            }).pipe(plugins.clean({
                force: true
            }));
        };
    };
})(module);
