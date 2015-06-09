(function($, mc) {
	mc.fl.captureImage = function(callback, params) {
        var options;
		var extraPhotoOptions = params[0];
		var quality = params[1];
		var stamp = params[2] == undefined ? true : params[2];
		// EDD Removed this: var restrictedImage = params[3];
    
        function complete(id) {
            var imageObj;
            if (id) {
                imageObj = {};
                imageObj.EvidenceId = id;
                imageObj.ImageId = id;
                var timestampDT = new Date;
                imageObj.TimeStamp = timestampDT.toISOString();
                var location = mc.db.getCachedPosition();
                if(location!=undefined)
				{
					imageObj.Latitude = location.coords.latitude;
					imageObj.Longitude = location.coords.longitude;
				}
            }            
            if (callback.constructor === Function) {
                callback(imageObj);
            } else {
                callback.resume(imageObj);
            }
        }		
		
		function cameraSuccess(fileUri) {
			var subject_guid = mc.db.getCurrentSubjectGuid();
			var name = mc.db.guid();
            
			function fileMoved(movedFileUri) {
                complete(name);
			}
			function fileNotMoved(error) {
				log.error('The file was not moved: ' + JSON.stringify(error));
                complete();
			}
			mc.fs.moveTemporaryFile(fileUri, subject_guid, name, fileMoved, fileNotMoved);						
		}				
		function cameraFail(message) {			
            log.error('Camera failed: ' + message);
			complete();
		}
	
		if (navigator.hasOwnProperty('camera')) {
			if (mc.fs.available) {
                var exOptions = {};
                var extraPhotoOptionsStr = extraPhotoOptions;			
                if (extraPhotoOptionsStr.length > 0) {
                    exOptions = JSON.parse(extraPhotoOptionsStr);
                }
                options = {
                    quality: quality || 20,
                    allowEdit: false,
                    sourceType: navigator.camera.PictureSourceType.CAMERA,
					correctOrientation: false
                };
                
                for (var attrname in exOptions) { 
                    options[attrname] = exOptions[attrname];
                }
				options.destinationType = navigator.camera.DestinationType.FILE_URI;
                navigator.camera.getPicture(cameraSuccess, cameraFail, options);
			} else {
				log.error('File system not available');
                complete();
			}
		} else {
            log.error('Camera not available');
            complete();
		}        
	}
    
	mc.fl.getAttachment = function(callback, params)
	{
		var subjectGuid = params[0];
		var name = params[1];
		
		function complete(result) {
            if (callback.constructor === Function) {
                callback(result);
            } else {
                callback.resume(result);
            }
        }
		
		mc.att.getAttachment(subjectGuid, name, complete);
	}
	
	mc.fl.getFileRefByGUID = function(callback, params) {
        var subjectGuid = params[0];
		var name = params[1];
		
		function complete(result) {
            if (callback.constructor === Function) {
                callback(result);
            } else {
                callback.resume(result);
            }
        }
        function onSuccess(path) {
            complete('#fileref:' + path);
        }
        function onError(error) {
            log.error('Unable to get file reference: ' + JSON.stringify(error));
            complete();
        }        
        mc.fs.getAttachmentPath(subjectGuid, name, onSuccess, onError);
	}
	
	mc.fl.setImageSource = function(params)
	{		
		var pa = $(params[0])
		var thumb = params[1];
		
	}
	
} (window.jmfw, window.mCapture));