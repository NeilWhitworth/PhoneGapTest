(function($, mc) {

	var clearBusyTicker;
	var lastActivity;
	
	function clearBusyClass(e)
	{
		try
		{
			var busyThreshold = 5000;
		
			if(e!=undefined)
			{
				if(e.direction=='in')
				{
					$('.busyMask').removeClass('busy');
				}		
			}
			
			var currentTime = new Date();

			if(currentTime>lastActivity+busyThreshold)
			{
				$('.busyMask').removeClass('busy');
			}
		}
		catch(error)
		{
		}
	}
	
	mc.fl.showBusy = function(args)
	{
		lastActivity = new Date();
			
		clearBusyTicker = setInterval(function(){clearBusyClass()}, interval);

		$(".busyMask").addClass("busy");		
	}
	
	mc.fl.hideBusy = function(args)
	{
		$('.busyMask').removeClass('busy');
	}
	
	mc.fl.forceActivityUntil = function(args)
	{
		try
		{
			var interval = args[0];
			var targetPage = args[1];
			
			lastActivity = new Date();
			
			$(".busyMask").addClass("busy");
			
		}
		catch(error)
		{
		}
	}
	
	mc.fl.createBusyPage = function(args)
	{
		var busyDiv = document.createElement('div');
		busyDiv.className = 'busyMask';
		busyDiv.appendChild(document.createElement('div'));
		$('body')[0].appendChild(busyDiv);
	}
	
	mc.fl.dateFromString = function(args)
	{
		return new Date(args[0]);
	}
	
	mc.fl.testingInBrowser = function()
	{
		try
		{
			//Do something that is only available in the shell
			if(cordova.exec==undefined)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		catch(err)
		{
			return true;
		}
	}

	mc.fl.canSendDirectData = function()
	{
		try
		{
			//Do something that is only available in the shell
			if(cordova.exec==undefined)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		catch(err)
		{
			return false;
		}
	}
	
	mc.fl.sortArray = function(params)
	{
		//params[0] - array to be sorted
		//params[1] - key to sort
		//params[2] - sortDescending
		
		params[0].sort(function(a,b){
			return a[params[1]]-b[params[1]]})
		if(params[3])
		{
			params[0].reverse();
		}
		return params[0];
	}
	
	mc.fl.scrollToItem = function(params)
	{
		//params[0] = pageId
		//params[1] = itemSelector
		//params[2] = animationDuration
		var pageId = params[0];
		
		var scroller = $('#' + pageId + ' .jmuiScroller');
		
		if(scroller.length==0)
		{
			scroller = $('#' + pageId + ' .jmuiNativeScroller');
		}
		
		if(scroller.length==0)
		{
			return;
		}
		else
		{
			if($(params[1])!=undefined)
			{
				var scrollingDiv = scroller.find('div:first-child')[0];
				if($(params[1]).length>0)
				{
				
					var itemOffset = $(params[1])[0].offsetTop;
					itemOffset = itemOffset * -1;
					if(itemOffset<-160)
					{
						itemOffset=itemOffset+160;
					}
			
					if(params[2])
					{
						scrollingDiv.style.webkitTransitionDuration = params[2] + 'ms';
					}
				
					scrollingDiv.style.webkitTransform = 'translate3d(0px, ' + itemOffset + 'px, 0)';
				
					if(params[2])
					{
						setTimeout(function(){scrollingDiv.style.webkitTransitionDuration = '0ms';}, params[2]);
					}
				}
			}
		}
	}
	
	mc.fl.disableButton = function(params)
	{
		var element = $(params[0]);
		element[0].disabled = true;
	}

	mc.fl.JSONObjectsArray = function(args)
	{
		try
		{
			var obj = JSON.parse(args[0]);
			var arr = [];
			for (var key in obj) {
			  if (obj.hasOwnProperty(key)) {
				arr.push(obj[key].id);
			  }
			}
			return arr;
		}
		catch(e)
		{
			return undefined;
		}
	}

	mc.fl.JSONParse = function(args)
	{
		try
		{
			return JSON.parse(args[0]);
		}
		catch(e)
		{
			return undefined;
		}
	}
	
	mc.fl.setPopUpPageTitleBarText = function(args) {
        var pageId = args[0];
		var title = args[1];
		var headerTitle;
        headerTitle = $('#' + pageId + ' .jmuiHeader h1');
        if (headerTitle) {
            headerTitle.item(0).html(title);
        }
    }
	
	mc.fl.GetDeviceInfo = function(params) {

       // Perform Synchonous processing here - remember that this should not be a "blocking" function
       var results = new Array();
       
       var deviceId;
       var deviceName;
       var processVersion;
       
       var userInfo = mCapture.db.getUserInfo();
       /*AUTO_GENERATE-ExportDate*/ var ExportDate = "08/03/2013";

       results.push(userInfo.mSuiteSerialNo);        // mSuite Serial Number
       results.push(userInfo.mSuiteUserName);        // mSuite User Name
       results.push(mCapture.db.getCurrentProcess().version);    // version of current process
       
       results.push(navigator.platform);            // Browser platform ID

       // Get information from PhoneGap, if it's there
       if (typeof device !== "undefined")
       {
           results.push(device.name);                // Phone name
           results.push(device.model);                // Phone model
           results.push(device.platform);            // Phone platform
           results.push(device.uuid);                // Phone UUID
           results.push(device.version);            // Phone Version
       }
       else
       {
           results.push("n/a");                // Phone name
           results.push("n/a");                // Phone model
           results.push("n/a");                // Phone platform
           results.push("n/a");                // Phone UUID
           results.push("n/a");                // Phone Version
       }
       
       results.push(ExportDate);                // Process Export Date

       // Return the result to mDesign script
       return results;

   }

	mc.fl.customgetobjectvalue = function(args)
	{
		var object = args[0];
		var attribute = args[1];
		
		var value = object[attribute];
		if(value==undefined)
		{
			value = '';
		}
		return value;
	}
	
	mc.fl.setEnvironmentObject = function(args)
	{
		var name = args[0];
		var value = JSON.stringify(args[1]);
		try {
            localStorage.setItem(name, value);
        } catch (e) {
            if (e.code === 22) { // QUOTA_EXCEEDED_ERR - iPad bug workaround
                localStorage.removeItem(name);
                localStorage.setItem(name, value);
            }
        }
	}
	
	mc.fl.getEnvironmentObject = function(args)
	{
		var value = localStorage.getItem(args[0]) || '';
		if(value=='')
			return '';
		else
			return JSON.parse(value);
	}
	
	mc.fl.clearAllClassesExcept = function(args)
	{
		try
		{
			var className = args[1] == undefined ? "" : args[1];
			$(args[0])[0].className = className;
		}
		catch(error)
		{
		}
	}
	
	mc.fl.addClass = function(args)
	{
		try
		{
			$(args[0]).addClass(args[1]);
		}
		catch(error)
		{
		}
	}
	
	mc.fl.removeClass = function(args)
	{
		try
		{
			$(args[0]).removeClass(args[1]);
		}
		catch(error)
		{
		}
	}
	
	mc.fl.toggleClass = function(args)
	{
		try
		{
			$(args[0]).each(function()
			{
				if($(this).hasClass(args[1]))
				{
					$(this).removeClass(args[1]);
				}
				else
				{
					$(this).addClass(args[1]);
				}
			})
		}
		catch(error)
		{
		}
	}
	
	mc.fl.updateUIText = function(args)
	{
		//arg 0 is the DOM element you want to target e.g execjssync("updateUIText",".element", "newTextValue");
		try
		{
			$(args[0])[0].innerText = args[1];
		}
		catch(error)
		{
		}
	}
	
	mc.fl.updateUIHTML = function(args)
	{
		//arg 0 is the DOM element you want to target e.g execjssync("updateUIHTML",".element", "newInnerHTMLValue");
		
		try
		{
			$(args[0])[0].innerHTML = args[1];
		}
		catch(error)
		{
		}
	}
	
	mc.fl.addEventHandler = function(args)
	{
		function calculateCallback()
		{
			
		}
		try
		{
			$(args[0]).bind(args[1],function(){mCapture.fl.calculate({resume:calculateCallback},args[2]);});
		}
		catch(error)
		{
		}
	}	
	
	mc.fl.round = function(args){
		var num = args[0];
		var decimals = args[1];
		
		return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
	}
	
	// in mDesign Script, Call using:
	// execjssync("SetJsonItem", "ItemName", ItemValue);
	//
	mc.fl.SetJsonItem = function(params) {		
		
		return mc.db.setJsonItem(params[0], params[1]);;		
	};

	// in mDesign Script, Call using:
	// ItemValue := execjssync("GetJsonItem", "ItemName", "Stringify");
	//
	mc.fl.GetJsonItem = function(params) {		
		if (params.length > 1)
		{
			if (params[1].toLowerCase() === "stringify")
			{
				return JSON.stringify(mc.db.getJsonItem(params[0]));
			}
		}
		return mc.db.getJsonItem(params[0]);;		
	};

	// in mDesign Script, Call using:
	// ItemValue := execjssync("Stringify", JsonObjectToStringify );
	//
	mc.fl.Stringify = function(params) {
		return JSON.stringify(params[0]);
	};

	// in mDesign Script, Call using:
	// newGuid := execjssync("NewGuid");
	//
	mc.fl.NewGuid = function() {		
		
		return mc.db.guid();;			
	}
	
	// boolResult := execjssync("processExists", "processID");
	//
	// Return TRUE if given process ID exists 
	mc.fl.processExists = function(args)
	{
		var processId = args[0];
		var processVersions = mc.db.getProcessVersions(processId);
		
		return (processVersions.length > 0);
	}

	// From, mDesign, type:
	// 		execjssync("syncCalcParams", "mdesignvar:1,mdesignvar2:2");
	// 
	// From, JavaScript, type:
	// 			mCapture.fl.syncCalcParams("newColTap",["varX:CantStart"])
	//	
	//		This gives us the ability to inject an mDesign Data formula with a lot of variables.
	//		These variables are injected into environment variables which can be used
	//		by the formula.
	//
	//		Especially useful if you want to grab things out of the DOM at run time
	//		and post them into mDesign - outside of the standard functionality.
	//
	// NOTE: This is a fire-and-forget call - you can't look at the result.
	
	mc.fl.syncCalcParams = function(formulaName, params)
	{
		function thisCallback(r) 
		{
			mc.hideActivity();
		}
		mc.showActivity();
		
		var keypairs = params[0].split(",");
		for(i=0;i<keypairs.length;i++){
			var parts = keypairs[i].split(":");
			mc.fl.setenvironment(parts[0], parts[1]);
		}
		mc.fl.calculate({ "resume": thisCallback} , formulaName);
		event.stopPropagation();
	}
	
	// From, mDesign, type:
	// 		result := execjsasync("asyncCalcParams", "formulaName", "mdesignvar:1,mdesignvar2:2");	
	// 
	//		This gives us the ability to inject an mDesign Data formula with a lot of variables.
	//		These variables are injected into environment variables which can be used
	//		by the formula.
	//
	//		Especially useful if you want to grab things out of the DOM at run time
	//		and post them into mDesign - outside of the standard functionality.
	
	mc.fl.asyncCalcParams = function(callback, formulaName, params)
	{
		function thisCallback(r) 
		{
			mc.hideActivity();
			callback.resume(r);
		}
		mc.showActivity();
		
		var keypairs = params[0].split(",");
		for(i=0;i<keypairs.length;i++){
			var parts = keypairs[i].split(":");
			mc.fl.setenvironment(parts[0], parts[1]);
		}
		mc.fl.calculate({ "resume": thisCallback} , formulaName);
		event.stopPropagation();
	}
	
	// From, mDesign, type:
	// 		result := execjsasync("asyncExecFormula", "formulaName", [param1, param2...]);	
	// 
	//		This gives us the ability to inject an mDesign Data formula with a lot of variables.
	//		These variables are injected into environment variables which can be used
	//		by the formula.
	//
	//		Especially useful if you want to grab things out of the DOM at run time
	//		and post them into mDesign - outside of the standard functionality.
	
	mc.fl.asyncExecFormula = function(callback, params)
	{
        var name, formula, i, formulaParams;
		
        function complete(result) 
		{
			mc.hideActivity();
            callback.resume(result);
        }
		
		name = params[0];
		
        if (name && mc.fl[name] !== undefined && mc.fl[name].constructor === Function) 
		{
                mc.showActivity();
                formula = window.make_formula(mc.fl[name]);
                formulaParams = [complete, complete];
                for (i = 1; i < params.length; i += 1) {
                    formulaParams.push(params[i]);
                }
                formula.execute.apply(formula, formulaParams);
        }
		else
		{
            callback.resume("NOT FOUND");
		}
	}
	
	
	mc.fl.generateListChoices = function(args)
	{
		var staticChoices = args[0];
		var objectArrayString = args[1];
		var value = args[2];
		var label = args[3];
		
		var choices = staticChoices;
		var objectArray = [];
		try
		{
		
			objectArray = JSON.parse(objectArrayString);
		
		}
		catch(e)
		{
		}
		
		for(var choice=0;choice<objectArray.length;choice++)
		{
			listChoice = {};
			include = false;	
			if(args.length > 4)
			{
				include = true;
				for(var iFilter=4;iFilter<args.length;iFilter=iFilter+2)
				{
					if(objectArray[choice][args[iFilter]] != args[iFilter + 1])
					{
						include = false;
					}
				}
			}
			else
			{
				include = true;
			}
			
			if(include)
			{				
				listChoice.value = objectArray[choice][value];
				listChoice.label = objectArray[choice][label];
				choices.push(listChoice);
			}
		}
		
		return choices;
	}
	
	mc.fl.populateChoices = function(args)
	{
			function calculateCallback()
			{
			}
			
			function selectionMade(e)
			{
				if(!loading)
				{
					var newSelection;
					newSelection = e.srcElement.value;
					mCapture.fl.setdata(selectControlName,newSelection,0);
					mCapture.fl.calculate({resume:calculateCallback}, selectedFormula);
				}
			}
			
			var loading = true;
			
			var selectControlPage = args[0];
			var selectControlName = args[1];
			var choices = args[2];
			var value = args[3];
			var label = args[4];
			var selectedFormula = args[5];
			
			var myProcess = mCapture.db.getCurrentProcess();
			var q = myProcess.questions[selectControlName];
			
			q.choices = [];
			
			if(choices.length>1)
			{
				var  i, n;
				n = choices.length;
				
				for (i = 0; i < n; i += 1) {
					q.choices.push({label:choices[i][label],value:choices[i][value]});
				}
				
				var selectedChoice = q.choices[0][value];
				mCapture.fl.setdata(selectControlName,selectedChoice,0);
			
				$("#" + selectControlPage + selectControlName).show();
				$("#" + selectControlPage + selectControlName).bind('change',function(e){selectionMade(e);});
			
			}
			else
			{
				$("#" + selectControlPage + selectControlName).hide();
			}
			
			mc.fl.refreshquestion(selectControlName);
		
			loading = false;
		
			return [true]; 
	}
	
	function ready() 
	{
		
		$('.jmuiPage').bind('jmuiPageAnimationEnd',clearBusyClass);

		var interval = 10000;
		clearBusyTicker = setInterval(function(){clearBusyClass();}, interval);
	}
	
	$(document).bind('mcready', ready);
	
} (window.jmfw, window.mCapture));