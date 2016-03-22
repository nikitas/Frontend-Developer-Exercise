/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * Read injected assets and combine them
     *
     * @param gulp {Object} Main Gulp object
     * @param plugins {Object} All installed plugins
     * @param paths {Object} Project paths
     * @returns {Function} Gulp stream
     */
    m.exports = function (gulp, plugins, paths) {
        return function () {
            return gulp.src([
                paths.templates + 'head/tpl_head-css.php',
                paths.templates + 'js/tpl_js-include.php'
            ]).pipe(plugins.replace('<?php echo $cms_conf->url->static; ?>', '../../../../../'))
                .pipe(plugins.usemin({
                    jsAttributes: {
                        async: true
                    },
                    css: [plugins.cssnano, plugins.rev],
                    js: [plugins.uglify, plugins.rev]
                }))
                .pipe(plugins.replace('href="', 'href="<?php echo $cms_conf->url->static; ?>'))
                .pipe(plugins.replace('src="', 'src="<?php echo $cms_conf->url->static; ?>'))
                .pipe(plugins.rename(function (path) {
                    path.basename += '.min';

                    // Check for file extension and change destination directory
                    switch (path.extname) {
                        case '.css':
                            path.dirname = 'assets/css';
                            break;
                        case '.js':
                            path.dirname = 'assets/js';
                            break;
                        case '.php':
                            if (path.basename.indexOf('css') !== -1) {
                                path.dirname = 'cms/template/includes/blocks/head/';
                            } else {
                                path.dirname = 'cms/template/includes/blocks/js/';
                            }
                            break;
                    }
                }))
                .pipe(gulp.dest(
                    paths.base
                ));
        };
    };
})(module);
