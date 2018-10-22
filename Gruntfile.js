'use strict';

module.exports = function(grunt) {
  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     * We will have 3 main folders for assets
     * 1) /src where all source files will go
     * 2) /dev where all compiled files will go, mainly used for developemnt. Sourcemap will be enabled for debugging
     * 3) /dist where all dist files will go, this will be production ready, minified, timestamped and so on
     */
    project: {
      base: 'wp-content/themes/corey',

      /**
       * CSS folders
       */
      baseCSS: '<%= project.base %>/assets/css',
      srcCSS: '<%= project.baseCSS %>/src',
      devCSS: '<%= project.baseCSS %>/dev',
      distCSS: '<%= project.baseCSS %>/dist',

      // All our changes should go inside this folder
      SCSSIncludes: '<%= project.srcCSS %>/inc/*.scss',
      SCSS: '<%= project.srcCSS %>/styles.scss',

      /**
       * JS folders
       */
      baseJS: '<%= project.base %>/assets/js',
      srcJS: '<%= project.baseJS %>/src',
      devJS: '<%= project.baseJS %>/dev',
      distJS: '<%= project.baseJS %>/dist',
      vendorJS: '<%= project.srcJS %>/vendor',
      // All our changes should go inside this folder
      JSIncludes: '<%= project.srcJS %>/inc/**/*.js',
      JS: [
        // Vendor JS will go in at beginning followed by all other JS
        // This will only look for all JS files in inc folder
        '<%= project.vendorJS %>/html5.js',
        '<%= project.vendorJS %>/handlebars.runtime-v4.0.12.js',
        '<%= project.srcJS %>/handlebars-helper.js',
        '<%= project.srcJS %>/module.js',
        // '<%= project.srcJS %>/variables.js',
        '<%= project.srcJS %>/lang/en_US.js',
        '<%= project.srcJS %>/inc/**/*.js',
      ],

      /**
       * Handlebars folders
       */
      srcHandlebars: '<%= project.srcJS %>/handlebars',

      /**
       * Image folder
       */
      images: '<%= project.base %>/assets/images'
    },

    /*
     * Asset Version
     */

    assetVersion: '<%= grunt.template.today("yymmddhhMM") %>',

    /**
     * SCSSLint
     * https://github.com/ahmednuaman/grunt-scss-lint
     * Manage the options inside .scss-lint.yml file
     */
    scsslint: {
      options: {
        config: '.scss-lint.yml',
        colorizeOutput: true
      },
      allFiles: ['<%= project.SCSSIncludes %>']
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files
     */
    sass: {
      options: {
        style: 'expanded'
      },
      dev: {
        files: {
          '<%= project.devCSS %>/styles.css': '<%= project.SCSS %>',
        }
      },
      dist: {
        files: {
          '<%= project.distCSS %>/styles.css': '<%= project.SCSS %>',
        }
      }
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        '<%= project.srcJS %>/variables.js',
        '<%= project.JSIncludes %>'
      ]
    },

    /**
     * Concatenate JavaScript and plugin CSS files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and plugin CSS files
     * TODO concat plugins backend js
     * TODO concat plugins backend styles
     */
    concat: {
      options: {
        stripBanners: true,
        nonull: true
      },
      dev: {
        files: {
          '<%= project.devJS %>/scripts.js': ['<%= project.JS %>']
        }
      },
      dist: {
        files: {
          '<%= project.distJS %>/scripts.js': ['<%= project.JS %>']
        }
      }
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      dist: {
        files: {
          '<%= project.distJS %>/scripts.min.js': '<%= project.distJS %>/scripts.js'
        }
      }
    },

    /**
     * Do post CSS works
     * * Add browser prefixes to CSS and minify CSS
     */
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: ['> 0.05%', 'ie >= 8'], cascade: false})
        ]
      },
      dev: {
        options: {
          map: {
            inline: false,
            annotation: '<%= project.devCSS %>'
          },
        },
        files: {
          '<%= project.devCSS %>/styles.css': '<%= project.devCSS %>/styles.css',
        }
      },
      dist: {
        options: {
          map: false,
          processors: [
            require('cssnano')({})
          ]
        },
        files: {
          '<%= project.distCSS %>/styles.min.css':'<%= project.distCSS %>/styles.css',
        }
      }
    },

    /**
     * Handlebar JS templates
     * Compile all handlebar templates and put it in single JS file
     */
    handlebars : {
        options : {
            namespace   : 'Handlebars.templates',
            processName : function (filePath) {
                var   path  = filePath.split('handlebars/')
                    , last  = path[path.length - 1]
                    , name
                ;

                name = last.substring(last.indexOf('/') + 1, last.indexOf('.'));

                return name;
            },
            partialRegex        : /^_/,
            processPartialName  : function (filePath) {
                var   path  = filePath.split('handlebars/')
                    , last  = path[path.length - 1]
                    , name
                ;

                name = last.substring(last.indexOf('/') + 1, last.indexOf('.'));
                name = name.replace('/_', '/');

                return name;
            },
        },
        compile : {
            files : {
                '<%= project.srcHandlebars %>/scripts.js'  : '<%= project.srcHandlebars %>/**/*.hb',
            },
        },
    },

    /**
     * Add timestamp to assets
     * https://github.com/gruntjs/grunt-contrib-copy
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.base %>',
          dest: '<%= project.base %>/',
          src: [
            'css/dist/styles.min.css',
            'js/dist/scripts.min.js'
          ],
          rename: function(dest, src) {
            var fileName = dest + src.replace(/.min./gi, function(x) {
                return '.<%= assetVersion %>.'
              });
            return fileName
          }
        }]
      }
    },

    shell: {
      options: {
        stderr: false
      },
      createPHPConstantFile: 'touch <%= project.base %>/inc/grunt-constant.php',
      addConstantVariable: 'echo "<?php \n define(\'ASSET_VERSION\', \'min\'); \n ?>" >> <%= project.base %>/inc/grunt-constant.php'
    },

    setPHPConstant: {
      dist: {
        constant: 'ASSET_VERSION',
        value: '<%= assetVersion %>',
        file: '<%= project.base %>/inc/grunt-constant.php'
      }
    },

    watch: {
      js: {
        files: '<%= project.srcJS %>/**/*.js',
        tasks: ['jshint', 'concat:dev']
      },

      scss: {
        files: '<%= project.srcCSS %>/**/*.{css,scss}',
        tasks: ['scsslint', 'sass:dev', 'postcss:dev']
      },

      handlebars: {
        files: '<%= project.srcHandlebars %>/**/*.hb',
        tasks: ['handlebars:compile', 'concat:dev']
      },

      // Reloading all tasks if Gruntfile.js is changed
      grunt: {
        files: ['Gruntfile.js', 'package.json']
      }
    },

    clean: {
      dist: ["<%= project.distJS %>/", "<%= project.distCSS %>/", "<%= project.base %>/inc/grunt-constant.php"]
    },
  });

  /**
   * Default task
   * Run `grunt` on the command line
   * Then add JS/CSS file names in layout
   */
  grunt.registerTask('default', [
    'scsslint',
    'sass:dev',
    'postcss:dev',
    'jshint',
    'handlebars:compile',
    'concat:dev',
    'watch'
  ]);

  /**
   * Dev task
   * Run `grunt dev` on the command line
   * Then add JS/CSS file names in layout
   */
  grunt.registerTask('dev', [
    'sass:dev',
    'postcss:dev',
    'handlebars:compile',
    'concat:dev'
  ]);

  /**
   * Build task
   * Run `grunt dist` on the command line
   * Then add JS/CSS file names in layout
   */
  grunt.registerTask('dist', [
    'clean:dist',
    'sass:dist',
    'postcss:dist',
    'handlebars:compile',
    'concat:dist',
    'uglify',
    'copy:dist',
    'shell',
    'setPHPConstant:dist'
  ]);

};
