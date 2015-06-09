(function($, mc) {

	var trackerTicker;
	
	mc.fl.getAuthenticatedUserName = function(callback, args)
	{
		if(window.plugins.settings!=undefined)
		{
			window.plugins.settings.getUsername(function(username) {
				log.debug('Got username:' + username);
				mc.initnotifications(username);
				log.debug('callback : ' + username);
				if (callback) {
					if (callback.resume) {
						callback.resume(username);
					} else {
						callback(username);
					}
				} else {
					log.debug("authenticated user found");
				}
			});
		}
		else
		{
			if (callback) {
				if (callback.resume) {
					callback.resume(undefined);
				} else {
					callback(undefined);
				}
			} else {
				log.debug("authenticated user not found");
			}
		}
	}
	
	function filterArray(array,key,value) {
	  return array.filter(
		  function(array){return array[key] == value}
	  );
	}

	mc.fl.filterArray = function(args)
	{
		var array = args[0];
		var key = args[1];
		var value = args[2];
		
		return filterArray(array,key,value);
	}
	
	mc.fl.dataType = function(args)
	{
		if(args[0]==undefined) return "";
		if(args[0].constructor==Object) return "Object";
		if(args[0].constructor==String) return "String";
		return "";
	}
	
	mc.fl.startTracker = function(args)
	{
		var interval = args[0];
		var eventType = args[1];
		var vehicleId = args[2];
		var routeId = args[3];
		
		trackerTicker = setInterval(function(){sendLocationEvent()}, args[0]);

		function sendLocationEvent() {
			
			var eventObject = mc.fl.createEventObject(['Event',eventType,vehicleId,routeId,false]);
			
			var name, formula, i, formulaParams;
		
			function complete(result) 
			{
				//do nothing
			}
			
			name = "action_MSG_send_message";
			
			if (name && mc.fl[name] !== undefined && mc.fl[name].constructor === Function) 
			{
					formula = window.make_formula(mc.fl[name]);
					formulaParams = [complete, complete];
					
					formulaParams.push('event');
					formulaParams.push(eventObject);
					
					formula.execute.apply(formula, formulaParams);
			}
		}
		
	}
	
	mc.fl.stopTracker = function(args)
	{
		clearInterval(trackerTicker);
	}
	
	mc.fl.initialiseRouteResults = function(args)
	{
		var routeResults = {};
		
		var authObject = args[0];
		var authenticatedUserId = args[1];
		var routeData = args[2];
		
		routeResults.RouteId = authObject.routeId;
		var TimeStamp = new Date();
		routeResults.InitialisationTime = TimeStamp.toISOString();
		
		var role;
		routeResults.Crew = {};
		
		routeResults.Crew.Driver = {};
		routeResults.Crew.Driver.Id = authObject.driverId;
		routeResults.Crew.Driver.Role = "Driver";
		routeResults.Crew.Driver.Status = "Pending";
		routeResults.Crew.Driver.LoginTime = "";
		
		routeResults.Crew.Mate = {};
		routeResults.Crew.Mate.Id = authObject.mateId;
		routeResults.Crew.Mate.Role = "Drivers Mate";
		routeResults.Crew.Mate.Status = "Pending";
		routeResults.Crew.Mate.LoginTime = "";
		
		var loginTime;
		try
		{
			loginTime = new Date(authObject.loginTime);
		}
		catch(err)
		{
			loginTime = new Date();
		}
		
		if(authObject.driverId==authenticatedUserId)
		{
			routeResults.Crew.Driver.LoginTime = loginTime.toISOString();
			routeResults.Crew.Driver.Status = "Logged In";
		}
		
		if(authObject.mateId==authenticatedUserId)
		{
			routeResults.Crew.Mate.LoginTime = loginTime.toISOString();
			routeResults.Crew.Mate.Status = "Logged In";
		}
		
		routeResults.VehicleChecks = {};
		routeResults.VehicleChecks.Results = [];
		routeResults.LoadValidation = {};
		routeResults.StartRoute = {};
		
		routeResults.Drops = [];
		
		var dropCount = routeData.Items.length;
		
		for(iDrop = 0; iDrop < dropCount; iDrop++)
		{
			var drop = routeData.Items[iDrop];
			routeResults.Drops[iDrop] = {};
			routeResults.Drops[iDrop].DropId = drop.ManifestItemId;
			routeResults.Drops[iDrop].Type = drop.ActionTypeId;
			if(drop.Cancelled)
			{
				routeResults.Drops[iDrop].Status = "Cancelled";
			}
			else
			{
				routeResults.Drops[iDrop].Status = "";
			}
			routeResults.Drops[iDrop].UPIList = [];
			try
			{
				for(var iUPI=0;iUPI<drop.DeliveryUPIList.length;iUPI++)
				{
					var upiResult = {};
					upiResult.UPIResultId = mc.db.guid();
					upiResult.Identifier = drop.DeliveryUPIList[iUPI].Identifier;
					upiResult.Status = "";
					routeResults.Drops[iDrop].UPIList.push(upiResult);
				}
			}
			catch(error)
			{
				alert(error);
			}
			routeResults.Drops[iDrop].Audit = [];
			routeResults.Drops[iDrop].Telephone = [];
			routeResults.Drops[iDrop].SMS = [];
			routeResults.Drops[iDrop].Photos = [];
			routeResults.Drops[iDrop].TelephoneStatus = "";
			routeResults.Drops[iDrop].Notes = "";
		}
		
		routeResults.DropCount = dropCount;
		
		routeResults.StartRoute = {};
		
		routeResults.Notes = [];
		routeResults.Photos = [];
		routeResults.TelephoneCalls = [];
		routeResults.EventAudit = [];
		
		routeResults.EndRoute = {};
		
		return routeResults;
	}
	
	mc.fl.confirmStartRoute = function(args)
	{
		var confirmedStartRouteId = args[0];
		var routeResults = mCapture.fl.currentsubjectobject().routeResults;
		if(routeResults.StartRoute!=undefined)
		{
			if(routeResults.StartRoute.StartRouteId==confirmedStartRouteId)
			{
				routeResults.StartRoute.Status = "Confirmed";
			}
		}
	}
	
	mc.fl.confirmEndRoute = function(args)
	{
		var confirmedEndRouteId = args[0];
		var routeResults = mCapture.fl.currentsubjectobject().routeResults;
		if(routeResults.EndRoute!=undefined)
		{
			if(routeResults.EndRoute.EndRouteId==confirmedEndRouteId)
			{
				routeResults.EndRoute.Status = "Confirmed";
			}
		}
	}
	
	mc.fl.confirmDrop = function(args)
	{
		var confirmedDropId = args[0];
		
		var routeResults = mCapture.fl.currentsubjectobject().routeResults;
		
		var Drop = mCapture.fl.findInArray([routeResults.Drops, "DropId", confirmedDropId])
		
		if(Drop!=undefined)
		{
			if(routeResults.Drops[Drop.index].DropId==confirmedDropId)
			{
				 mCapture.fl.currentsubjectobject().routeResults.Drops[Drop.index].Status = "Confirmed";
			}
		}
	}
	
	mc.fl.confirmImage = function(args)
	{
		
		function findImageByImageId(imageId)
		{
			var imageObject = {};
			var routeResults = mCapture.fl.currentsubjectobject().routeResults;
			
			var routeImage = mCapture.fl.findInArray([routeResults.Photos,"ImageId",imageId]);
			if(routeImage!=undefined)
			{
				imageObject.Level = "Route";
				imageObject.ImageId = imageId;
				imageObject.ImageIndex = routeImage.index;
				return imageObject;
			}
			
			if(routeResults.Drops!=undefined)
			{
				for(var iDrop=0;iDrop<routeResults.Drops.length;iDrop++)
				{
					var Drop = routeResults.Drops[iDrop];
					var dropImage = mCapture.fl.findInArray([Drop.Photos,"ImageId",imageId]);
					
					if(dropImage!=undefined)
					{
						imageObject.Level = "Drop";
						imageObject.ImageId = imageId;
						imageObject.ImageIndex = dropImage.index;
						imageObject.DropId = Drop.DropId;
						imageObject.DropIndex = iDrop;
						
						return imageObject;
					}	
					
					for(var iUPI=0;iUPI<Drop.UPIList.length;iUPI++)
					{
						var UPI = Drop.UPIList[iUPI];
						if(UPI.Photos!=undefined)
						{
							var UPIImage = mCapture.fl.findInArray([UPI.Photos,"ImageId",imageId]);
							if(UPIImage!=undefined)
							{
								imageObject.Level = "UPI";
								imageObject.ImageId = imageId;
								imageObject.ImageIndex = UPIImage.index;
								imageObject.DropId = Drop.DropId;
								imageObject.DropIndex = iDrop;
								imageObject.UPI = UPI.Identifier;
								imageObject.UPIIndex = iUPI;
								return imageObject;
							}
						}
					}			
				}
			}
		}
		
		var confirmedImageObject = findImageByImageId(args[0]);
		
		if(confirmedImageObject.Level=="Route")
		{
			if(mCapture.fl.currentsubjectobject().routeResults.Photos[confirmedImageObject.ImageIndex].ImageId==confirmedImageObject.ImageId)
			{
				mCapture.fl.currentsubjectobject().routeResults.Photos[confirmedImageObject.ImageIndex].Status = "Confirmed";
			}
		}
		
		if(confirmedImageObject.Level=="Drop")
		{
			if(mCapture.fl.currentsubjectobject().routeResults.Drops[confirmedImageObject.DropIndex].Photos[confirmedImageObject.ImageIndex].ImageId==confirmedImageObject.ImageId)
			{
				mCapture.fl.currentsubjectobject().routeResults.Drops[confirmedImageObject.DropIndex].Photos[confirmedImageObject.ImageIndex].Status = "Confirmed";
			}
		}
		
		if(confirmedImageObject.Level=="UPI")
		{
			if(mCapture.fl.currentsubjectobject().routeResults.Drops[confirmedImageObject.DropIndex].UPIList[confirmedImageObject.UPIIndex].Photos[confirmedImageObject.ImageIndex].ImageId==confirmedImageObject.ImageId)
			{
				mCapture.fl.currentsubjectobject().routeResults.Drops[confirmedImageObject.DropIndex].UPIList[confirmedImageObject.UPIIndex].Photos[confirmedImageObject.ImageIndex].Status = "Confirmed";
			}
		}
		
	}
	
	mc.fl.markDrop = function(args)
	{
		try
		{
			var selectedDropId = args[0];
			var dropType = args[1];
			var event = args[2];
			
			var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
			var selectedDropId = args[0];
			var dropResults = currentResultsObject.Drops;
			
			var itemResults = mc.fl.findInArray([currentResultsObject,'DropId',selectedDropId]);
			
			if(itemResults==undefined)
			{
				return false;
			}
			var itemIndex = itemResults.index;
			
			itemResults.Type = dropType;
			
			if(itemResults.Audit==undefined)
			{
				itemResults.Audit = {};
			}
			
			var auditObject = {};
			
			auditObject.Event = event;
			var TimeStampDT = new Date;
			auditObject.TimeStamp = TimeStampDT.toISOString();
			var location = mc.db.getCachedPosition();
			if(location!=undefined)
			{
				auditObject.Latitude = location.coords.latitude;
				auditObject.Longitude = location.coords.longitude;
			}
			
			itemResults.Audit.push(auditObject);
			
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemIndex] = itemResults;
			
			mCapture.fl.setdata('routeResults',mCapture.fl.currentsubjectobject().routeResults);
			
		}
		catch(error)
		{
			alert(error);
			return undefined;
		}
	
	}
	
	mc.fl.saveDropNotes = function(args)
	{
		//selectedDropId = args[0];
		//dropNotes = args[1];
		try
		{
			var selectedDropId = args[0];
			var dropNotes = args[1];

			var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
			var dropResults = currentResultsObject.Drops;
			
			var itemResults = mc.fl.findInArray([dropResults,'DropId',selectedDropId]);
			
			if(itemResults==undefined)
			{
				return false;
			}
			var itemIndex = itemResults.index;
			
			itemResults.Notes = dropNotes;
			
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemIndex] = itemResults;
			
			mCapture.fl.setdata('routeResults',mCapture.fl.currentsubjectobject().routeResults);
			
			return true;
		}
		catch(error)
		{
			alert(error);
			return false;
		}
	
	}
	
	mc.fl.startRoute = function(args)
	{
		//args[0] - routeId
		var routeId = args[0];
		var extra = args[1];
		
		var TimeStampDT = new Date;
		
		var StartRouteObject = {};
		StartRouteObject.StartRouteId = mc.db.guid();
		StartRouteObject.RouteId = routeId;
		StartRouteObject.TimeStamp = TimeStampDT.toISOString();
		var location = mc.db.getCachedPosition();
		if(location!=undefined)
		{
			StartRouteObject.Latitude = location.coords.latitude;
			StartRouteObject.Longitude = location.coords.longitude;
		}
		
		mCapture.fl.currentsubjectobject().routeResults.StartRoute = StartRouteObject;
		StartRouteObject.VehicleCheck = mCapture.fl.currentsubjectobject().routeResults.VehicleChecks;
		StartRouteObject.CrewValidation = mCapture.fl.currentsubjectobject().routeResults.Crew;
		StartRouteObject.Photos = mCapture.fl.currentsubjectobject().routeResults.Photos;
		StartRouteObject.PhoneCalls = mCapture.fl.currentsubjectobject().routeResults.TelephoneCalls;
		
		if(extra!=undefined)
		{
			for (var prop in extra) {
				if(extra.hasOwnProperty(prop)){
						StartRouteObject[prop] = extra[prop];
				}
			}
		}
		//mark photos and calls as sent
		return StartRouteObject;
	}
	
	mc.fl.dropComplete = function(args)
	{
		//args[0] -DropId
		//args[1] -RouteId
		//args[2] - Extras - Object
		var dropId = args[0];
		var routeId = args[1];
		
		var dropResults = mCapture.fl.findInArray([mCapture.fl.currentsubjectobject().routeResults.Drops,"DropId",dropId]);
		
		
		if(dropResults!=undefined)
		{
			var upiList = [];
			if(dropResults.UPIList!=undefined)
			{
				for(var iUPI=0;iUPI<dropResults.UPIList.length;iUPI++)
				{
					if(dropResults.UPIList[iUPI].UPIResultId!=undefined)
					{
						upiList.push(dropResults.UPIList[iUPI]);
					}
				}
				dropResults.UPIList = upiList;
			}
		}
		
		var TimeStampDT = new Date;
		
		dropResults.RouteId = routeId;
		dropResults.DropTimeStamp = TimeStampDT.toISOString();
		var location = mc.db.getCachedPosition();
		if(location!=undefined)
		{
			dropResults.DropLocationLatitude = location.coords.latitude;
			dropResults.DropLocationLongitude = location.coords.longitude;
		}
		
		var extra = args[2];
		if(extra!=undefined)
		{
			for (var prop in extra) {
				if(extra.hasOwnProperty(prop)){
						dropResults[prop] = extra[prop];
				}
			}
		}
		
		return dropResults;
	}
	
	mc.fl.endRoute = function(args)
	{
		var routeId = args[0];
		var extra = args[1];
		
		var TimeStampDT = new Date;
		
		var endRouteObject = {};
		endRouteObject.RouteId = routeId;
		endRouteObject.TimeStamp = TimeStampDT.toISOString();
		var location = mc.db.getCachedPosition();
		if(location!=undefined)
		{
			endRouteObject.Latitude = location.coords.latitude;
			endRouteObject.Longitude = location.coords.longitude;
		}
		
		if(extra!=undefined)
		{
			for (var prop in extra) {
				if(extra.hasOwnProperty(prop)){
						endRouteObject[prop] = extra[prop];
				}
			}
		}
		
		mCapture.fl.currentsubjectobject().routeResults.EndRoute = endRouteObject;
		
		return endRouteObject;
		
	}
	
	mc.fl.generateRouteImageList = function(args)
	{
		var photos = mCapture.fl.currentsubjectobject().routeResults.Photos;
		
		var unsentPhotos = mc.fl.filterArray([photos,"Status",""]);
		
		for(var iPhoto=0;iPhoto<photos.length;iPhoto++)
		{
			mCapture.fl.currentsubjectobject().routeResults.Photos[iPhoto].Status = "Sent";
		}
		
		return unsentPhotos;
	}
	
	mc.fl.generateDropImageList = function(args)
	{
		//args[0] - Selected DropId
		//args[1] - messageType
		
		var selectedDropId = args[0];
		var imageList = [];
		var drops = mCapture.fl.currentsubjectobject().routeResults.Drops;
		var drop = mCapture.fl.findInArray([drops,"DropId",selectedDropId]);
		
		var dropPhotos = drop.Photos;
		
		if(dropPhotos!=undefined)
		{
			for(var iImage=0;iImage<dropPhotos.length;iImage++)
			{
				var photoObject = dropPhotos[iImage];
				photoObject.messageType = args[1];
				imageList.push(photoObject);
			}
		}
		
		var upiList = drop.UPIList;
		for(var iUPI = 0;iUPI<upiList.length;iUPI++)
		{
			var UPIPhotos = upiList[iUPI].Photos;
			
			if(UPIPhotos!=undefined)
			{
				for(var iImage=0;iImage<UPIPhotos.length;iImage++)
				{
					var photoObject = UPIPhotos[iImage];
					photoObject.messageType = args[1];
					imageList.push(photoObject);
				}
			}
		}
		
		return imageList;
	}
	
	mc.fl.isDeviceDataReconciled = function(args)
	{
	
		
		function resultsStatus()
		{
			var resultSummaryObject = {};
			var routeResults = mCapture.fl.currentsubjectobject().routeResults;
			
			resultSummaryObject.Reconciled = true;
			
			resultSummaryObject.StartRoute = routeResults.StartRoute.Status;
			resultSummaryObject.RoutePhotos = "";
			
			if(resultSummaryObject.StartRoute=="Sent")
			{
				resultSummaryObject.Reconciled = false;
			}
			
			var imageCount = 0;
			var imageComplete = 0;
			
			imageCount = routeResults.Photos.length;
			imageComplete = 0;
			if(imageCount>0)
			{
				for(var iRouteImage=0;iRouteImage<routeResults.Photos.length;iRouteImage++)
				{
						if(routeResults.Photos[iRouteImage].Status=="Confirmed")
						{
							imageComplete++;
						}
				}
			}
			if(imageCount==imageComplete)
			{
				resultSummaryObject.RoutePhotos	= "Complete";
			}
			else
			{
				resultSummaryObject.RoutePhotos	= imageComplete.toString() + '/' + imageCount.toString();
				resultSummaryObject.Reconciled = false;
			}
			
			resultSummaryObject.Drops = [];
			
			if(routeResults.Drops!=undefined)
			{
				for(var iDrop=0;iDrop<routeResults.Drops.length;iDrop++)
				{
					var Drop = routeResults.Drops[iDrop];
					
					var DropResults = {};
					DropResults.DropId = routeResults.Drops[iDrop].DropId;
					DropResults.Status = routeResults.Drops[iDrop].Status;
					DropResults.DropPhotos = "";

					if(DropResults.Status=="Sent")
					{
						resultSummaryObject.Reconciled = false;
					}
					
					imageCount = Drop.Photos.length;
					imageComplete = 0;
					
					if(imageCount>0)
					{
						for(var iDropImage=0;iDropImage<Drop.Photos.length;iDropImage++)
						{
								if(Drop.Photos[iDropImage].Status=="Confirmed")
								{
									imageComplete++;
								}
						}
					}
					
					for(var iUPI=0;iUPI<Drop.UPIList.length;iUPI++)
					{
						var UPI = Drop.UPIList[iUPI];
						if(UPI.Photos!=undefined)
						{
							var UPIImageCount = UPI.Photos.length;
							
							imageCount=imageCount+UPIImageCount;
							
							if(UPIImageCount>0)
							{
								for(var iUPIImage=0;iUPIImage<UPI.Photos.length;iUPIImage++)
								{
										if(UPI.Photos[iUPIImage].Status=="Confirmed")
										{
											imageComplete++;
										}
								}
							}
						}
					}

					if(imageCount==imageComplete)
					{
						DropResults.DropPhotos	= "Complete";
					}
					else
					{
						DropResults.DropPhotos	= imageComplete.toString() + '/' + imageCount.toString();
						resultSummaryObject.Reconciled = false;
					}
					
					resultSummaryObject.Drops.push(DropResults);
					
				}
			}
			
			resultSummaryObject.EndRoute = routeResults.EndRoute.Status;
			
			if(resultSummaryObject.EndRoute=="Sent")
			{
				resultSummaryObject.Reconciled = false;
			}
			
			return resultSummaryObject;
			
		}
			
		try
		{
			var resultsStatus = resultsStatus();
			return resultsStatus;
		}
		catch(error)
		{
			var resultSummaryObject = {};
			resultSummaryObject.Error = error;
			resultSummaryObject.Reconciled = false;
			return resultSummaryObject;
		}
	
	}
	
	mc.fl.createEventObject = function(args)
	{
		//args[0] - messageType
		//args[1] - Type (Event Type) - Numeric - ODS 1-10 ; CT Audit 101+
		//args[2] - vehicleId
		//args[3] - routeId
		//args[4] - audit
		
		var eventObject = {};
		eventObject.EventId = mc.db.guid();
		eventObject.messageType = args[0];
		eventObject.Type = args[1];
		eventObject.VehicleId = args[2];
		eventObject.RouteId = args[3];
		var TimeStampDT = new Date;
		eventObject.TimeStamp = TimeStampDT.toISOString();
		var location = mc.db.getCachedPosition();
		if(location!=undefined)
		{
			eventObject.Latitude = location.coords.latitude;
			eventObject.Longitude = location.coords.longitude;
		}
		
		var audit = args[4]==undefined?false:args[4];
		if(audit)
		{
			mCapture.fl.currentsubjectobject().routeResults.EventAudit.push(eventObject);
		}
		
		return eventObject;
	}
	
	mc.fl.updateManifestItem = function(args)
	{
		//args[0] = Selected Drop/Manifest Item Id - String
		//args[1] = Selected Drop/Manifest Item - Object
		//args[2] = Final Status of Manifest Item - String
		//args[3] = Updates to the Manifest Item - Object
		
		
		//args[0] = data("selectedDropId");
		//args[1] = getobjectvalue(currentsubjectobject(),"selectedDrop")
		//args[2] = "Complete"
		//args[3] = results
		
		
		
		try
		{
			var selectedDropId = args[0];
			var selectedDrop = args[1];
			var status = args[2];
			var results = args[3];

			var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
			var dropResults = currentResultsObject.Drops;
			
			var itemResults = mc.fl.findInArray([dropResults,'DropId',selectedDropId]);
			
			if(itemResults==undefined)
			{
				return false;
			}
			
			var itemIndex = itemResults.index;
			
			itemResults.Status = status;
			
			for (var attribute in results) 
			{
			  if (results.hasOwnProperty(attribute)) {
				itemResults[attribute] = result[attribute];
			  }
			}
			
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemIndex] = itemResults;
			
			/*
			if(status=='Failed') //Fail all UPI's
			{
					var selectedDropObject = mCapture.fl.currentsubjectobject().selectedDrop;
					selectedDropObject.
			}
			*/
			
			return mCapture.fl.currentsubjectobject().routeResults;
		}
		catch(error)
		{
			alert(error);
			return undefined;
		}
	}
	
	mc.fl.isDriverLoggedIn = function(args)
	{
		try
		{
			var authObject = mCapture.fl.currentsubjectobject().authenticationObject;
			var CrewResults = mCapture.fl.currentsubjectobject().routeResults.Crew;
			
			if(CrewResults.Driver!=undefined)
			{
				return CrewResults.Driver.Status.toLowerCase()=='logged in';
			}
			else
			{
				return false;
			}
			
			return false;
		}
		catch(error)
		{
			return false;
		}
		
	}
	
	mc.fl.validateCrewMember = function(args)
	{
		//args[0] - authenticationObject
		//args[1] - userId
		//args[2] - password
		//args[3] - scanned (optional)
		
		//Assume we are only passing in non-logged in Crew
		try
		{
			var authObject = args[0];
			var userId = args[1];
			var password = args[2];
			var scanned = args[3];
			var TimeStamp = new Date();
			var loginDateTime = TimeStamp.toISOString();
			
			if(authObject.driverId==userId)
			{
				if(authObject.driverPassword==password||scanned)
				{
					if(mCapture.fl.currentsubjectobject().routeResults.Crew.Driver.Status != "Logged In")
					{
						mCapture.fl.currentsubjectobject().routeResults.Crew.Driver.Status = "Logged In";
						mCapture.fl.currentsubjectobject().routeResults.Crew.Driver.LoginTime = loginDateTime;
						mCapture.fl.setdata("routeResults",mCapture.fl.currentsubjectobject().routeResults);
					}
					return true;
				}
			}
			
			if(authObject.mateId==userId)
			{
				if(authObject.matePassword==password||scanned)
				{
					if(mCapture.fl.currentsubjectobject().routeResults.Crew.Mate.Status != "Logged In")
					{
						mCapture.fl.currentsubjectobject().routeResults.Crew.Mate.Status = "Logged In";
						mCapture.fl.currentsubjectobject().routeResults.Crew.Mate.LoginTime = loginDateTime;
						mCapture.fl.setdata("routeResults",mCapture.fl.currentsubjectobject().routeResults);
					}
					return true;
				}
			}
			
			return false;
		}
		catch(error)
		{
			return false;
		}
		
	
	}

	var scanCompleteFunction;
	var scanFailFunction;
	
	function scanComplete(e)
	{
		try
		{
			var name, formula, i, formulaParams;
			
			function complete(result) 
			{
				mc.hideActivity();
			}
	
			name = scanCompleteFunction;
	
			if (name && mc.fl[name] !== undefined && mc.fl[name].constructor === Function) 
			{
					mc.showActivity();
					formula = window.make_formula(mc.fl[name]);
					formulaParams = [complete, complete];
					formulaParams.push(e);
					formula.execute.apply(formula, formulaParams);
			}						
		}
		catch(err)
		{
			alert(err);
		}
	}
	
	function scanError(error)
	{
		
	}

	function scannerStarted(e)
	{
		
	}
	
	function scannerFailed(e)
	{
		
	}
	
	mc.fl.startExternalScan = function(args)
	{
		if(plugins!=undefined)
		{
			if(plugins.dataWedge!=undefined)
			{
				plugins.dataWedge.scan(scannerStarted,scannerFailed);
			}
		}		
	}
	
	mc.fl.removeExternalScanListeners = function(args)
	{
		plugins.dataWedge.cancelAllListeners(function(){}, function(){});	
	}

	mc.fl.addScannerListener = function(args)
	{
		//args[0] is currentPage();
		//args[1] is scanComplete Function
		//args[2] is scanFail Function
		
		var page = $('#' + args[0]);
		scanCompleteFunction = args[1];
		scanFailFunction = args[2];
		
		if(plugins!=undefined)
		{
			if(plugins.dataWedge!=undefined)
			{
				plugins.dataWedge.listen(scanComplete,scanError);
			}
		}
		
		page.unbind('jmuiPageAnimationStart');
		
		page.bind('jmuiPageAnimationStart', function(e){
			if(e.direction=='out')
			{
				plugins.dataWedge.cancelAllListeners(function(){}, function(){});
			}
		});

	}

	mc.fl.findInArray = function(args)
	{
		//args[0] - array
		//args[1] - key
		//args[2] - value
		//args[3] - force Case
		
		try
		{
			var arrayOfObjects = args[0];
			var key = args[1];
			var value = args[2];
			
			var forceCase = false;
			if(args[3]!=undefined)
			{
				forceCase=args[3];
			}
			
			for(var i = 0; i < arrayOfObjects.length; i++)
			{
				var _item = arrayOfObjects[i];
				var arrayItemValue = _item[key];
				if(arrayItemValue!=undefined&&arrayItemValue.constructor == String&&!forceCase)
				{
					arrayItemValue = arrayItemValue.toLowerCase();
					value = value.toLowerCase();
				}
				if(arrayItemValue==value)
				{
					_item.index = i;
					return _item;
				}
			}
			
			return undefined;
		}
		catch(error)
		{
			return undefined;
		}
	}
	
	mc.fl.searchUPIFromBarcode = function(args)
	{		
		//barcode value - args[0]
		try
		{
			var barcodeValue = args[0];
			var manifest = mCapture.fl.currentsubjectobject().manifestData;
			var manifestItems = manifest.Items;
			for(var iItem=0;iItem<manifestItems.length;iItem++)
			{
				var manifestItem = manifestItems[iItem];
				var upiList = manifestItem.DeliveryUPIList;
				for(var iUPI=0;iUPI<upiList.length;iUPI++)
				{
					var UPI = upiList[iUPI];
					if(UPI.Identifier.toLowerCase()==barcodeValue.toLowerCase())
					{
						var LoadValidationResult = {}
						LoadValidationResult.scannedUPI = UPI.Identifier;
						var TimeStampDT = new Date;
						LoadValidationResult.TimeStamp = TimeStampDT.toISOString();
						var location = mc.db.getCachedPosition();
						if(location!=undefined)
						{
							LoadValidationResult.Latitude = location.coords.latitude;
							LoadValidationResult.Longitude = location.coords.longitude;
						}
						
						mCapture.fl.currentsubjectobject().routeResults.LoadValidation = LoadValidationResult;
						mCapture.fl.setdata("routeResults",mCapture.fl.currentsubjectobject().routeResults);
						return true;
					}
				}
			}
			
			return undefined;
		}
		catch(err)
		{
			return undefined;
		}
	}
	
	mc.fl.updateUPIAsScanned = function(args)
	{
		/*
		upi = args[0]
		arg[1] - routeData
		arg[2] - routeResults
		arg[3] - selectedDrop
		
		return true/false if this is the first scan for the drop
		*/
		
		var scannedUpi = args[0].Identifier;	
		var selectedDropId = args[0].DropId;
		
		var manifest = mCapture.fl.currentsubjectobject().manifestData;
		var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;

		var manifestItems = manifest.Items;
		var dropResults = currentResultsObject.Drops;
		
		var selectedItem = mc.fl.findInArray([manifestItems,'ManifestItemId',selectedDropId]);
		var itemResults = mc.fl.findInArray([dropResults,'DropId',selectedDropId]);
		
		if(!itemResults||!selectedItem)
		{
			return false;
		}

		var resultItemIndex = itemResults.index;
		var selectedItemIndex = selectedItem.index;
	
		var manifestItemUPIList = selectedItem.DeliveryUPIList;
		
		var firstScan = true;
		
		for(var _upi = 0; _upi < manifestItemUPIList.length; _upi++)
		{
			var upi = manifestItemUPIList[_upi];
			
			if(upi.Identifier==scannedUpi)
			{
				if(itemResults.UPIList==undefined)
				{
					itemResults.UPIList = [];
				}
				
				upiResult = mc.fl.findInArray([itemResults.UPIList,"Identifier",scannedUpi]);
				
				if(upiResult==undefined)
				{
					upiResult = {};
					upiResult.UPIResultId = mc.db.guid();
					upiResult.Identifier = scannedUpi;
				}
				
				if(upiResult.UPIResultId==undefined)
				{
					upiResult.UPIResultId = mc.db.guid();
				}
				
				if(upiResult.Status=="Scanned")
				{
					firstScan = false;
				}
				else
				{
					upiResult.Status = "Scanned";
					if(upiResult.Scan==undefined)
					{
						upiResult.Scan = {};
						upiResult.Scan.ScanResultId = mc.db.guid();
					}
					var TimeStampDT = new Date;
					upiResult.Scan.TimeStamp = TimeStampDT.toISOString();
					var location = mc.db.getCachedPosition();
					if(location!=undefined)
					{
						upiResult.Scan.Latitude = location.coords.latitude;
						upiResult.Scan.Longitude = location.coords.longitude;
					}
					var upiResultIndex = upiResult.index;
					if(upiResultIndex==undefined)
					{
						mCapture.fl.currentsubjectobject().routeResults.Drops[resultItemIndex].UPIList.push(upiResult);
					}
					else
					{
						mCapture.fl.currentsubjectobject().routeResults.Drops[resultItemIndex].UPIList[upiResultIndex] = upiResult;
					}
					
				}
			}
		}
		
		mCapture.fl.setdata("routeResults",mCapture.fl.currentsubjectobject().routeResults);
		
		$('tr.upiRow[upi="' + scannedUpi + '"]').attr('upistatus',"Scanned");
		
		return firstScan;
	}
	
	mc.fl.unlinkDrops = function(args)
	{
		//args[0] = selectedDropId
		var selectedDropId = args[0];
		
		var manifest = mCapture.fl.currentsubjectobject().manifestData;
		var manifestItems = manifest.Items;
		
		var linkedDrops = filterArray(manifestItems,'linkId',selectedDropId);
		for(var iLinkedDrop=0;iLinkedDrop<linkedDrops.length;iLinkedDrop++)
		{
			var linkedDrop = mc.fl.findInArray([manifestItems,'ManifestItemId',linkedDrops[iLinkedDrop].ManifestItemId]);
			if(linkedDrop!=undefined)
			{
				mCapture.fl.currentsubjectobject().manifestData.Items[linkedDrop.index].unlinked = true;
			}
			else
			{
				alert('There is an error here');
			}
		}
	}
	
	////////*********UPDATED TO HERE************//////////
	mc.fl.generateCurrentManifest = function(args)
	{
		var manifest = [];
			
		var manifestData = mCapture.fl.currentsubjectobject().manifestData;
		var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
		
		var staticData = mCapture.fl.currentsubjectobject().staticData;
		var standardServiceCodes = staticData.StandardServiceCodes;
		
		var staticDataClients = staticData.Clients;
		
		var manifestItems = manifestData.Items;

		var dropResults = currentResultsObject.Drops;
		
		var updateDisplayPosition = false;
		
		var summaryCounters = {};
		summaryCounters.deliveries = 0;
		summaryCounters.collections = 0;
		summaryCounters.specialinstructions = 0;
		summaryCounters.specialservices = 0;
		
		for(var _itm = 0; _itm < manifestItems.length; _itm++)
		{
			var dropServices = [];
		
			var drop = manifestItems[_itm];
			
			var itemResult = mc.fl.findInArray([currentResultsObject.Drops,'DropId',drop.ManifestItemId]);
			
			var linkedDrops = filterArray(manifestItems,'DropSequence',drop.DropSequence);
			
			if(drop.ActionTypeId=="Delivery")
			{
				linkedDrops = filterArray(linkedDrops, "ActionTypeId","Delivery");
				summaryCounters.deliveries++;
			}
			else if(drop.ActionTypeId=="Return")
			{
				linkedDrops = filterArray(linkedDrops, "ActionTypeId","Return");
				summaryCounters.collections++;
			}
			
			if(linkedDrops.length>1)
			{
				if(drop.unlinked==undefined)
				{
					var linkId = drop.ManifestItemId;
					drop.unlinked=false;
					drop.linkId=linkId;
					
					for(var iLinkedItem=0;iLinkedItem<linkedDrops.length;iLinkedItem++)
					{
						var linkedDrop = mc.fl.findInArray([manifestItems,'ManifestItemId',linkedDrops[iLinkedItem].ManifestItemId]);
						if(linkedDrop!=undefined)
						{
							manifestItems[linkedDrop.index].unlinked=false;
							manifestItems[linkedDrop.index].linkId=linkId;
						}
					}
				}
			}
			
			if(itemResult!=undefined)
			{
				drop.status = itemResult.Status;
				drop.telephoneStatus = itemResult.TelephoneStatus;
			}
			
			if(drop.displayPosition==undefined)
			{
				if(linkedDrops.length==1)
				{
					updateDisplayPosition = true;
				}
			}
			
			var iServiceCount=0;
			var iSpecialServiceCount=0;
			var iSpecialInstructionsCount=0;
			var serviceAlert = false;
			
			drop.DeliveryUPIList.sort(function(a, b){
			 return a.Identifier-b.Identifier
			})
			
			for(var _upi=0;_upi<drop.DeliveryUPIList.length;_upi++)
			{
				var upi = drop.DeliveryUPIList[_upi];
				
				if(upi.SpecialInstructions.trim().length>0)
				{
					iSpecialInstructionsCount++;
				}
				
				iServiceCount=iServiceCount + upi.ServiceIdList.length;
				for(var iService = 0;iService<upi.ServiceIdList.length;iService++)
				{
					dropServices.push(upi.ServiceIdList[iService]);
					
					if(mCapture.fl.findInArray([standardServiceCodes,"ServiceCode",upi.ServiceIdList[iService]])==undefined)
					{
						serviceAlert = true;
					}
				}
			}
			
			drop.servicesCount = iServiceCount;
			drop.specialInstructionsCount = iSpecialInstructionsCount;
			drop.specialInstructionsAlert = iSpecialInstructionsCount > 0;
			drop.serviceAlert = serviceAlert;
		
			if(serviceAlert)
			{
				summaryCounters.specialservices++;
			}
			
			if(drop.specialInstructionsAlert)
			{
				summaryCounters.specialinstructions++;
			}
		
			var clientObject = {};
			clientObject.name = "";
			clientObject.image = "";
			
			if(staticDataClients!=undefined)
			{
				var staticDataObjectClient = mc.fl.findInArray([staticDataClients,'ClientName',drop.ClientName]);
				
				if(staticDataObjectClient!=undefined)
				{
					if(staticDataObjectClient.ClientName!=undefined)
					{
						clientObject.name = staticDataObjectClient.ClientDescription;
					}
					if(staticDataObjectClient.ClientImage!=undefined)
					{
						clientObject.image = staticDataObjectClient.ClientImage;
					}
				}
			}
			
			drop.client = clientObject;
			
			for(var iStandardService=0;iStandardService<standardServiceCodes.length;iStandardService++)
			{
				var standardServiceCode = standardServiceCodes[iStandardService];
				if(dropServices.indexOf(standardServiceCode.ServiceCode)==-1)
				{
					//masterUPI = UPIList[0] - assume adding missing services to Master UPI only
					if(drop.DeliveryUPIList[0].ServiceIdList==undefined)
					{
						drop.DeliveryUPIList[0].ServiceIdList = [];
					}
					
					var acceptableAlternativeFound = false;
					for(var iDropService=0;iDropService<dropServices.length;iDropService++)
					{
						if(standardServiceCode.AcceptableAlternative.indexOf(dropServices[iDropService])>-1)
						{
							acceptableAlternativeFound = true;
						}
					}
					
					if(!acceptableAlternativeFound)
					{
						dropServices.push(standardServiceCode.ServiceCode);
						drop.DeliveryUPIList[0].ServiceIdList.push(standardServiceCode.ServiceCode);
					}
				}	
			}
			
			if(drop.ActionTypeId=="Return"||drop.ActionTypeId=="Delivery")
			{
				var slotStart = "";
				var slotEnd = "";
				var timeSlotString = "";
				
				try
				{
					slotStart = drop.DiarySlotStart.toLocaleTimeString();
					slotEnd = drop.DiarySlotEnd.toLocaleTimeString();
					timeSlotString = slotStart.substring(0,5).trim() + '-' + slotEnd.substring(0,5).trim();
				}
				catch(error)
				{
				}
				
				drop.timeSlot = timeSlotString;
				if(drop.linkId==undefined||drop.linkId==drop.ManifestItemId||drop.unlinked==true)
				{
					manifest.push(drop);
				}
			}
			
		}
		
	
		if(updateDisplayPosition)
		{
			manifest.sort(function(a, b){
			 return a.DropSequence-b.DropSequence
			})
			
			for(var _i = 0;_i < manifest.length;_i++)
			{
				manifest[_i].displayPosition = _i
				var item  = mc.fl.findInArray([mCapture.fl.currentsubjectobject().manifestData.Items,'ManifestItemId',manifest[_i].ManifestItemId]);
				mCapture.fl.currentsubjectobject().manifestData.Items[item.index].displayPosition = _i;
			}
		}
		else
		{
			manifest.sort(function(a, b){
			 return a.displayPosition-b.displayPosition
			})
		}
		
		var currentFound = false;
		var currentDropSequence = 1;
		for(var iDrop=0;iDrop<manifest.length;iDrop++)
		{
			if((manifest[iDrop].status==""&&!currentFound)||(currentFound&&manifest[iDrop].status==""&&manifest[iDrop].DropSequence==currentDropSequence))
			{
				manifest[iDrop].status="Current";
				currentDropSequence = manifest[iDrop].DropSequence;
				mCapture.fl.setdata("currentDropSequence",currentDropSequence);
				currentFound = true;
			}
		}
		
		mCapture.fl.setdata("summaryCounters",summaryCounters);
		
		return manifest;
				
	}
	
	mc.fl.getCurrentManifest = function(args)
	{
		var manifest = [];
			
		var manifestData = mCapture.fl.currentsubjectobject().manifestData;
		var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
		
		var manifestItems = manifestData.Items;

		var dropResults = currentResultsObject.Drops;
		
		for(var _itm = 0; _itm < manifestItems.length; _itm++)
		{
			var drop = manifestItems[_itm];
			
			var itemResult = mc.fl.findInArray([currentResultsObject.Drops,'DropId',drop.ManifestItemId]);
			
			var linkedDrops = filterArray(manifestItems,'DropSequence',drop.DropSequence);
			
			if(drop.ActionTypeId=="Delivery")
			{
				linkedDrops = filterArray(linkedDrops, "ActionTypeId","Delivery");
			}
			else if(drop.ActionTypeId=="Return")
			{
				linkedDrops = filterArray(linkedDrops, "ActionTypeId","Return");
			}
			
			if(linkedDrops.length>1)
			{
				if(drop.unlinked==undefined)
				{
					var linkId = drop.ManifestItemId;
					drop.unlinked=false;
					drop.linkId=linkId;
					
					for(var iLinkedItem=0;iLinkedItem<linkedDrops.length;iLinkedItem++)
					{
						var linkedDrop = mc.fl.findInArray([manifestItems,'ManifestItemId',linkedDrops[iLinkedItem].ManifestItemId]);
						if(linkedDrop!=undefined)
						{
							manifestItems[linkedDrop.index].unlinked=false;
							manifestItems[linkedDrop.index].linkId=linkId;
						}
					}
				}
			}
			
			if(itemResult!=undefined)
			{
				drop.status = itemResult.Status;
				drop.telephoneStatus = itemResult.TelephoneStatus;
			}

			manifest.push(drop);	
			
		}
		
		var currentFound = false;
		var currentDropSequence = 1;
		for(var iDrop=0;iDrop<manifest.length;iDrop++)
		{
			if((manifest[iDrop].status==""&&!currentFound)||(currentFound&&manifest[iDrop].status==""&&manifest[iDrop].DropSequence==currentDropSequence))
			{
				manifest[iDrop].status="Current";
				currentDropSequence = manifest[iDrop].DropSequence;
				mCapture.fl.setdata("currentDropSequence",currentDropSequence);
				currentFound = true;
			}
		}
		
		return manifest;
	}
	
	mc.fl.getNextNDropsList = function(args)
	{
		//args[0] = n - Number of drops to include
		var n = args[0];
		var currentDropSequence = args[1];
		
		var manifest = [];
		var manifestData = mCapture.fl.currentsubjectobject().manifestData;
		var manifestItems = manifestData.Items;
		
		var displayItems = [];
		
		for(var i=0;i<manifestItems.length;i++)
		{
			var dropToDisplay = manifestItems[i];
			if(dropToDisplay.displayPosition!=undefined)
			{
				displayItems.push(dropToDisplay);
			}
		}
		
		displayItems.sort(function(a, b){
			 return a.displayPosition-b.displayPosition
			})
		
		var dropCount = 0;
		var lastDropSequence = -1;
		var firstItemFound = false;
		for(var _itm = 0; _itm < displayItems.length; _itm++)
		{
			var drop = displayItems[_itm];
			
			if(drop.DropSequence==currentDropSequence)
			{
				firstItemFound = true;
			}
			
			if(firstItemFound&&dropCount<n)
			{
				if(lastDropSequence!=drop.DropSequence)
				{
					lastDropSequence=drop.DropSequence;
					manifest.push(drop);
					dropCount++;
				}
			}			
		}	
		return manifest;
	}
	
	mc.fl.reOrderDrops = function(args)
	{
		//currentList = args[0];
		//dropId = args[1];
		//direction = args[2];
		
		var currentList = args[0];
		var dropId = args[1];
		var direction = args[2];
		
		var p1 = -1;
		var p2 = -1;
		var seq1 = -1;
		var seq2 = -1;
		
		for(var i=0;i<currentList.length;i++)
		{
			if(currentList[i].ManifestItemId==dropId)
			{
				if(direction=="Up"&&i>0)
				{
					var p1 = currentList[i].displayPosition;
					var p2 = currentList[i-1].displayPosition;
					var seq1 =	currentList[i].DropSequence;
					var seq2 =	currentList[i-1].DropSequence;
					if(i==1)
					{
						mc.fl.setdata("currentDropSequence",seq1);
					}
				}				
				else if(direction=="Down"&&i<currentList.length-1)
				{
				
					var p1 = currentList[i].displayPosition;
					var p2 = currentList[i+1].displayPosition;
					var seq1 =	currentList[i].DropSequence;
					var seq2 =	currentList[i+1].DropSequence;
					if(i==0)
					{
						mc.fl.setdata("currentDropSequence",seq2);
					}
				}
				//Set the displayPosition of all drops with a DropSequence = seq1 to the p2
				var seq1Matches = filterArray(mCapture.fl.currentsubjectobject().manifestData.Items,"DropSequence",seq1);
				for(var iSeq1Match=0;iSeq1Match<seq1Matches.length;iSeq1Match++)
				{
					seq1Matches[iSeq1Match].displayPosition = p2;
					//var match = mCapture.fl.findInArray(
				}
				
				//Set the displayPosition of all drops with a DropSequence = seq2 to the p1
				var seq2Matches = filterArray(mCapture.fl.currentsubjectobject().manifestData.Items,"DropSequence",seq2);
				for(var iSeq2Match=0;iSeq2Match<seq2Matches.length;iSeq2Match++)
				{
					seq2Matches[iSeq2Match].displayPosition = p1;
					//var match = mCapture.fl.findInArray(
				}
			}
		}
	}
	
	mc.fl.generateFullUPIList = function(args)
	{
		var UPIList = [];
			
		var manifest = mCapture.fl.currentsubjectobject().manifestData;
		var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
		var manifestItems = manifest.Items;
		
		for(var iDrop = 0;iDrop<manifestItems.length;iDrop++)
		{
			var manifestItem = manifestItems[iDrop];
			var manifestItemUPIList = manifestItem.DeliveryUPIList;
			jQuery.merge(UPIList, manifestItemUPIList);
		}
		return UPIList;
	}
	
	function updateUPIWithDropId(upiList, dropId)
	{
		upiList.forEach(function(item){item.DropId=dropId});
		return upiList;
	}
	
	mc.fl.generateDropUPIList = function(args)
	{
		//args[0] - selectedDrop
		
		function generateServiceObject(serviceCode)
		{
		
			var _service = {}
					
			_service.ServiceCode = serviceCode;
					
			var serviceStaticData = mc.fl.findInArray([staticDataServices,'ServiceId',_service.ServiceCode]);
			if(serviceStaticData!=undefined)
			{
				_service.ServiceDescription = serviceStaticData.ServiceDescription
			}
			
			var serviceResult = undefined;
			if(upiResult!=undefined)
			{
				if(upiResult.ServiceResults!=undefined)
				{
					serviceResult = mc.fl.findInArray([upiResult.ServiceResults,'ServiceCode',_service.ServiceCode]);
				}
			}
			
			if(serviceResult==undefined)
			{
				_service.Status = '';
				_service.Comments = '';
				
			}
			else
			{
				_service.Status = serviceResult.Status;
				_service.Comments = serviceResult.Comments;
			}
			
			return _service;
		}
		
		var selectedDropId = args[0];
		var UPIList = [];
		
		var dropHasStandardServices = false;
		var dropServices = [];
		
		var manifest = mCapture.fl.currentsubjectobject().manifestData;
		var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
		var manifestItems = manifest.Items;
		
		var selectedManifestItem = mc.fl.findInArray([manifestItems,'ManifestItemId',selectedDropId]);
		
		var staticData = mCapture.fl.currentsubjectobject().staticData;	
		var staticDataServices = staticData.Services;
		
		var manifestItemUPIList = [];
		
		if(selectedManifestItem.linkId==undefined||selectedManifestItem.unlinked)
		{
			jQuery.merge(manifestItemUPIList,updateUPIWithDropId(selectedManifestItem.DeliveryUPIList,selectedDropId));
		}
		else
		{
			var linkedDrops = filterArray(manifestItems,'linkId',selectedDropId);
			for(var iLinkedDrop=0;iLinkedDrop<linkedDrops.length;iLinkedDrop++)
			{
				var linkedDrop = linkedDrops[iLinkedDrop];
				jQuery.merge(manifestItemUPIList,updateUPIWithDropId(linkedDrop.DeliveryUPIList,linkedDrop.ManifestItemId));
			}
		}
		
		var selectedItemResults = mc.fl.findInArray([currentResultsObject.Drops,'DropId',selectedDropId]);
		
		for(var _upi = 0; _upi < manifestItemUPIList.length; _upi++)
		{
			
			var upi = {};
			
			if(manifestItemUPIList[_upi].DropId!=selectedItemResults.DropId)
			{
				selectedItemResults = mc.fl.findInArray([currentResultsObject.Drops,'DropId',manifestItemUPIList[_upi].DropId]);
			}
			
			upi.DropId = manifestItemUPIList[_upi].DropId;
			upi.Identifier = manifestItemUPIList[_upi].Identifier;
			upi.ItemDescription = manifestItemUPIList[_upi].ItemDescription;
			upi.ManifestUPIId = manifestItemUPIList[_upi].ManifestUPIId;
			upi.SpecialInstructions = manifestItemUPIList[_upi].SpecialInstructions;
			
			upi.Parts = '';
			
			var upiResult = undefined;
			if(selectedItemResults!=undefined)
			{
				try
				{
					upiResult = mc.fl.findInArray([selectedItemResults.UPIList,'Identifier',upi.Identifier]);
				}
			catch(err)
			{
				upiResult = undefined;
			}
			}
			if(upiResult == undefined)
			{
				upi.Status = '';
				upi.Notes = [];
				upi.Photos = [];
				upi.UPIResultId = mc.db.guid();
			}
			else
			{
				upi.Status = upiResult.Status;
				upi.Notes = upiResult.Notes;
				upi.Photos = upiResult.Photos;
				upi.UPIResultId = upiResult.UPIResultId;
			}
			
			if(manifestItemUPIList[_upi].ServiceIdList!=null)
			{
				var upiServices =  manifestItemUPIList[_upi].ServiceIdList;
				
				if(upiServices==undefined)
				{
					upiServices = [];
				}
				
				upi.Services = [];
			
				for(var _ser = 0; _ser < upiServices.length; _ser++)
				{
					var serviceObject = generateServiceObject(upiServices[_ser])
					dropServices.push(serviceObject.ServiceCode);
					upi.Services.push(serviceObject);
				}
			
			}

			UPIList.push(upi);
		}

		
		UPIList.sort(function(a, b){
			 return a.Identifier-b.Identifier
			})
		
		/* 
		var staticData = mCapture.fl.currentsubjectobject().staticData;	
		var standardServiceCodes = staticData.StandardServiceCodes;
		
		
		for(var iStandardService=0;iStandardService<standardServiceCodes.length;iStandardService++)
		{
			var standardServiceCode = standardServiceCodes[iStandardService];
			if(dropServices.indexOf(standardServiceCode.ServiceCode)==-1)
			{
				//masterUPI = UPIList[0] - assume adding missing services to Master UPI only
				if(UPIList[0].Services==undefined)
				{
					UPIList[0].Services = [];
				}
				// THIS IS WHERE TO ADD THE ALTERNATIVE SERVICE CODE
				var serviceObject = generateServiceObject(standardServiceCode.ServiceCode)
				dropServices.push(standardServiceCode.ServiceCode);
				
				UPIList[0].Services.push(serviceObject);
			}	
		} 
		*/
		
		for(var iUPI=0;iUPI<UPIList.length;iUPI++)
		{
			UPIList[iUPI].Services.sort(function(a, b){
			 return a.Identifier-b.Identifier
			})
		}
		
		return UPIList;
		
	}
	
	mc.fl.countDropPhotos = function(args)
	{
		//args[0] - selectedDrop
		var selectedDropId = args[0];
		
		var LinkedUPIList = mCapture.fl.generateDropUPIList([selectedDropId]);
		
		var photoCount = 0;
		
		for(var _upi = 0; _upi < LinkedUPIList.length; _upi++)
		{
			var upi = LinkedUPIList[_upi];
			
			try
			{
				if(upi.Photos!=undefined)
				{
					photoCount = photoCount + upi.Photos.length;
				}
			}
			catch(err)
			{
				photoCount = -1;
				return photoCount;
			}
			
		}
		
		return photoCount;
	}

	mc.fl.countDropPhoneCalls = function(args)
	{
		//args[0] - selectedDrop
		var selectedDropId = args[0];
			
		var manifest = mCapture.fl.currentsubjectobject().manifestData;
		var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
		var manifestItems = manifest.Items;
		
		var selectedManifestItem = mc.fl.findInArray([manifestItems,'ManifestItemId',selectedDropId]);
		var selectedItemResults = mc.fl.findInArray([currentResultsObject.Drops,'DropId',selectedDropId]);
		
		var staticData = mCapture.fl.currentsubjectobject().staticData;	
		var staticDataServices = staticData.Services;
		
		var dropResults	= [];
		
		if(selectedManifestItem.linkId==undefined||selectedManifestItem.unlinked)
		{
			dropResults.push(selectedItemResults);
		}
		else
		{
			var drops = mc.fl.findInArray([manifestItems,'linkId',selectedDropId]);	
			for(var iDrop=0;iDrop<drops.length;iDrop++)
			{
				var dropResult = mc.fl.findInArray([currentResultsObject.Drops,'DropId',drops[iDrop].ManifestItemId]);
				if(dropResult!=undefined)
				{
					dropResults.push(dropResult);
				}
			}
		}
		
		var phoneCalls = {};
		
		phoneCalls.Customer = {};
		phoneCalls.Customer.Made = 0;
		phoneCalls.Customer.Success = 0;
		phoneCalls.Customer.Fail = 0;
		phoneCalls.Other = {};
		phoneCalls.Other.Made = 0;
		phoneCalls.Other.Success = 0;
		phoneCalls.Other.Fail = 0;
		
		for(var _dropResult = 0; _dropResult < dropResults.length; _dropResult++)
		{		
			var dropRes = dropResults[_dropResult];
			if(dropRes.Telephone!=undefined)
			{
				for(var iPhoneId=0;iPhoneId<dropRes.Telephone.length;iPhoneId++)
				{
					var phoneObject=dropRes.Telephone[iPhoneId];
					if(phoneObject.TelephoneNumberId=="Telephone1"||phoneObject.TelephoneNumberId=="Telephone2")
					{
						//Calls to customer
						phoneCalls.Customer.Made = phoneCalls.Customer.Made + phoneObject.Log.length;
						for(var iCall=0;iCall<phoneObject.Log.length;iCall++)
						{
							if(phoneObject.Log[iCall].Outcome=="Success")
							{
								phoneCalls.Customer.Success ++;
							}
							else
							{
								phoneCalls.Customer.Fail ++;
							}
						}
					}
					else
					{
						//Other calls
						phoneCalls.Other.Made = phoneCalls.Other.Made + phoneObject.Log.length;
						for(var iCall=0;iCall<phoneObject.Log.length;iCall++)
						{
							if(phoneObject.Log[iCall].Outcome=="Success")
							{
								phoneCalls.Other.Success ++;
							}
							else
							{
								phoneCalls.Other.Fail ++;
							}
						}
					}
				}
			}					
		}
		
		return phoneCalls;
	}
	
	mc.fl.generateDeliveryQuestionsList = function(args)
	{
		/*
		arg[0] - routeData
		arg[1] - selectedDrop
		arg[2] - questions
		*/
		
		var questions = [];	
		var manifestObject = args[0];
		
		var selectedDropId = args[2];
		
		var manifestHeader = manifestObject.manifestHeader;
		var manifestItems = manifestObject.manifestItems;
		var manifestItemList = filterArray(manifestItems,"DropId",selectedDropId)
		var manifestItem = manifestItemList[0];
		var manifestItemUPIList = manifestItem.upiList;
		
		var dropResults = manifestResultsObject.Drops;
		
		if(dropResults[selectedDropId]==undefined)
		{
			dropResults[selectedDropId] = {};
		}
		itemResults = dropResults[selectedDropId];
		
		var deliveryQuestionList = itemResults.questions;
		
		for(var _q = 0; _q < deliveryQuestionList.length; _q++)
		{
			var q = {};
			questions.push(q);
		}
		
		return questions;
	}
	
	mc.fl.generateVCLPhotoList = function(args)
	{
		var VCLPhotoList = [];
		
		var selectedVCLItemId = args[0];
		
		var vclItemResults =  mc.fl.findInArray([mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results,"ChecklistItemId",selectedVCLItemId]);
		
		if(vclItemResults.Comment==undefined)
		{
			vclItemResults.Comment = {};
		}
		if(vclItemResults.Comment.Photos==undefined)
		{
			vclItemResults.Comment.Photos = [];
		}
		return vclItemResults.Comment.Photos;
	}
	
	mc.fl.generateUPIPhotoList = function(args)
	{
		var UPIPhotoList = [];
		
		var selectedUPI = args[0];
		
		var DropId = mCapture.fl.currentsubjectobject().selectedDropId;
		
		var LinkedUPIList = mCapture.fl.generateDropUPIList([DropId]);
		var selectedUPIObject = mCapture.fl.findInArray([LinkedUPIList,"Identifier",selectedUPI]);
		
		var selectedDropId = selectedUPIObject.DropId;
		var routeResults =  mc.fl.currentsubjectobject().routeResults;
		
		var dropResults = routeResults.Drops;
		
		itemResults = mc.fl.findInArray([dropResults,"DropId",selectedDropId]);
		
		if(itemResults==undefined)
		{
			return UPIPhotoList;
		}
		
		if(itemResults.UPIList==undefined)
		{
			return UPIPhotoList;
		}
		
		var upiResults = mc.fl.findInArray([itemResults.UPIList,"Identifier",selectedUPI]);
		
		if(upiResults==undefined)
		{
			return UPIPhotoList;
		}
		
		if(upiResults.Photos==undefined)
		{
			return UPIPhotoList;
		}
		
		return upiResults.Photos;
	}
	
	mc.fl.generateDropPhoneNumberList = function(args)
	{
		/*
		arg[0] - selectedDrop
		*/
		
		var DropPhoneNumberList = [];
			
		var selectedDropId = args[0];
		var UPIList = [];
			
		var manifest = mCapture.fl.currentsubjectobject().manifestData;
		var currentResultsObject = mCapture.fl.currentsubjectobject().routeResults;
		var manifestItems = manifest.Items;
		
		var selectedManifestItem = mc.fl.findInArray([manifestItems,'ManifestItemId',selectedDropId]);
		var selectedItemResults = mc.fl.findInArray([currentResultsObject.Drops,'DropId',selectedDropId]);
		
		var phoneNumberList = [];
		
		if(selectedManifestItem!=undefined)
		{
			for(var iNumber=1;iNumber<10;iNumber++)
			{
				var phoneKey = 'Telephone' + iNumber;
				if(selectedManifestItem[phoneKey]!=undefined)
				{
					phoneNumberList.push(selectedManifestItem[phoneKey]);
				}
			}
			
			var phoneResults = [];
			try
			{
				if(selectedItemResults!=undefined)
				{
					phoneResults = selectedItemResults.Telephone;
					if(phoneResults==undefined)
					{
						phoneResults = [];
					}
				}
			}
			catch(error)
			{
				phoneResults = [];
			}
			
			for(var _phoneNumber = 0; _phoneNumber < phoneNumberList.length; _phoneNumber++)
			{
				var phoneObject = {};
				phoneObject.TelephoneNumber = phoneNumberList[_phoneNumber];
				
				if(phoneObject.TelephoneNumber.substring(0,2)=='07') //assume mobile number
				{
					phoneObject.Type = "mobile";
					phoneObject.Priority = 0;
				} 
				else if(phoneObject.TelephoneNumber.substring(0,2)=='01'||phoneObject.TelephoneNumber.substring(0,2)=='02') //assume mobile number
				{
					phoneObject.Type = "landline";
					phoneObject.Priority = 1;
				}
				else
				{
					phoneObject.Type = "unknown";
					phoneObject.Priority = 2;
				}
				
				var telephoneId = _phoneNumber + 1;
				
				var phoneResult = mc.fl.findInArray([phoneResults,'TelephoneNumberId',"Telephone" + telephoneId]);
				
				if(phoneResult==undefined)
				{
					phoneObject.TelephoneCallId = mc.db.guid();
					phoneObject.TelephoneNumberId = "Telephone" + telephoneId;
					phoneObject.Status = "";
					phoneObject.Attempts = 0;
					phoneObject.LastAttempt = "";
					phoneObject.LastOutcome = "";
					phoneObject.Log = [];
				}
				else
				{
					phoneObject.Status = phoneResult.Status;
					phoneObject.Attempts = phoneResult.Log.length;
					if(phoneObject.Attempts>0)
					{
						var lastAttempt = phoneResult.Log[phoneResult.Log.length-1];
						phoneObject.LastAttempt = lastAttempt.CallStart;
						phoneObject.LastOutcome = lastAttempt.Outcome;
					}
					else
					{
						phoneObject.LastAttempt = "";
						phoneObject.LastOutcome = "";
					}
				}
				
				DropPhoneNumberList.push(phoneObject);
			}
			
			DropPhoneNumberList.sort(function(a, b){
			 return a.priority-b.priority
			})
		}	

		return DropPhoneNumberList;
	}
	
	mc.fl.generateDepotPhoneNumberList = function(args)
	{
		/*
		arg[0] - selectedDrop
		*/
		
		var DepotPhoneNumberList = [];
			
		var selectedDepot = args[0];
		
		var staticData = mCapture.fl.currentsubjectobject().staticData;
		
		var phoneResults = mCapture.fl.currentsubjectobject().routeResults.TelephoneCalls;
		
		if(staticData!=undefined)
		{
			var phoneNumberList = [];
			var generalPhoneNumberList = [];
			var depotPhoneNumberList = [];
			
			generalPhoneNumberList = mc.fl.filterArray([staticData.DepotTelephoneList,"Depot",null]);
			if(generalPhoneNumberList.length>0)
			{
				jQuery.merge(phoneNumberList,generalPhoneNumberList);
			}
			
			depotPhoneNumberList = mc.fl.filterArray([staticData.DepotTelephoneList,"Depot",selectedDepot]);
			if(depotPhoneNumberList.length>0)
			{
				jQuery.merge(phoneNumberList,depotPhoneNumberList);
			}	
			
			for(var _phoneNumber = 0; _phoneNumber < phoneNumberList.length; _phoneNumber++)
			{
				var phoneObject = {};
				var telephoneId = phoneNumberList[_phoneNumber].TelephoneNumberId;
				
				phoneObject.TelephoneNumberId = telephoneId;
				phoneObject.TelephoneNumber = phoneNumberList[_phoneNumber].TelephoneNumber;
				phoneObject.ContactDescription = phoneNumberList[_phoneNumber].ContactDescription;
				phoneObject.KeyContact = phoneNumberList[_phoneNumber].KeyContact;
				phoneObject.Priority = phoneNumberList[_phoneNumber].NumberPriority;
				
				if(phoneObject.TelephoneNumber.substring(0,2)=='07') //assume mobile number
				{
					phoneObject.Type = "mobile";
				} 
				else if(phoneObject.TelephoneNumber.substring(0,2)=='01'||phoneObject.TelephoneNumber.substring(0,2)=='02') //assume mobile number
				{
					phoneObject.Type = "landline";
				}
				else
				{
					phoneObject.Type = "unknown";
				}
				
				var phoneResult = mc.fl.findInArray([phoneResults,'TelephoneNumberId',telephoneId]);
				
				if(phoneResult==undefined)
				{
					phoneObject.TelephoneCallId = mc.db.guid();
					phoneObject.TelephoneNumberId = telephoneId;
					phoneObject.Status = "";
					phoneObject.Attempts = 0;
					phoneObject.LastAttempt = "";
					phoneObject.LastOutcome = "";
					phoneObject.Log = [];
				}
				else
				{
					phoneObject.Status = phoneResult.Status;
					phoneObject.Attempts = phoneResult.Log.length;
					if(phoneObject.Attempts>0)
					{
						var lastAttempt = phoneResult.Log[phoneResult.Log.length-1];
						phoneObject.LastAttempt = lastAttempt.CallStart;
						phoneObject.LastOutcome = lastAttempt.Outcome;
					}
					else
					{
						phoneObject.LastAttempt = "";
						phoneObject.LastOutcome = "";
					}
				}
				
				DepotPhoneNumberList.push(phoneObject);
			}
			
			DepotPhoneNumberList.sort(function(a, b){
			 return a.priority-b.priority
			})
		}	

		return DepotPhoneNumberList;
	}
	
	mc.fl.saveCheckListComment = function(args)
	{
	
		var selectedVCLItemId = args[0];
		var comments = args[1];
	
		var currentVCLItemResults =  mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results;
		var currentVCLItemResult =  mc.fl.findInArray([currentVCLItemResults, "ChecklistItemId", selectedVCLItemId]);
		
		if(currentVCLItemResult.Comment==undefined)
		{
			mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results[currentVCLItemResult.index].Comment = {};
		}
		
		mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results[currentVCLItemResult.index].Comment.Comment = comments;
	
	}
	
	mc.fl.saveVCLPhoto = function(args)
	{
		var VCLPhotoList = [];
		
		var selectedVCLItemId = args[0];
		var photoObject = args[1];
		var photoComments = args[2];
		
		var currentVCLItemResults =  mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results;
		var currentVCLItemResult =  mc.fl.findInArray([currentVCLItemResults, "ChecklistItemId", selectedVCLItemId]);
		
		if(currentVCLItemResult==undefined)
		{
			alert('There is an error here - please record the steps used to create this error');
			return -1;
		}
		
		var vclResultComments = currentVCLItemResult.Comment;
		
		if(vclResultComments==undefined)
		{
			vclResultComments = {};
			vclResultComments.Photos = [];
		}
		
		if(vclResultComments.Photos==undefined)
		{
			vclResultComments.Photos = [];
		}
		
		var TimeStampDT = new Date;
		photoObject.TimeStamp = TimeStampDT.toISOString();
		var location = mc.db.getCachedPosition();
		if(location!=undefined)
		{
			photoObject.Latitude = location.coords.latitude;
			photoObject.Longitude = location.coords.longitude;
		}
		
		if(photoComments==undefined)
		{
			photoComments="";
		}
		photoObject.Comments = photoComments;
		photoObject.VCLItemId = selectedVCLItemId;
		
		vclResultComments.Photos.push(photoObject);
		
		mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results[currentVCLItemResult.index].Comment = vclResultComments;
		
		return vclResultComments.Photos.length;
	}
	
	mc.fl.saveUPIPhoto = function(args)
	{
		var UPIPhotoList = [];
		
		var selectedUPI = args[0]; //Object
		var photoObject = args[1];
		var photoComments = args[2];
		
		//var selectedDropId = mc.fl.currentsubjectobject().deliveryCTManifestItemId[mc.fl.currentsubjectobject().selectedDropIndex].toString();
		var selectedDropId = selectedUPI.DropId;
		var routeResults =  mc.fl.currentsubjectobject().routeResults;
			
		var dropResults = routeResults.Drops;
		itemResults = mc.fl.findInArray([dropResults,"DropId",selectedDropId]);
		
		if(itemResults.UPIList==undefined)
		{
			itemResults.UPIList = [];
		}
		
		var selectedUPIResult = mc.fl.findInArray([itemResults.UPIList,"Identifier",selectedUPI.Identifier]);
		if(selectedUPIResult==undefined)
		{
			selectedUPIResult = {};
			selectedUPIResult.Identifier = selectedUPI.Identifier;
		}
		
		if(selectedUPIResult.Photos==undefined)
		{
			selectedUPIResult.Photos = [];
		}
		
		if(photoObject.ExistingImageId==undefined)
		{
			photoObject.UPI = selectedUPI.Identifier;
		}
		else
		{
			photoObject = mc.fl.findInArray([selectedUPIResult.Photos,"ImageId",photoObject.ExistingImageId]);			
		}
		
		photoObject.Comments = photoComments;
		photoObject.Status = "Saved";
		
		if(photoObject.index==undefined)
		{
			selectedUPIResult.Photos.push(photoObject);
		}
		else
		{
			selectedUPIResult.Photos[photoObject.index] = photoObject;
		}
		
		if(selectedUPIResult.index==undefined)
		{
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemResults.index].UPIList.push(selectedUPIResult);
		}
		else
		{
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemResults.index].UPIList[selectedUPIResult.index] = selectedUPIResult;
		}
		
		return selectedUPIResult.Photos.length;
	}
	
	mc.fl.saveDropPhoto = function(args)
	{
		var routeId = args[0];
		var dropId = args[1];
		var photoObject = args[2];
		var photoComments = args[3];
		
		var selectedDropId = mc.fl.currentsubjectobject().deliveryCTManifestItemId[mc.fl.currentsubjectobject().selectedDropIndex].toString();
		var routeResults =  mc.fl.currentsubjectobject().routeResults;
			
		var dropResults = routeResults.Drops;
		itemResults = mc.fl.findInArray([dropResults,"DropId",selectedDropId]);
		
		if(itemResults.Photos==undefined)
		{
			itemResults.Photos = [];
		}
		
		if(photoComments==undefined)
		{
			photoComments="";
		}
		photoObject.Comments = photoComments;
		photoObject.RouteId = routeId;
		photoObject.DropId = dropId;
		photoObject.UPI = undefined;
		
		itemResults.Photos.push(photoObject);
		
		if(itemResults.index==undefined)
		{
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemResults.index].push(itemResults);
		}
		else
		{
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemResults.index] = itemResults;
		}
		
		return itemResults.Photos.length;
	}
	
	mc.fl.saveDropPhoneCall = function(args)
	{
		var routeId = args[0];
		var dropId = args[1];
		var phoneObject = args[2];
		
		var selectedDropId = mc.fl.currentsubjectobject().selectedDropId;
		var currentDrop = mc.fl.findInArray([mc.fl.currentsubjectobject().manifestData.Items,"DropId",selectedDropId]);
		
		var manifest = mCapture.fl.currentsubjectobject().manifestData;
		var manifestItems = manifest.Items;
		var routeResults =  mc.fl.currentsubjectobject().routeResults;
		
		var selectedManifestItem = mc.fl.findInArray([manifestItems,'ManifestItemId',selectedDropId]);
		
		var dropResults = routeResults.Drops;
		var itemResults = mc.fl.findInArray([dropResults,"DropId",selectedDropId]);
		
		if(itemResults.Telephone==undefined)
		{
			itemResults.Telephone = [];
		}
		
		telephoneResult = mc.fl.findInArray([itemResults.Telephone,"TelephoneNumberId",phoneObject.TelephoneNumberId]);
		
		if(telephoneResult==undefined)
		{
			telephoneResult = {};
			telephoneResult.TelephoneCallId = mc.db.guid();
			telephoneResult.TelephoneNumberId = phoneObject.TelephoneNumberId;
			telephoneResult.Log = [];
		}
		
		var logEntry = {};
		logEntry.PhoneLogId = mc.db.guid();
		logEntry.CallStart = phoneObject.CallStart;
		logEntry.CallEnd = phoneObject.CallEnd;
		logEntry.Outcome = phoneObject.Outcome;
		logEntry.Latitude = phoneObject.Latitude;
		logEntry.Longitude = phoneObject.Longitude;
		
		if(phoneObject.Outcome=="Success")
		{
			itemResults.TelephoneStatus = "Success";
		}
		else
		{
			itemResults.TelephoneStatus = "Failed";
			var telephone1Result = mc.fl.findInArray([itemResults.Telephone,"TelephoneNumberId","Telephone1"]);
			if(telephone1Result!=undefined)
			{
				if(telephone1Result.Log!=undefined)
				{
					for(var t1ResLog=0;t1ResLog<telephone1Result.Log.length;t1ResLog++)
					{
						if(telephone1Result.Log[t1ResLog].Outcome=="Success")
						{
							itemResults.TelephoneStatus = "Success";
						}
					}
				}
			}
			var telephone2Result = mc.fl.findInArray([itemResults.Telephone,"TelephoneNumberId","Telephone2"]);
			if(telephone2Result!=undefined)
			{
				if(telephone2Result.Log!=undefined)
				{
					for(var t2ResLog=0;t2ResLog<telephone2Result.Log.length;t2ResLog++)
					{
						if(telephone2Result.Log[t2ResLog].Outcome=="Success")
						{
							itemResults.TelephoneStatus = "Success";
						}
					}
				}
			}
			
		}
		
		telephoneResult.Log.push(logEntry);
		
		if(telephoneResult.index==undefined)
		{
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemResults.index].Telephone.push(telephoneResult);	
		}
		else
		{
			mCapture.fl.currentsubjectobject().routeResults.Drops[itemResults.index].Telephone[telephoneResult.index] = telephoneResult;
		}
		
		mCapture.fl.currentsubjectobject().routeResults.Drops[itemResults.index].TelephoneStatus = itemResults.TelephoneStatus;
		
		mCapture.fl.currentsubjectobject().manifestData.Items[selectedManifestItem.index].telephoneStatus = itemResults.TelephoneStatus;
		
		return itemResults.Telephone.length;
	}
	
	mc.fl.createContextMenu = function(args)
	{
		var currentLayoutContext = jQuery('.jmuiLayout.jmuiCurrent .jmuiColumn');
		var menuItems = args[0];
		
		if(currentLayoutContext.find('#contextMenuMask'))
		{
			currentLayoutContext.append('<div id="contextMenuMask"></div><div id="contextMenuPanel"><div><ul id="contextMenu"></ul></div></div>');
		}
		
		currentLayoutContext.find('#contextMenu').empty();
		
		for(var iMenuItem=0;iMenuItem<menuItems.length;iMenuItem++)
		{
			var menuItem = menuItems[iMenuItem];
			currentLayoutContext.find('#contextMenu').append('<li item="' + menuItem.itemId + '" class="menuItem ' + menuItem.enabled + '" menuaction="' + menuItem.menuAction + '"><i class="' + menuItem.iconClass + '"></i>' + menuItem.text + '</li>');
		}
		
		function menuItemTap(e)
		{
			
			try
			{
				var menuAction = e.srcElement.attributes.menuaction.value;
				var contextMenuClickFunction = "action_FUNCTIONS_contextmenuclick";
				
				var name, formula, i, formulaParams;
		
				function complete(result) 
				{
					mc.hideActivity();
				}
		
				name = contextMenuClickFunction;
		
				if (name && mc.fl[name] !== undefined && mc.fl[name].constructor === Function) 
				{
						mc.showActivity();
						formula = window.make_formula(mc.fl[name]);
						formulaParams = [complete, complete];
						formulaParams.push(menuAction);
						formulaParams.push(e);
						formula.execute.apply(formula, formulaParams);
				}						
			}
			catch(err)
			{
				alert(err);
			}
			
			
			
		}
		
		function hideContextMenu(e)
		{
			$('.contextMenuVisible').removeClass('contextMenuVisible');
		}
		
		$.ui.generateTaps($('#contextMenu .menuItem')).bind($.ui.tapEvent,menuItemTap);
		//$.ui.generateTaps($('#contextMenu')).bind($.ui.tapEvent,menuItemTap);
		$.ui.generateTaps($('#contextMenuMask')).bind($.ui.tapEvent,hideContextMenu);
	}

	mc.fl.removeContextMenu = function(args)
	{
		var currentLayoutContext = jQuery('.jmuiLayout.jmuiCurrent .jmuiColumn');
		
		if(currentLayoutContext.find('#contextMenuMask'))
		{
			
		}
	}
	
	mc.fl.showContextMenu = function(args)
	{
	}
	
	mc.fl.hideContextMenu = function(args)
	{
	}
	
	function viewUPIImage(e)
	{
		alert('viewImage');
		var actionButton = undefined;
		
		if($(e.jmuiTarget).hasClass("viewImage"))
		{
			actionButton = e.jmuiTarget;
		}
		
		if($(e.jmuiTarget.parentElement).hasClass("viewImage"))
		{
			actionButton = e.jmuiTarget.parentElement;
		}
		
		if(actionButton!=undefined)
		{
			selectedRow = actionButton.parentElement.parentElement.parentElement.parentElement;
			selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedUPI = selectedRow.attributes.imageupi.value;
			
			try
			{
				//Get Image File
			}
			catch(error)
			{
				alert(error.message);
			}
		}
	}
	
	function editUPIComments(e)
	{
		alert('editComments');
		var actionButton = undefined;
		
		if($(e.jmuiTarget).hasClass("editComments"))
		{
			actionButton = e.jmuiTarget;
		}
		
		if($(e.jmuiTarget.parentElement).hasClass("editComments"))
		{
			actionButton = e.jmuiTarget.parentElement;
		}
		
		if(actionButton!=undefined)
		{
			selectedRow = actionButton.parentElement.parentElement.parentElement.parentElement;
			selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedUPI = selectedRow.attributes.imageupi.value;
			
			try
			{
				//Store Current UPI & Photo Index
				
				// Comments
				
				//Show Comments
				
			}
			catch(error)
			{
				alert(error.message);
			}
		}
	}
	
	function deleteUPIImage(e)
	{
		alert('deleteImage');
		var actionButton = undefined;
		
		if($(e.jmuiTarget).hasClass("deleteImage"))
		{
			actionButton = e.jmuiTarget;
		}
		
		if($(e.jmuiTarget.parentElement).hasClass("deleteImage"))
		{
			actionButton = e.jmuiTarget.parentElement;
		}
		
		if(actionButton!=undefined)
		{
			selectedRow = actionButton.parentElement.parentElement.parentElement.parentElement;
			selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedUPI = selectedRow.attributes.imageupi.value;
			
			try
			{
				//Ask for confirmation
				
				//Delete image & notes from resultsObject
				
				//Refresh screen
				
			}
			catch(error)
			{
				alert(error.message);
			}
		}
	
	}
	
	mc.fl.initialiseUPIPhotoGrid = function(args)
	{
			$.ui.generateTaps($('#' + args[0] + ' .upiImageRow .actions .viewImage').bind($.ui.tapEvent,viewUPIImage));	
			$.ui.generateTaps($('#' + args[0] + ' .upiImageRow .actions .editComments').bind($.ui.tapEvent,editUPIComments));	
			$.ui.generateTaps($('#' + args[0] + ' .upiImageRow .actions .deleteImage').bind($.ui.tapEvent,deleteUPIImage));	
	}
	
	
} (window.jmfw, window.mCapture));