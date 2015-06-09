function setStatus(msg) {
	function append(s1,s2) {
		return (s1 == "") ? s2 : s1 + "\r" + s2;
	}

	var el = document.getElementById('log');
	var old = el.innerText;

	document.getElementById('log').innerText = append(old, msg);
}

function onClear() {
	setStatus('into onClear()');
	var uri = window.locationUtils.getURI();
	if (uri.hasQuery('clearType', 'none') || uri.hasQuery('clearType', 'guid')) {
	Cleanser.disableClearCookies();
	Cleanser.disableClearLocalStorage();
	Cleanser.disableClearWebSql();
	Cleanser.disableClearIndexedDB();
	Cleanser.disableClearFileSystem();
}

	if (uri.hasQuery('clearType', 'test')) {
		Cleanser.includeLocalStorageKey('lastManifestGuid');
	}

	if (uri.hasQuery('clearType', 'guid')) {
		localStorage.removeItem('lastManifestGuid');
	}

	var applicationID = window.localStorage['applicationID'];
	if (checkPhoneGapBuild() && applicationID) {
		Cleanser.setApplicationID(applicationID);
	} else {
		Cleanser.disableClearFileSystem();
	}

	Cleanser.setStatus = setStatus;
	Cleanser.oncompleted = function() {
		setStatus('All cleared!');
		localStorage.searchString = '?' + uri.query();	
		var href;
		if (checkPhoneGapBuild()) {
			href = '../../../index.html';
		} else if (window.locationUtils.isPPA()) {
			href = 'loader.html?' + uri.query();
		} else {
			href = 'provision.html?' + uri.query();
		}
		window.locationUtils.setHref(href);
	};
	Cleanser.clear();  
}

function checkPhoneGapBuild() {
	// will be true if this page has been modified by the PPA Zip Creator.
	return !!window.isPhoneGapBuild; 
}

function onDocumentLoaded() {
	if (false) {
	var el = document.getElementById('idForDebug');
	el.setAttribute('style', 'display:block');
	} else {
		onClear();
	}
}
