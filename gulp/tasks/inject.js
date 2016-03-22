/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * Inject assets
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {

            // Prepare proper scripts order
            var js = gulp.src([
                    paths.assets + 'css/*.css',
                    paths.assets + 'js/*.js',
                    '!' + paths.assets + 'js/ga.js',
                    '!' + paths.assets + 'css/*-min.css',
                    '!' + paths.assets + 'js/*-min.js'
                ], {read: false}),
                ga = gulp.src([
                    paths.assets + 'js/ga.js'
                ], {read: false}),
                transform = function (filepath) {
                    arguments[0] = '$cms_conf->url->static/' + filepath.replace(/\.\.\//g, '');
                    return plugins.inject.transform.apply(plugins.inject.transform, arguments);
                };

            // Start injecting CSS and JS files
            return gulp.src([
                paths.templates + 'head/tpl_head-css.php',
                paths.templates + 'js/tpl_js-include.php'
            ]).pipe(plugins.inject(
                gulp.src([
                    paths.assets + 'css/vendors/**/*.css',
                    paths.assets + 'js/vendors/**/*.js'
                ], {read: false}),
                {
                    name: 'vendors',
                    relative: true,
                    transform: transform
                }
            )).pipe(plugins.inject(
                gulp.src([
                    paths.assets + 'js/modules/**/*.js'
                ], {read: false}),
                {
                    name: 'modules',
                    relative: true,
                    transform: transform
                }
            )).pipe(plugins.inject(plugins.series(js, ga),
                {
                    relative: true,
                    transform: transform
                }
            )).pipe(plugins.util.buffer(function (err, files) {
                    for (var i in files) {
                        if (files.hasOwnProperty(i)) {
                            plugins.fs.writeFileSync(files[i].history.toString(), files[i].contents.toString()
                                .replace(/\$cms_conf->url->static\//g, '<?php echo $cms_conf->url->static; ?>'));
                        }
                    }
                }
            ));
        };
    };
})(module);
