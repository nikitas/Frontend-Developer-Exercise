/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * JSHint check
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            return gulp.src([
                'gulpfile.js',
                'gulp/*.js',
                paths.assets + 'js/modules/*.js',
                paths.assets + 'js/*.js',
                '!' + paths.assets + 'js/*.min.js'
            ]).pipe(plugins.jshint())
                .pipe(plugins.jshint.reporter('jshint-stylish'))
                .pipe(plugins.jshint.reporter('fail'));
        };
    };
})(module);
