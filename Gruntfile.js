/// <binding ProjectOpened='runWatch' />
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        assemble: {
            options: {
                //assets: '',
                partials: ['views/**/*.hbs'],
                layout: ['views/layouts/default.hbs'],
                data: ['data/*.{json,yml}'],
                flatten: true
            },
            index: {
                files: {
                    'templates/index.html': ['views/index.hbs']
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24',
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            site: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['less/*.less'],
                        dest: 'less/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['css/site.css'],
                        dest: 'css/'
                    }
                ]
            }
        },

        less: {
            options: {
            },
            site: {
                files: {
                    'css/site.css': 'less/site.less'
                }
            }
        },

        watch: {
            gruntfile: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },

            assemble: {
                files: ['views/**/*.hbs', 'data/*.{json,yml}'],
                tasks: ['assemble'],
                options: {
                    spawn: false,
                    event: ['all'],
                    debounceDelay: 0
                },
            },

            less: {
                files: 'less/*.less',
                tasks: ['buildLESS'],
                options: {
                    spawn: false,
                    event: ['all'],
                    debounceDelay: 0
                }
            },

            css: {
                files: ['css/*.css'],
                tasks: ['buildCSS'],
                options: {
                    spawn: false,
                    event: ['all'],
                    debounceDelay: 0
                }
            }
        },

        csscomb: {
            options: {
            },

            less: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['less/*.less'],
                    dest: 'less/'
                }]
            },

            css: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['css/site.css'],
                    dest: 'css/'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');

    //grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', ['less', 'autoprefixer', 'csscomb', 'assemble']);
    grunt.registerTask('buildLESS', ['autoprefixer', 'csscomb', 'less', 'csscomb:css']);
    grunt.registerTask('buildCSS', ['autoprefixer', 'csscomb:css']);
    grunt.registerTask('runWatch', ['watch']);
};
