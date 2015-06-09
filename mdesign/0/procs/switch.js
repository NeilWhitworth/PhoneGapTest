
	var deviceType = 'Android'.toLowerCase();
	var deviceFormat = 'standard';
	var cordovaVersion = parseInt('3040000', 10);
	var resourceVersion = '1';
	var directory, filename;
	var deviceDirectory = deviceType;
	if (deviceType == 'windows' || cordovaVersion < 3000000) {
		directory = 'devices';
		filename = 'device.js';
	} else {
		directory = 'cordova';
		filename = 'cordova.js';
	}
	if (deviceType == 'windows') {
		deviceDirectory = 'iphone-vis';
	}
  if (deviceType == 'wp' && deviceFormat == 'tablet') {
    deviceDirectory = 'windows8';
  }
  
    var path = '$1/cordova.js';
    var this_url = window.locationUtils.getURI().path().replace(/\/?(.*)/, '/$1');
    var jsfile = this_url.replace(/(.*)\/mdesign\/.+/i, path);
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = jsfile;
    head.appendChild(script);
  