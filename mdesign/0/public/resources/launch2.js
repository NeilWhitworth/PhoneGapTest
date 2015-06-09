(function() {

	if (window.MCAPTURE_ProvisioningAborted) {
		return;
	}

	var cache = window.ctAppCache;

	if (logdebug === undefined) {
		var logdebug = function(msg) {
			if (typeof(log) !== 'undefined') {
				log.debug(msg);
			} else {
				console.info(msg);
			}
		};
	}
		
	if (logmessage === undefined) {
		var logmessage = function(msg) {
			if (typeof(log) !== 'undefined') {
				log.debug(msg);
			} else {
				console.info(msg);
			}
		};
	}
		
	if (logerror === undefined) {
		var logerror = function(msg) {
			if (typeof(log) !== 'undefined') {
				log.error(msg);
			} else {
				console.error(msg);
			}
			alert(msg);
		};
	}

	function loginfo(event) { 
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

	function cachedEventListener(e) {
		logmessage('Update Cache Cached Event:');
		loginfo(e);
	}

	function checkingEventListener(e) {
		logmessage('Update Cache Checking Event:');
		loginfo(e);
	}

	function downloadingEventListener(e) {
		logmessage('Update Cache Downloading Event:');
		loginfo(e);
	}

	function errorEventListener(e) {
		logmessage('Update Cache Error Event:');
		loginfo(e);
	}

	function obsoleteEventListener(e) {
		logmessage('Update Cache Obsolete Event:');
		loginfo(e);
	}

	function noUpdateEventListener(e) {
		logmessage('Update Cache NoUpdate Event:');
		loginfo(e);
	}

	function progressEventListener(e) {
		logmessage('Update Cache Progress Event:');
		loginfo(e);
	}

	function updateReadyEventListener(e) {
		logmessage('Update Cache Ready Event:');
		loginfo(e);
		function reload() {
			function done(URL) {
				log.debug('On our way home to ' + URL);
			}

			logmessage('Update Cache Ready Reload');
			window.MCAPTURE_Provisioning_Processes = true;
			if (typeof(mCapture) !== 'undefined') {
				logmessage('Calling mCapture.fl.gotoprovisioningurl');
				mCapture.fl.gotoprovisioningurl(done);
			} else {
				logmessage('Changing location to ../../index.html');
				window.locationUtils.setHref('../../index.html');
			}
		}
		try {
			logmessage('Update Cache Event: Status = ' + cache.status);
			if (cache.status == 4) {
				cache.swapCache();
				loginfo('Update Cache Event: Swapped - Status = ' + cache.status);
				//althought this seems to work, it doesnt seem to be necessary because the cache
				//seems to get swapped on page change
				//Although that is true for multi subject proceses, there is a problem with single subject processes
				//So if we see the swap we need to reload
				mCapture.fl.msgboxasync(reload,'New process versions have been downloaded, the application will now be reloaded');
				return;
			}
		} catch (e) {
			logmessage('Update Cache Event Swap: Error = ' + e.toString());
			//alert('Error the application will now be reloaded');
			mCapture.fl.msgboxasync(reload,'New process versions have been downloaded but could not be activated, the application will now be reloaded');
			return;
		}
	}

	// Set a flag which indicates to all processes that this is a test environment

	var isTesting = MCAPTURE_CFG.isTesting;

	window.localStorage.setItem('isTesting', isTesting === 'yes' ? 'yes' : 'no');

	//Set msuite username
	//Swap cache if update ready

	var user = mCapture.db.getUserInfo();
	if (user.mSuiteUserName === "" && MCAPTURE_CFG.mSuiteUserName !== "") {
		user.mSuiteUserName = MCAPTURE_CFG.mSuiteUserName;
		user.mSuiteSerialNo = MCAPTURE_CFG.mcId;
		user.mSuiteGroupId = MCAPTURE_CFG.mSuiteGroupId;
		user.mSuiteGroupName = MCAPTURE_CFG.mSuiteGroupName;
		mCapture.db.setUserInfo(user);
	}

	if (cache) {
		cache.addEventListener('checking', checkingEventListener, false); 
		cache.addEventListener('downloading', downloadingEventListener, false); 
		cache.addEventListener('noupdate', noUpdateEventListener, false); 
		cache.addEventListener('updateready', updateReadyEventListener, false); 
		cache.addEventListener('progress', progressEventListener, false); 
		cache.addEventListener('cached', cachedEventListener, false); 
		cache.addEventListener('error', errorEventListener, false); 
		cache.addEventListener('obsolete', obsoleteEventListener, false); 
	
		updateReadyEventListener();
	} else {
		logmessage('Load Launch Page : No Cache');
	}
})();
