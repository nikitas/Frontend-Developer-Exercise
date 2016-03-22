/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * SASS
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            return gulp.src(paths.assets + 'css/sass/*.scss')
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass({
                    outputStyle: 'expanded',
                    indentWidth: 4
                }).on('error', plugins.sass.logError))
                .pipe(plugins.sourcemaps.write('maps'))
                .pipe(gulp.dest(paths.assets + 'css/'));
        };
    };
})(module);
