﻿module.exports = function(grunt) {
    var babel = require('rollup-plugin-babel')
    var nodeResolve = require('rollup-plugin-node-resolve')
    var commonjs = require('rollup-plugin-commonjs')
    var riot = require('rollup-plugin-riot')
    var uglify = require('rollup-plugin-uglify')
    var ruReplace = require('rollup-plugin-replace')
    var modRewrite = require('connect-modrewrite');
    var serveStatic = require('serve-static');

    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            client: {
                files: ['client/*.js', 'client/components/*.tag', 'public/**'],
                tasks: ['build']
            }
        },

        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'public', src: ['**'], dest: '.dist/' }
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
                entry: './client/app.js',

                plugins: [
                    riot(),

                    nodeResolve({
                        main: true,
                        jsnext: true,
                        browser: false
                    }),

                    ruReplace({
                        'process.env.NODE_ENV': JSON.stringify('production')
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
                src: 'client/app.js',
                dest: '.dist/scripts/app.js'
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        }
    })

    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-rollup')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.registerTask('build', ['copy:dist', 'rollup'])
    grunt.registerTask('serve', ['build', 'concurrent'])
}
