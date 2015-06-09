(function($, mc) {

	mc.fl.zumoLogout = function(params)
	{
		function success()
		{
			mc.fl.pagehome();
		}
		
		function fail(e)
		{
			
		}
		
		if(plugins!=undefined)
		{
			if(plugins.authenticator!=undefined)
			{
				plugins.authenticator.clearZumoCredentials(success,fail);
			}
		}
	}
	
} (window.jmfw, window.mCapture));