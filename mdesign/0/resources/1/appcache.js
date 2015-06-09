ï»¿window.ctAppCache = (function (applicationCaches) {
    var active, caches = applicationCaches.filter(function (cache) { return !!cache; });
    function getActiveCache() {
        if (!active) {
            for (var i = 0; i < caches.length; i++) {
                if (caches[i].status !== 0) {
                    active = caches[i];
                }
            }
        }
        return active;
    }
    return {
        get status() {
            var activeCache = getActiveCache();
            return (activeCache && activeCache.status) || 0;
        },
        swapCache: function() {
            var activeCache = getActiveCache();
            return activeCache && activeCache.swapCache();
        },
        update: function() {
            var activeCache = getActiveCache();
            return activeCache && activeCache.update();
        },
        addEventListener: function(eventName, callback, useCapture) {
            caches.forEach(function (cache) {
                cache.addEventListener(eventName, callback, useCapture);
            });
        },
        removeEventListener: function(eventName, callback, useCapture) {
            caches.forEach(function (cache) {
                cache.removeEventListener(eventName, callback, useCapture);
            });
        }
    };
})([window.clientAppCache, window.bbApplicationCache, window.applicationCache]);