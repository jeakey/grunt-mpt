/*
 * grunt-retinafy
 * https://github.com/JrSchild/grunt-retinafy
 *
 * Copyright (c) 2013 Joram Ruitenschild
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Project configuration.
	grunt.initConfig({
		

		// Configuration to be run (and then tested).
		mpt: {
			options: {
				id:"gamecenter",
				urlrandom:false
			},
			update: {
				files: [{
					expand: true,
					cwd: 'test',
					src: ['**']
				}]
			},
            single:{
            	options:{
            		action:"changed"
            	},
            	src:["test/index.html"]
            	
            },
			
		},
		watch:{
			main: {
                files: [
                   'test/**'
                ],
                tasks:["mpt:single"]
            }
            

		}

		

	});
	grunt.event.on('watch',function(action,filepath,target){
		var filepath=filepath.replace("\\","/");
       	grunt.config('mpt.single.src',[filepath]);
        
     });

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('default', ['mpt:update','watch']);


};
