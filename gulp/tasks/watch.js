/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * Watch for changes in CSS and JS files
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            gulp.watch(paths.assets + 'css/sass/**/*.scss', ['sass']);
            gulp.watch([
                paths.assets + 'js/modules/**/*.js',
                paths.assets + 'js/*.js',
                '!' + paths.assets + 'js/*.min.js'
            ], ['jshint']);
        };
    };
})(module);
