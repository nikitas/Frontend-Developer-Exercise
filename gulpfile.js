/**
 * Anonymous function
 */
(function () {
    'use strict';

    // Vars
    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')(),
        paths = {
            base: 'public_html/shop/',
            assets: 'public_html/shop/assets/',
            templates: 'public_html/shop/cms/template/includes/blocks/'
        };

    /**
     * Include Gulp tasks
     *
     * @param task {String} Name of the task to load
     * @returns {Function} Node require module function
     */
    function getTask(task) {
        return require(__dirname + '/gulp/' + task)(gulp, plugins, paths);
    }

    // Load plugins that were skipped during auto load
    plugins.fs = require('fs');
    plugins.wiredep = require('wiredep').stream;
    plugins.series = require('stream-series');
    plugins.runSequence = require('run-sequence');

    // Load tasks
    gulp.task('jshint', getTask('jshint'));
    gulp.task('clean', ['jshint'], getTask('clean'));
    gulp.task('sprite', getTask('sprite'));
    gulp.task('sass', ['sprite', 'bower'], getTask('sass'));
    gulp.task('validateCSS', ['sass'], getTask('validate-css'));
    gulp.task('bower', getTask('bower'));
    gulp.task('inject', getTask('inject'));
    gulp.task('usemin', ['inject'], getTask('usemin'));
    gulp.task('images', getTask('images'));
    gulp.task('watch', getTask('watch'));
    gulp.task('dev', ['build', 'watch']);

    // Default task
    gulp.task('build', ['clean'], function (callback) {
        plugins.runSequence(
            'sass',
            'usemin',
            callback
        );
    });
})();
