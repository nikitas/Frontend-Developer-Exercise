/**
 * Anonymous function
 *
 * @param m {Object} Node module object
 */
(function (m) {
    'use strict';

    /**
     * Inject bower packages
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
                paths.templates + 'js/tpl_js-include.php',
                paths.assets + 'css/sass/main.scss'
            ]).pipe(plugins.wiredep({
                    ignorePath: '../../../../../',
                    exclude: [
                        /reset.scss/,
                        /jquery.jscrollpane.min.js/,
                        /jScrollPane\/script\/jquery.mousewheel.js/,
                        /html5shiv.js/
                    ],
                    fileTypes: {
                        html: {
                            replace: {
                                js: '<script src="<?php echo $cms_conf->url->static; ?>{{filePath}}"></script>',
                                css: '<link rel="stylesheet" href="<?php echo $cms_conf->url->static; ?>{{filePath}}" />'
                            }
                        }
                    }
                }))
                .pipe(plugins.util.buffer(function (err, files) {
                    for (var i in files) {
                        if (files.hasOwnProperty(i)) {
                            plugins.fs.writeFileSync(files[i].history.toString(), files[i].contents.toString());
                        }
                    }
                }));
        };
    };
})(module);
