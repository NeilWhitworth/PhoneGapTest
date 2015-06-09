var MCEX = (function() {
	var my = {      		
	};
	var deviceClient = "";
	var deviceType = "";
	var fileCount = 0;
	
	function afterLoad() {
		function onDontShow() {
			localStorage.setItem("bookmarkStatus", "set");
			goToLoader();
		}

		var e = document.getElementById('header');
		e.innerText = 'Loading for : ' + getDeviceType();

		e = document.getElementById('app-home-button');
		e.addEventListener('click', onDontShow, false);

		if (!isBookmarkSet()) {
			page = document.getElementById('addBookmark');
			page.setAttribute('style', 'display:block;');
			page = document.getElementById('normal');
			page.setAttribute('style', 'display:none;');
		}

		if (isBookmarkSet()) {
			goToLoader();
		}
	}
	function getDeviceClient() {
		return deviceClient;     		
	}
	function getDeviceType() {
		return deviceType;     		
	}
	function getFileCount() {
		return fileCount;
	}
	function goToLoader() {
		var targetPage = 'loader.html?option=load';
		var current = window.locationUtils.getHref();
		if (current.indexOf('/') > -1) {
			current = current.substring(0, current.lastIndexOf('/') + 1);
			window.locationUtils.setParentHref(current + targetPage);
		} 			   		
	}
	function init() {
		try {
			sessionStorage.fileCount = fileCount;
		} catch( e ) {
			sessionStorage.removeItem("fileCount");
			sessionStorage.fileCount = fileCount;
		}

		if (isUnrestricted()) {
			localStorage.setItem("bookmarkStatus", "set");
		}
	}
	function isBookmarkSet() {
		var bookmarkStatus = localStorage.getItem("bookmarkStatus");
		return bookmarkStatus == "set"; 			
	}
	function isUnrestricted() {
		return deviceClient == 'unrestricted';			
	}
	function setDeviceClient(cli) {
		deviceClient = cli;
	}
	function setDeviceType(dev) {
		deviceType = dev;
	}
	function setFileCount(n) {
		fileCount = n;
	}
	my.afterLoad = afterLoad;
	my.getDeviceClient = getDeviceClient;
	my.getDeviceType = getDeviceType;
	my.getFileCount = getFileCount;
	my.goToLoader = goToLoader; 
	my.init = init;
	my.isBookmarkSet = isBookmarkSet;
	my.isUnrestricted = isUnrestricted; 
	my.setDeviceClient = setDeviceClient;
	my.setDeviceType = setDeviceType;
	my.setFileCount = setFileCount;
	return my;
}());
