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
	var path=require("path");
	// Project configuration.
	var dir = "test/";
	grunt.initConfig({
		

		// Configuration to be run (and then tested).
		mpt: {
			options: {
				id:"gamecenter",
				urlrandom:false,
				prefix:dir,
				dir:"test"
			},
			update: {
				files: [{
					expand: true,
					cwd: dir,
					src: ['**']
				}]
			},
            single:{
            	options:{
            		action:"changed"
            	},
            	src:"<%= currentPath %>"
            	
            },
			
		},
		watch:{
			main: {
				options: {
		              spawn: false,
		             
		         },
                files: [
                   'test/**'
                ]
            }

		}

		

	});
	grunt.event.on('watch',function(action,filepath,target){
       	grunt.config('currentPath',filepath);
       	grunt.task.run("mpt:single");
    });

	grunt.registerTask('default', ['mpt:update','watch']);


};
