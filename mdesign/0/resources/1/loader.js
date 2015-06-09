// Application Cache Manifest
// 
// Requires DOMContentLoaded event 
// Requires document.querySelector() 
// 

(function() { 
	//debugger;
	//alert('loader.js');
	var phonegapReady = false;
    var cache = window.ctAppCache;
    var cacheStatusStrings = { 0: 'Uncached', 1:'Idle', 2:'Checking...', 3:'Downloading...', 4:'Update Ready', 5:'Obsolete!' }; 
    var downloadCount = 0;  
    var shellReady = false;   
    var sleepDone = false;  
    var updateTimer;
	var inShell = '';
	var listenerTimeout = 1000;
    var isAndroid = (/android/gi).test(window.navigator.appVersion);
    var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);
    var isBlackberry = (/blackberry/gi).test(window.navigator.appVersion);
	var isIE = (/msie/gi).test(window.navigator.appVersion);
	var cacheOpTimerId = -1;
	var cacheOpTimerInterval = 30000;
	var cacheOpTimeoutCount = 0;
	var cacheOpErrorCount = 0;
	
	logmessage('loader.js : cache status = ' + cache.status);

	function getElement(id) {
		return document.getElementById(id);
	}
	
    function keepAwake() {
			//debugger;
			logmessage('shellRequest keepAwake inShell : ' + inShell);
			stopUpdateTimer();
			function exit(message,done) {
				logmessage('shellRequest keepAwake.exit inShell : ' + inShell);
			  inShell = 'exit-keepAwake';
				logmessage(message);
				if (done) {
					sleepDone = true;
				}
			}
			success = function() {
				exit('shellRequest success keepAwake');
			};
			fail = function(message) {
				exit('shellRequest failed keepAwake reason:' + message);
			};
			if (window.mdesignshell) {
				if (shellReady) {
					if ( !sleepDone) {
						logalert('loader.js..keepAwake');
						try {	
							logmessage('shellRequest call keepAwake');
							disable = window.plugins.sleep.Disable;
							if (disable !== undefined ){
								if (inShell !== 'keepAwake') {
									inShell = 'keepAwake';
									disable(success,fail);
								} else {
									exit('keepAwake shell already called',true);
								}
							} else {
								exit('shellRequest keepAwake: no Disable',true);
							}
						} catch (e) {
							exit('shellRequest error keepAwake: ' +e,true);
						}
					} else {
						exit('keepAwake shell done',false);
					}
				} else {
					exit('keepAwake shell not ready',false);
				}
			} else {
				exit('keepAwake no shell',true);
			}
		}

	
  function allowSleep(callback) {
		//debugger;
		logmessage('shellRequest allowSleep inShell : ' + inShell);
		logalert('loader.js..allowSleep');
		var timer;
		stopUpdateTimer();
		function complete(result) {
			try {
				if (callback !== undefined && callback.constructor === Function) {
					logmessage('callback to exit allowSleep');
					callback(result);
				} else {
					logmessage('invalid callback to exit allowSleep');
					showLaunchPage();
				}
			} catch (e) {
				showLaunchPage();
			}
		}
		function exit(message,state) {
			if (timer) {
				clearTimeout(timer); 
				timer = undefined;
			}
			logmessage('shellRequest allowSleep.exit inShell : ' + inShell);
		  inShell = 'exit-allowSleep';
			logmessage(message);
			sleepDone = true;
			complete(state);
		}
		function timeout() {
			exit('loader.js..allowSleep.timeout',false);
		}
		success = function() {
			exit('shellRequest success allowSleep',true);
		};
		fail = function(message) {
			exit('shellRequest failed allowSleep',false);
		};		
		try {
			if (window.mdesignshell) {
				logmessage('allowSleep');
				if (shellReady) {
					try {		
						logmessage('shellRequest call allowSleep');
						enable = window.plugins.sleep.Enable;
						if (enable !== undefined ){
							if (inShell != 'allowSleep') {
								inShell = 'allowSleep';
								timer = setTimeout(	timeout, 1000);
								enable(success,fail);
							} else {
								exit('shellRequest allowSleep: already done',false);
							}
						} else {
							exit('shellRequest allowSleep: no Enable',false);
						}
					} catch (e) {
						exit('shellRequest error allowSleep: ' +e,false);
					}
				} else {
					exit('shellRequest not ready allowSleep',false);
				}
			} else {
				exit('allowSleep no shell',false);
			}
		} catch (e) {
			exit('allowSleep error:' + e,false);
		}
	}
	function logshell(msg){
		try {
			if (phonegapReady && window.plugins && window.plugins.log) {
				log.debug(msg);
			} else {
                console.log(msg);
            }
		} catch (e) {
			if (console !== undefined){
				console.warn(msg);
			}
		}
	}
  function logmessage( msg) {
		logshell(msg);
	}
  function logerror( msg) {
		logshell(msg);
		//alert(msg);
	}
  function logalert( msg) {
		logshell(msg);
		//alert(msg);
	}

	function clearCacheOpTimeout() {
		if (cacheOpTimerId != -1) {
			clearTimeout(cacheOpTimerId);
			cacheOpTimerId = -1;
		}			
	}
	
	function resetCacheOpTimeout() {
		clearCacheOpTimeout();
		cacheOpTimerId = setTimeout(cacheOperationTimeout, cacheOpTimerInterval);				
	}

    function reportError() {
    	var message;
  
    	if (cache && cache.status == 0) {
    		message = 'The application cache operation encountered an error.\n\nYour applications have not been cached. If you proceed to run the application, they may not be available when you are offline.';    		
    	} else {
    		message = 'The application cache operation encountered an error.\n\nYour application cache has not been updated. If you proceed to run the application, they may not be available when you are offline.';      		
    	}

		message += '\n\nDo you wish to proceed?';
		
    	if (confirm(message)) {
    		showLaunchPage();
    	}	
	}
 
     function reportTimeout() {
    	var message;
  
    	if (cache && cache.status == 0) {
    		message = 'The application cache operation timed out.\n\nYour applications have not been cached. If you proceed to run the application, they may not be available when you are offline.';    		
    	} else {
    		message = 'The application cache operation timed out.\n\nYour application cache has not been updated. If you proceed to run the application, the updates may not be available when you are offline.';      		
    	}

		message += '\n\nDo you wish to proceed? (tap Cancel to continue waiting)';
		
    	if (confirm(message)) {
    		showLaunchPage();
    	}	
	}   
			
    function shouldLoad() {
		logalert('loader.js..shouldLoad');
		return window.locationUtils.getURI().hasQuery('option', 'load');
    }
	
	
    if(shouldLoad()) {
		logalert('loader.js..if_shouldLoad.load');
		logmessage('Loading');
		logmessage('loader.js..if_shouldLoad.load : cache status = ' + cache.status);
		function DOMReady(event) { 
			logalert('loader.js..if_shouldLoad.DOMReady');
			logmessage('loader.js..if_shouldLoad.DOMReady : cache status = ' + cache.status);
			function phonegapReady () {
				logmessage('loader.js..if_shouldLoad.phonegapReady : cache status = ' + cache.status);
			    phonegapReady = true;
                // A truthy value to let us know that phonegapready has been seen to fire on this device
                window.localStorage.phonegapPresent = true;
				shellReady = true;
				if (isBlackberry) {
					//this is a block of code for BB only
					setTimeout(	addListeners, 1000);
					logmessage("Timeout 1000 set");
					setTimeout(	addListeners, 100);
					logmessage("Timeout 100 set");
					setTimeout(	addListeners, 50);
					logmessage("Timeout 50 set");
					setTimeout(	addListeners, 0);
					logmessage("Timeout 0 set");
				}
			}
			
			function addListeners() {
				logmessage("Starting adding listeners...");
				logmessage('loader.js.if_shouldLoad.addListeners cache status = ' + cache.status);
				logalert('loader.js..if_shouldLoad.addListeners');
				if (cache) { 
					logmessage("Adding listeners... " + cache);
					cache.addEventListener('checking', checkingEventListener, false); 
					cache.addEventListener('downloading', downloadingEventListener, false); 
					cache.addEventListener('noupdate', noUpdateEventListener, false); 
					cache.addEventListener('updateready', updateReadyEventListener, false); 
					cache.addEventListener('progress', progressEventListener, false); 
					cache.addEventListener('cached', cachedEventListener, false); 
					cache.addEventListener('error', errorEventListener, false); 
					cache.addEventListener('obsolete', obsoleteEventListener, false); 
					logmessage("Finished adding listeners...");
					//if we haven't had any cache events for this time, something in the cache is broken
					logmessage('loader.js.if_shouldLoad.addListeners cache status = ' + cache.status);
					resetCacheOpTimeout();
				} else {
					logmessage("Cant add listeners - No cache set timeout:" + listenerTimeout);
					setTimeout(	addListeners, listenerTimeout);
					listenerTimeout = listenerTimeout / 2;
				}
		  }

			keepAwake();
			document.addEventListener("deviceready", phonegapReady, false);
			
			if (window.MCEX) {
      			window.MCEX.updateCache = updateCache;
      			window.MCEX.swapCache = swapCache;
      			window.MCEX.clearCache = clearCache;
      			window.MCEX.clearStorage = clearStorage;
      			window.MCEX.goToAppHome = goToAppHome;
			}

			if( (!isBlackberry) || (!window.mdesignshell) || navigator.platform == 'Win32' ) {			
				addListeners();			
			}
      
		}
		if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
			DOMReady();
    } else {
			addEventListener("DOMContentLoaded", DOMReady, false);		
		}
    } else {
		logmessage('Already Loaded');
        allowSleep(showLaunchPage);
    }
    // Navigate to app home after cache operation complete (unless showing diags)
	function showLaunchPage() {
	    checkPPAVersion();
		logmessage('loader.js.showLaunchPage cache status = ' + cache.status);
		logmessage('Switching to process launch page');
        window.location.href = 'launch/0/launch.html';
	} 
	// If a ppa version identifier is present, compare it to the stored version.
	// A mismatch means that we want to reprovision the processes when we hit launch.
    function checkPPAVersion() {
        var oldVersion = window.localStorage.ppaVersion,
            newVersion = window.MCEX.getPpaVersion();
        if (newVersion && newVersion !== oldVersion) {
            logmessage('new ppa version detected. clearing provisioned flag.');
            window.localStorage.ppaVersion = newVersion;
            window.localStorage.provisionedState = '';
        }
    }
    function stopUpdateTimer() {
		logalert('loader.js..stopUpdateTimer');
		if (updateTimer) {
			clearTimeout(updateTimer); 
			updateTimer = undefined;
		}
    }
   
    function cacheOperationComplete(e) {
					logmessage('loader.js.cacheOperationComplete cache status = ' + cache.status);
		logalert('loader.js..cacheOperationComplete');
		logmessage('cacheOperationComplete');
		loginfo(e);
        if(localStorage.showDiagnostics!="on") {
            // Inform the device that it can go back to sleep
	        allowSleep(showLaunchPage);
        } else {
			stopUpdateTimer();
			showLaunchPage();
        }
    }
   
    function cacheOperationError(e) {
    	function reportCacheError() {
    		if (cacheOpErrorCount++ == 0) {
    			reportError();
    		}
    	}  
		logmessage('loader.js.cacheOperationComplete cache status = ' + cache.status);
		logalert('loader.js..cacheOperationComplete');
		logmessage('cacheOperationComplete');
		loginfo(e);
        if(localStorage.showDiagnostics!="on") {
            // Inform the device that it can go back to sleep
	        allowSleep(reportCacheError);
        } else {
			stopUpdateTimer();
			reportCacheError();
        }
    }
    
    function cacheOperationTimeout() {
    	function reportCacheTimeout() {
    		if (cacheOpTimeoutCount++ == 0) {
    			reportTimeout();
    			cacheOpTimeoutCount = 0;
    		}
    	}
    	cacheOpTimerId = -1;
		stopUpdateTimer();
					logmessage('loader.js.cacheOperationTimeout cache status = ' + cache.status);
		logalert('loader.js..cacheOperationTimeout');
		logmessage('cacheOperationTimeout');
        if(localStorage.showDiagnostics!="on") {
            // Inform the device that it can go back to sleep
	        allowSleep(reportCacheTimeout);
        } else {
			stopUpdateTimer();
			reportCacheTimeout();
        }
    }
    
    // Button click handlers

    function clearCache() { 
        if (cache) { 
        } 
        return false; 
    } 

    function clearStorage() { 
		logalert('loader.js..clearStorage');
        localStorage.clear();         
        alert("Local storage cleared");
        return false; 
    } 

    function goToAppHome() {
		logmessage('goToAppHome');
        allowSleep(showLaunchPage);
    }
    
    function swapCache() { 
		logmessage('loader.js.swapCache cache status = ' + cache.status);
		logalert('loader.js..swapCache');
        if (cache) { 
            if (cache.status == 4) 
            { 
                cache.swapCache(); 
                updateStatus(); 
            } else { 
                alert("Cache cannot be swapped - no update available");
            } 
        } 
        return false; 
    } 

    function updateCache() { 
		logmessage('loader.js.updateCache cache status = ' + cache.status);
		logalert('loader.js..updateCache');
        if (cache.status != 0) {
						try {
							//cache.update(); 
						} catch (e) {
							alert('Cache update cannot be applied : Cache Error : ' + e);
						}
        }
        else {
            alert("Cache cannot be swapped - Not cached or cache operation in progess"); 
        } 
        return false; 
    } 

    // Progess indicator
    
	function setProgressComplete(pc) {
		logmessage('loader.js.setProgressComplete cache status = ' + cache.status);
		var el, width;
		if (pc < 0) pc = 0;
		if (pc > 100) pc = 100;
		el = getElement('progressBar');
		if (el) {
			if (el.tagName === 'PROGRESS') {
				el.value = pc;
			} else {
				width = '' + pc + '%';
				el = getElement('updateProgressComplete');
				if (el) {
					el.style.width = width;					
				}
			}			
		}
	}
  
    // Event handlers
    
    function loginfo(event)
    {
/* only use this for diagnostics				
		try {
			if (event) {
				var str = 'eventInfo: ';
				for (var key in event) {
					str += key+":"+event[key]+"\n";
				}
				logmessage(str); 
				logmessage('event: ' + event.toString());
			} else {
				logmessage('no additional info'); 
			}
		} catch (e) {
			logmessage('error: ' + e.toString());			
		}
*/
    }
    function cachedEventListener(e) 
    { 
		logmessage('loader.js.cachedEventListener cache status = ' + cache.status);
		logalert('loader.js..cachedEventListener');
		logmessage('cachedEventListener');
//		loginfo(e);
		clearCacheOpTimeout();
		var el = getElement('download-status');
		if (el) {
       		el.innerHTML = "Cached";				
		}
        updateStatus();
        cacheOperationComplete(e);
        return true; 
    } 

    function checkingEventListener(e) 
    { 
		logmessage('loader.js.checkingEventListener cache status = ' + cache.status);
		logalert('loader.js..checkingEventListener');
		logmessage('checkingEventListener');
		loginfo(e);
		resetCacheOpTimeout();
		var el = getElement('download-status');
		if (el) {
        	el.innerHTML = "Checking...";			
		}
        updateStatus(); 
        return true; 
    } 

    function downloadingEventListener(e) 
    { 	
		logmessage('loader.js.downloadingEventListener cache status = ' + cache.status);
		logmessage('downloadingEventListener');
		loginfo(e);
		resetCacheOpTimeout();
		var el = getElement('download-status');
		if (el) {
			el.innerHTML = "Downloading...";	
		}		      
     	updateStatus(); 
        return true; 
    } 

    function errorEventListener(e) 
    {   
		logmessage('loader.js.errorEventListener cache status = ' + cache.status);
		logalert('loader.js..errorEventListener');
		logmessage('errorEventListener');
//		loginfo(e);
		clearCacheOpTimeout();
		var el = getElement('download-status');
		if (el) {
			el.innerHTML = "Error occurred";	
		} 
        updateStatus(); 
		cacheOperationError(e);
        return true; 
    } 

    function obsoleteEventListener(e) 
    { 
		logmessage('loader.js.obsoleteEventListener cache status = ' + cache.status);
		logalert('loader.js..obsoleteEventListener');
		logmessage('obsoleteEventListener');
		loginfo(e);
		clearCacheOpTimeout();
		var el = getElement('download-status');	
		if (el) {
			el.innerHTML = "Cache obsolete";	
		}	 
        updateStatus(); 
        cacheOperationComplete(e);
        return true; 
    } 

    function noUpdateEventListener(e) 
    { 
		logmessage('loader.js.noUpdateEventListener cache status = ' + cache.status);
		logalert('loader.js..noUpdateEventListener');
		logmessage('noUpdateEventListener');
		loginfo(e);
		clearCacheOpTimeout();		
		var el = getElement('download-status');
		if (el) {
        	el.innerHTML = "Manifest not changed";			
		}
        updateStatus(); 
        cacheOperationComplete(e);
        return true; 
    } 

    function progressEventListener(e) 
    { 		
		logmessage('loader.js.progressEventListener cache status = ' + cache.status);
		logmessage('progressEventListener');
//		loginfo(e);
		resetCacheOpTimeout();
        downloadCount = downloadCount + 1;
        setProgressComplete(downloadCount * 100 / sessionStorage.fileCount);
        updateStatus();
        return true; 
    } 

    function updateReadyEventListener(e) 
    { ;	
		logmessage('loader.js.updateReadyEventListener cache status = ' + cache.status);
		logalert('loader.js..updateReadyEventListener');
		logmessage('updateReadyEventListener');
		loginfo(e);
		clearCacheOpTimeout();
		try {
			if (cache)
			{
				logalert('loader.js..updateReadyEventListener.swapCache');
				cache.swapCache();
				logalert('loader.js..updateReadyEventListener.swappedCache');
				updateStatus();
				cacheOperationComplete(e);
			}  else {
				logerror('updateReadyEventListener - no cache');
			}      
		}
		catch (e)
		{
			logmessage('Internal Error Updating Cache: ' + e.toString());
			alert('Internal Error Updating Cache: ' + e.toString());
			window.locationUtils.setHref('index.html');
		}
        return true; 
    } 
    function updateStatus() { 
    
					logmessage('loader.js.updateStatus cache status = ' + cache.status);
        keepAwake();
		var el = getElement('cache-status');   
		if (el) {
			el.innerHTML = cacheStatusStrings[cache.status];		
		}     
             
        el = getElement('download-status');     
        if(el && cache.status == 3) {    
            if(downloadCount == 1) {
                el.innerHTML = downloadCount + " file downloaded";
            } else {
                el.innerHTML = downloadCount + " files downloaded";
            }
        }
        
        el = getElement('online-status');
        if (el) {
        	el.innerHTML = navigator.onLine ? "ONLINE" : "OFFLINE";        	
        }

    }
	
	if( isAndroid ) {	
		// Backup/restore cookies 
		(function(){
			var cookies, c, C, i;
			
			cookies = {};
			
			if( document.cookie.length > 0 ) {
				c = document.cookie.split('; ');    

				for(i=c.length-1; i>=0; i--){
				   C = c[i].split('=');
				   cookies[C[0]] = C[1];
				}
			}

			if( localStorage.cookies ) {
				var oldCookies = JSON.parse(localStorage.cookies);
				for( name in oldCookies ) {
					if( cookies[name] === undefined ) {
						cookies[name] = oldCookies[name];
					}
				}
			}

			localStorage['cookies'] = JSON.stringify(cookies);

			for( name in cookies ) {
				exDate = new Date();
				exDate.setDate(exDate.getDate() + 6650);
				// console.log( "Setting cookie: " + name + "=" + cookies[name] + ";expires=" + exDate.toUTCString() + "; Path=/" );
				document.cookie = name + "=" + cookies[name] + ";expires=" + exDate.toUTCString() + "; Path=/";	
			}

		})();
	}
})(); 