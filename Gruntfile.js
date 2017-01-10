process.env.NODE_ENV = process.env.NODE_ENV || 'production'

module.exports = function(grunt) {
    var babel = require('rollup-plugin-babel')
    var nodeResolve = require('rollup-plugin-node-resolve')
    var commonjs = require('rollup-plugin-commonjs')
    var riot = require('rollup-plugin-riot')
    var uglify = require('rollup-plugin-uglify')
    var ruReplace = require('rollup-plugin-replace')
    var alias = require('rollup-plugin-alias')
    var modRewrite = require('connect-modrewrite')
    var serveStatic = require('serve-static')

    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            client: {
                files: ['src/*.js', 'src/**/*.js', 'src/**/*.tag', 'assets/**', 'styles/*.styl'],
                tasks: ['build'],
                options: {
                    livereload: 5729,
                    livereloadOnError: false
                }
            }
        },

        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'assets', src: ['**'], dest: '.dist/'  },
                ]
            }
        },

        concurrent: {
            tasks: ['connect:livereload', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                livereload: 5729
            },
            livereload: {
                options: {
                    keepalive: true,
                    open: true,
                    middleware: function (connect) {
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            serveStatic('.dist')
                        ];
                    }
                }
            }
        },

        rollup: {
            options: {
                entry: './src/index.js',

                plugins: [
                    riot(),

                    alias({
                        config: __dirname + '/config/' + process.env.NODE_ENV
                    }),

                    nodeResolve({
                        main: true,
                        jsnext: true,
                        browser: false
                    }),

                    ruReplace({
                        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                    }),

                    commonjs(),

                    babel({
                        exclude: 'node_modules/**',
                        presets: ['es2015-rollup']
                    })//,

                    /*uglify({
                        wrap: true
                    })*/
                ]
            },

            files: {
                src: 'src/index.js',
                dest: '.dist/scripts/app.js'
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },

        stylus: {
            styles: {
                options: {
                    relativeDest: '../.dist/css'
                },

                files: [{ 
                    expand: true,
                    src: ['styles/*.styl'], 
                    ext: '.css' 
                }]
            }
        }
    })

    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-rollup')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-contrib-stylus')

    grunt.registerTask('styles', ['stylus'])

    grunt.registerTask('build', ['copy:dist', 'styles', 'rollup'])
    grunt.registerTask('serve', ['build', 'concurrent'])
    grunt.registerTask('test', ['karma:unit'])
}
