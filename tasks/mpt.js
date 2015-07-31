/*
 * grunt-retina-image
 * https://github.com/jeakey/grunt-retina-image
 *
 * Copyright (c) 2015 Joram jeakey
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var path = require('path');
	var request = require('request');
	var fs = require('fs-extra');
	var opn = require('opn');
	var fileExp = /(\.png|\.jpg|\.jpeg|\.gif|\.css|\.html|\.htm|\.shtml|\.txt|\.swf|\.json|\.xml|\.js|\.swf|\.mp3|\.mp4|\.wav|\.svg|\.ttf|\.woff|\.eot|\.ogg|\.inc)$/i;
	function fp(path) {
	    var path = path.replace(/\\+/g, '/');
	    return path.replace(/\/+/g, '/');
	}

	function removeFile(options , paths,notUpdate , callback ) {
	    dir = fp(dir);
	    //记录log

	    var myfolder = fp(nowpath).replace(/\/+$/, '').split('/');
	    myfolder = myfolder[myfolder.length - 1];
	    
	    request.post({
		    url: options.website + 'remove.php',
		    headers: {
		        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36',
		        'origin': options.origin,
		        'Referer': options.Referer
		    },
		    form: {
		        myfolder: encodeURIComponent(options.src),
		        name: encodeURIComponent(paths.name),
		        dir: encodeURIComponent(dir),
		        rtx: encodeURIComponent(options.id)
		    }
		},function(){
			callback();
		});
	    
	}

	function utf16to8(str) {
	    return encodeURI(str);
	}

	function sendFile(options , paths ,notUpdate , callback) {
		
	    var path = fp(paths.path),
	    	dir = fp(paths.dir);
	    
	    
	    try {
	    	
	        var content = fs.readFileSync(paths.path);
	        
	    } catch (error) {
	        if (typeof callback == 'function') {
	            callback();
	        }
	        return false
	    }
	    content = new Buffer(content).toString('base64');
	    //记录log
	    var form={
            myfolder: encodeURIComponent(options.src),
            name: encodeURIComponent(paths.name),
            dir: encodeURIComponent(dir),
            path: encodeURIComponent(path),
            rtx: encodeURIComponent(options.id),
            content: content,
            byInit: (notUpdate ? 1 : 0)
        }
	    request.post({
	            url: options.website + 'save.php',
	            headers: {
	                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36',
	                'origin': options.origin,
	                'Referer': options.Referer
	            },
	            form: {
	                myfolder: encodeURIComponent(options.src),
	                name: encodeURIComponent(paths.name),
	                dir: encodeURIComponent(dir),
	                path: encodeURIComponent(path),
	                rtx: encodeURIComponent(options.id),
	                content: content,
	                byInit: (notUpdate ? 1 : 0)
	            }
	        },
	        function(err, httpResponse, body) {
	            var e = body;
	            if (e != '0' && e != '-1' && e != '-2') {
	                var ex = false;
	                if (e.replace(/\.[s]?htm[l]*$/, '') != e) {
	                	grunt.log.ok(utf16to8(e + '?jo_r=1&jo_d=&jo_c=1'));
	                }

	            }
	            if (typeof callback == 'function') {
	                callback();
	            }
	            
	        }
	    );
	}

	function randomString(length) {
	    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
	    
	    if (! length) {
	        length = Math.floor(Math.random() * chars.length);
	    }
	    
	    var str = '';
	    for (var i = 0; i < length; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}
	var byInit=1;
	grunt.registerMultiTask('mpt', 'mpt debug', function() {
		
		var done = this.async();
		var filesSrc=this.filesSrc;
		var options = this.options({
            website:'http://digg.tgideas.qq.com/h5test/',
            id:randomString(5),
            src:"",
            urlrandom:false,
            origin: 'http://mpt.webplat.ied.com',
        	Referer: 'http://mpt.webplat.ied.com/index.php/Act/h5test.html'
        });
		
		var finished=0,
        	processed=filesSrc.length,
        	cache={},
        	cachefile=".mpt";
        fs.createFileSync(cachefile);
        
		var tmp_cache=fs.readFileSync(cachefile).toString();
		var date=new Date();
		cache.year=date.getFullYear();
		cache.month=date.getMonth();
		cache.day=date.getDate();
		cache.random=randomString(5);
		
		cache.website=options.website+"temp/"+options.id+"/"+options.src+"/?jo_r=1&jo_d=&jo_c=1";
		
		if(tmp_cache){
			tmp_cache=JSON.parse(tmp_cache);
			if(tmp_cache.year!=cache.year||tmp_cache.month!=cache.month||tmp_cache.day!=cache.day){
				fs.writeFileSync(cachefile,JSON.stringify(cache));
			}else{
				cache=tmp_cache;
			}
		}else{
			fs.writeFileSync(cachefile,JSON.stringify(cache));
		}
		options.random=cache.random;
		options.id=options.urlrandom?(options.id+cache.random):options.id;
		for(var i=0;i<filesSrc.length;i++){
			var extName = path.extname(filesSrc[i]),
				srcPath = filesSrc[i],
				dirName = path.dirname(filesSrc[i]),
				baseName = path.basename(srcPath, extName); // filename without extension

			var st = fs.statSync(srcPath);

            //判断是不是符合的文件类型
            if ((baseName.replace(fileExp, '') != baseName || st.size < 1024 * 10 * 1024) &&extName) {
                
				if(dirName=="."){
					dirName="";
				}else{
					dirName=dirName+"/";
				}
				var paths={
					path:srcPath,
					dir:dirName,
					name:baseName+extName
				}
				
				if(options.action=="deleted"){
					removeFile(options,paths,function(){
						finished++;
						if(finished==processed){
							byInit=0;
							done();
						}
					})
				}
				else{
					if(options.action){
						byInit=0;
					}

					sendFile(options,paths,byInit,function(){
						finished++;
						
						if(finished==processed){
							
							done();
						}
					})
				}
				
			}else{
				finished++;
				if(finished==processed){
					
					done();
				}
			}
			
		}

		
	});

};