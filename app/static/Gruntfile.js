module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    'output-style': 'compressed',
                    'sass-dir': 'sass',
                    'css-dir': 'css'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'js/libs/jquery/jquery.js',
                    'js/libs/bootstrap/dist/js/bootstrap.js',
                    'js/libs/modernizr/modernizr-custom.js',
                    'js/libs/bxslider-4-kallisto/jquery.bxslider.js',
                    'js/libs/history.js/scripts/bundled-uncompressed/html4+html5/jquery.history.js',
                    'js/dev/script.js'
                ],
                dest: 'js/build/script.js'
            }
        },
        modernizr: {
            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile" : "js/libs/modernizr/modernizr.js",

                // [REQUIRED] Path to save out the built file.
                "outputFile" : "js/libs/modernizr/modernizr-custom.js",

                // Based on default settings on http://modernizr.com/download/
                "extra" : {
                    "shiv" : true,
                    "printshiv" : false,
                    "load" : true,
                    "mq" : false,
                    "cssclasses" : true
                },

                // Based on default settings on http://modernizr.com/download/
                "extensibility" : {
                    "addtest" : false,
                    "prefixed" : false,
                    "teststyles" : false,
                    "testprops" : false,
                    "testallprops" : false,
                    "hasevents" : false,
                    "prefixes" : false,
                    "domprefixes" : false
                },

                // By default, source is uglified before saving
                "uglify" : true,

                // Define any tests you want to implicitly include.
                "tests" : [],

                "parseFiles" : true,

                 "files" : {
                     "src": ['js/dev/script.js']
                 }
            }

        },
        uglify: {
            build: {
                src: 'js/build/script.js',
                dest: 'js/build/script.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dev/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img'
                    }]
            }
        },
        watch: {
            scripts: {
                files: ['js/dev/script.js'],
                tasks: ['modernizr', 'concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            css: {
                files: 'sass/*.scss',
                tasks: ['compass']
            },
            images: {
                files: 'img/*',
                tasks: ['imagemin']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: 'css/*.css'
                },
                options: {
                    watchTask: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-modernizr');

    // What tasks should be run when "grunt" is entered in the command line
    grunt.registerTask('default', ['browserSync', 'watch']);

};
