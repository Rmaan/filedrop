module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0,
            }
        },

        concat: {
            options: {
                process: function(src, path) {
                    // Separate js files with semicolon
                    if (/.js$/.test(path))
                        return src + '\n;'
                    return src
                }
            }
        },

        useminPrepare: {
            html : '../page/templates/index.html',
            options: {
                root: '../page/',
                dest: 'dist'
            }
        },

        usemin: {
            html: 'dist/index.html',
            options: {
            }
        },

        filerev: {
            dist: {
                src: ['dist/static/css/*.css', 'dist/static/js/*.js']
            },
            options: {
                encoding: 'utf-8',
            }
        },

        copy: {
            indexHtml: {
                src: '../page/templates/index.html',
                dest: 'dist/index.html'
            },
            assets: {
                expand: true,
                cwd: '../page/static',
                src: ['img/**', 'fonts/**'],
                dest: 'dist/static/'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
//                    preserveLineBreaks: true,
                },
                files: {
                    'dist/index.html': 'dist/index.html',
                }
            },
        },

        clean: ['dist']
    })

    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-filerev')
    grunt.loadNpmTasks('grunt-usemin')

    grunt.registerTask('default', [
        'clean',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'filerev',
        'copy:indexHtml',
        'usemin',
        'htmlmin',
        'copy:assets',
    ])

}