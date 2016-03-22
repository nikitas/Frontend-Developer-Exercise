/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * Reduce the size of all the images
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins) {
        return function () {
            return gulp.src('src/assets/images/!**!/!*')
                .pipe(plugins.imagemin({
                    optimizationLevel: 5
                }))
                .pipe(gulp.dest('dist/assets/images'));
        };
    };
})(module);
