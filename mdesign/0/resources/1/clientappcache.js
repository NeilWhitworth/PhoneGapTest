var clientAppCache = (function() {
    var my = {},
        ready = false, 
        swapPending = false;
    
    my.status = 0;
    
    function fireEvent(eventName,data) {
        var event = document.createEvent('Event');
        event.initEvent('appcache-' + eventName, true, true);
        event.data = data;
		window.document.dispatchEvent(event);
    }
    
    function doSwap() {
        swapPending = false;
        window.plugins.provisioner.swapCache();
    }
    
    function onDeviceReady() {
        ready = true;
        if (swapPending) {
            doSwap();
        }
    }
    
    my.swapCache = function() {
        if (ready) {
            doSwap();
        } else {
            swapPending = true;
        }
    };
    
    my.setStatus = function(status) {
		console.log("cache: "+status);
        my.status = status;
    };
 
    my.setCached = function() {	
        fireEvent('cached');
    };
    
    my.setChecking = function() {		
        my.setStatus(2);
        fireEvent('checking');		
    };
    
    my.setDownloading = function() {		
		my.setStatus(3);
        fireEvent('downloading');
    };
    
    my.setError = function() {		
        fireEvent('error');
    };
    
    my.setNoUpdate = function() {	
        my.setStatus(1);	
        fireEvent('noupdate');
    };
    
    my.setObsolete = function() {
        my.setStatus(5);
        fireEvent('obsolete');
    };

    my.setProgress = function(detail) {
        fireEvent('progress', detail);
    };
    
    my.setUpdateReady = function() {
        my.setStatus(4);
        fireEvent('updateready');
    };
    
    my.addEventListener = function(eventName, callback, useCapture) {
        window.document.addEventListener('appcache-'+eventName, callback, useCapture);
    };
    
    my.removeEventListener = function(eventName, callback, useCapture) {
        window.document.removeEventListener('appcache-'+eventName, callback, useCapture);
    };
    
    document.addEventListener('deviceready', onDeviceReady, false);
        
    return my;
}());

window.clientAppCache = clientAppCache;