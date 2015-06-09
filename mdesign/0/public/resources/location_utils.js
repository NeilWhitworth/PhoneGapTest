ï»¿(function() {
    /* URI is defined in URI.js */
    var _uri;
    
    function getHref() {
        return _uri.toString();
    }
    
    function getURI() {
        return _uri.clone();
    }
    
    function setHref(href) {
        setURI(URI(href));
    }
    
    function setParentHref(href) {
        setParentURI(URI(href));
    }
    
    function setURI(uri) {
        if (shouldRewrite()) {
            uri = queryToFragment(uri);
        }
        window.location.href = uri.toString();
    }
    
    function setParentURI(uri) {
        if (shouldRewrite()) {
            uri = queryToFragment(uri);
        }
        window.parent.location.href = uri.toString();
    }
    
    function isPPA() {
        switch (_uri.scheme()) {
            case 'http':
            case 'https':
                return false;
            default:
                return true;
        }
    }
        
    function shouldRewrite() {
      return isPPA() && navigator.userAgent.match(/Windows Phone/i);
    }
    
    function fragmentToQuery(uri) {
        var fragment = uri.fragment();
        var q = fragment.indexOf('?');
        var newFragment = (q >= 0) ? fragment.substr(0, q) : fragment;
        var newQuery = (q >= 0) ? fragment.substr(q) : '';
        return uri.clone()
            .fragment(newFragment)
            .query(newQuery);
    }
    
    function queryToFragment(uri) {
        var fragment = uri.fragment();
		    var query = uri.query();
		    if (query) {
			    fragment = fragment + '?' + uri.query();
		    }
        return uri.clone()
            .fragment(fragment)
            .query('');
    }
        
    _uri = URI();
    if (shouldRewrite()) {
        _uri = fragmentToQuery(_uri);
        window.location.hash = _uri.fragment();
    }
    
    window.locationUtils = {
        isPPA: isPPA,
        getHref: getHref,
        setHref : setHref,
        getURI: getURI,
        setURI: setURI,
        setParentHref: setParentHref,
        setParentURI: setParentURI
    };
    
})();