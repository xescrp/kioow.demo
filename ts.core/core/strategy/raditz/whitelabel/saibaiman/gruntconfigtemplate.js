module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('c:/development/node/yourttoo/web/package.json'),
        sass: {
            dist: {
                options: {
                       // Target options
                    style: 'compressed'//,
                },
                files: {
                    %outputcss% : %inputsass%
                }
            }
        }
    });
    
    grunt.file.preserveBOM = false;
    grunt.file.defaultEncoding = 'utf8';
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass']);
}