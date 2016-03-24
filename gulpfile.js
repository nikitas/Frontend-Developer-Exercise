/**********************************************************************
 Gulp tasks runner build

 Author: Branislav Maksin, bane@maksin.net
 Date: 22.3.2016
 Copyright: The MIT License (MIT). Copyright (c) 2016 Branislav Maksin
 Version: 1.0.0
 ***********************************************************************/

/**
 * Anonymous function
 */
(function () {
    'use strict';

    // Vars
    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')(),
        config = {
            timestamp: new Date().getTime(),
            paths: {
                base: __dirname + '/',
                src: 'src/',
                assets: 'src/assets/',
                dist: 'dist/'
            }
        };

    /**
     * Include Gulp tasks
     *
     * @param task {String} Name of the task to load
     * @returns {Function} Node require module function
     */
    function getTask(task) {
        return require(__dirname + '/gulp/tasks/' + task)(gulp, plugins, config);
    }

    // Load plugins that were skipped during auto load
    plugins.fs = require('fs');
    plugins.wiredep = require('wiredep').stream;
    plugins.runSequence = require('run-sequence');
    plugins.Server = require('karma').Server;
    plugins.rjs = require('requirejs');

    // Load tasks
    gulp.task('jshint', getTask('jshint'));
    gulp.task('tests', getTask('tests'));
    gulp.task('clean', ['jshint', 'tests'], getTask('clean'));
    gulp.task('sprite', getTask('sprite'));
    gulp.task('icons', getTask('icon-fonts'));
    gulp.task('bower', getTask('bower'));
    gulp.task('inject', ['bower'], getTask('inject'));
    gulp.task('sass', ['sprite', 'icons', 'inject'], getTask('sass'));
    gulp.task('validateCSS', ['sass'], getTask('validate-css'));
    gulp.task('usemin', getTask('usemin'));
    gulp.task('requireOptimize', ['usemin'], getTask('requirejs-optimize'));
    gulp.task('validateHTML', ['requireOptimize'], getTask('validate-html'));
    gulp.task('images', getTask('images'));
    gulp.task('watch', getTask('watch'));
    gulp.task('dev', ['build', 'watch']);

    // Default build task
    gulp.task('build', ['clean'], function (callback) {
        plugins.runSequence(
            'validateCSS',
            ['validateHTML', 'images'],
            callback
        );
    });
})();
