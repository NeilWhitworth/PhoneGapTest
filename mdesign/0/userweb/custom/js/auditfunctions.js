(function($, mc) {	
	
	var checkList;
	
	mc.fl.initialiseAudit = function(args)
	{
		var currentAuditResult =  mc.fl.currentsubjectobject().routeResults.VehicleChecks;
				
		if(currentAuditResult==undefined||currentAuditResult=='')
		{
			currentAuditResult = {};
			currentAuditResult.VehicleCheckSheetResultsId = mc.db.guid();
		}
		
		if(currentAuditResult.VehicleCheckSheetResultsId==undefined)
		{
			currentAuditResult.VehicleCheckSheetResultsId = mc.db.guid();
		}
		
		var startDT = new Date;
		currentAuditResult.StartDate = startDT.toDateString();
		currentAuditResult.StartTime = startDT.toLocaleTimeString();
		currentAuditResult.Start = startDT.toISOString();
		if(args[0]!=undefined)
		{
			currentAuditResult.RouteId = args[0];
		}
		if(args[1]!=undefined)
		{
			currentAuditResult.VehicleId = args[1];
		}
		currentAuditResult.Results = [];
		
		mc.fl.currentsubjectobject().routeResults.VehicleChecks = currentAuditResult;
		
		return currentAuditResult;
	}
	
	mc.fl.loadCurrentResults = function()
	{
		var currentAuditResult =  mc.fl.currentsubjectobject().routeResults.VehicleChecks;
				
		localStorage.loadingResults = "true";
		try
		{
			var qs = $('tbody>tr[rowtype="question"');
			for(i=0;i<qs.length;i+=1)
			{
				trow=qs[i];
				var itemId=trow.getAttribute("itemid");
				resultObject=currentAuditResult.Results[itemId];
				if(resultObject)
				{
					if($(trow).find('.answer').hasClass('picker'))
					{
						arg={};
						arg.jmuiTarget=$(trow).find(".option ." + resultObject.value)[0];
						selectionMade(arg);
					}
					else
					{
					}
				}
			}
		}
		catch(ex)
		{
			
		}
		localStorage.loadingResults = "false";
		
	}
	
	mc.fl.saveAuditResults = function(args)
	{
		var startDT = new Date;
		var currentAuditResult =  mc.fl.currentsubjectobject().routeResults.VehicleChecks;
				
		currentAuditResult.CompletedBy = JSONUserData.id;
		currentAuditResult.EndDate = startDT.toDateString();
		currentAuditResult.EndTime = startDT.toLocaleTimeString();
		currentAuditResult.End = startDT.toISOString();
		
		mc.fl.currentsubjectobject().routeResults.VehicleChecks = currentAuditResult;
		
		return currentAuditResult;
	}
	
	mc.fl.getResultId = function(args)
	{
		var itemId = args[0];
		var currentAuditResult =  mc.fl.currentsubjectobject().routeResults.VehicleChecks;
		var result = mCapture.fl.findInArray([currentAuditResult.Results,"ItemId",itemId]);
		if(result)
		{	
			return result.resultId;
		}
		else
		{
			return mc.db.guid();
		}
	}
	
	mc.fl.clearRowSelection = function(args)
	{
		function clearSavedResult()
		{
			
			delete mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results[selectedListItemId];
		}
		
		var selectedRowIndexString = args[0];
		var selectedRow = $('tr[rowindex="' + selectedRowIndexString + '"]');
		var selectedRowIndex = parseInt(selectedRowIndexString);
		mCapture.fl.cleardata('qValue',parseInt(selectedRowIndex));
		var rowChoices = $(selectedRow).find('td div.choices');
		var currentClasses = this.className;
		rowChoices.removeClass(currentClasses);
		rowChoices.addClass('choices');
		selectedRow[0].removeAttribute("rowScore");
		selectedRow[0].removeAttribute("scoreContribution");
		var selectedListItemId = selectedRow[0].getAttribute('liid');
		clearSavedResult();
	}
	
	function filterArray(array,key,value) {
	  return array.filter(
		  function(array){return array[key] == value}
	  );
	}
	
	mc.fl.saveAuditResultItem = function(args)
	{
		var jobId = args[0];
		var itemId = args[1];
		var elementKey = args[2];
		var elementValue = args[3];
		
		var currentAuditResult =  mc.fl.currentsubjectobject().routeResults.VehicleChecks;
				
		var resultItem = mCapture.fl.findInArray([currentAuditResult.Results,"ItemId",itemId]);
		
		if(resultItem==undefined)
		{
			resultItem=JSON.parse("{}");
			resultItem.ResultId = mc.db.guid();
			resultItem.ItemId = itemId;
		}
		
		resultItem[elementKey] = elementValue;
		
		if(resultItem.index==undefined)
		{
			mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results.push(resultItem);
		}
		else
		{
			mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results[resultItem.index] = resultItem;
		}
	}
	
	function serviceSelectionMade(e)
	{
		var selectedRow = undefined;
		var selectedTable = undefined;
		var selectedRowIndex = undefined;
		var selectedUPI = undefined;
		var selectedServiceCode = undefined;
		var selectedServiceId = undefined;
		var selectedOption = undefined;
		
		function optionSelected()
		{
			
			function checkServicesComplete()
			{
				mCapture.fl.refreshcurrentpage();
			}
			
			function saveResult(selectedOptionValue)
			{
				var selectedDropIndex = mc.fl.currentsubjectobject().deliveryCTManifestItemId[mc.fl.currentsubjectobject().selectedDropIndex].toString();
				var routeResults =  mc.fl.currentsubjectobject().routeResults;
				
				var dropResults = routeResults.Drops;
				var itemResults = mCapture.fl.findInArray([dropResults,"DropId",selectedDropIndex]);
				
				if(itemResults==undefined)
				{
					itemResults = {};
				}
				
				if(itemResults.UPIList==undefined)
				{
					itemResults.UPIList = [];
				}
				
				var UPIResults = mCapture.fl.findInArray([itemResults.UPIList,"Identifier",selectedUPI]);
				
				if(UPIResults==undefined)
				{
					UPIResults = {};
					UPIResults.Identifier = selectedUPI;
				}
				
				var numberOfServices = $(selectedTable).find('tr[rowtype="service"][upi="' + selectedUPI + '"]').length;
				
				UPIResults.ServiceCount = numberOfServices;
				
				if(UPIResults.ServiceResults==undefined)
				{
					UPIResults.ServiceResults = [];
				}
				
				var UPIServiceResult = mCapture.fl.findInArray([UPIResults.ServiceResults,"ServiceCode",selectedServiceCode]);
				
				if(UPIServiceResult==undefined)
				{
					UPIServiceResult = {};
					UPIServiceResult.ServiceResultId = mc.db.guid();
				}
				
				UPIServiceResult.ServiceCode = selectedServiceCode;
				UPIServiceResult.ServiceOutcome = selectedOutcome;
				UPIServiceResult.Status = selectedOption;
				var timestampDT = new Date;
				UPIServiceResult.ServiceTimeStamp = timestampDT.toISOString();
				var location = mc.db.getCachedPosition();
				if(location!=undefined)
				{
					UPIServiceResult.ServiceLocationLatitude = location.coords.latitude;
					UPIServiceResult.ServiceLocationLongitude = location.coords.longitude;
				}
				
				if(UPIServiceResult.index==undefined)
				{
					UPIResults.ServiceResults.push(UPIServiceResult);
				}
				else
				{
					UPIResults.ServiceResults[UPIServiceResult.index] = UPIServiceResult;
				}
				
				if(UPIResults.index==undefined)
				{
					itemResults.UPIList.push(UPIResults);
				}
				else
				{
					itemResults.UPIList[UPIResults.index] = UPIResults;
				}
				
				if(itemResults.index==undefined)
				{
					mc.fl.currentsubjectobject().routeResults.Drops.push(itemResults);
				}
				else
				{
					mc.fl.currentsubjectobject().routeResults.Drops[itemResults.index] = itemResults;
				}
				
				mc.fl.setdata('serviceStatus',selectedOption,selectedRowIndex);
				
				if(Object.keys(UPIResults.ServiceResults).length===UPIResults.ServiceCount)
				{
					var conditionRow = parseInt($(selectedTable).find('tr[rowtype="condition"][upi="' + selectedUPI + '"]').attr('rowindex'));
					mc.fl.setdata('serviceComments',"Services Complete",conditionRow);
				}
				
				$(selectedRow).find('td.answer').attr('value',selectedOption);
				
				checkServicesComplete();
			}

			
			saveResult(selectedOption);
			
			
		} 
		
		if($(e.jmuiTarget).hasClass("option"))
		{
			selectedRow = e.jmuiTarget.parentElement.parentElement.parentElement;
			selectedTable = e.jmuiTarget.parentElement.parentElement.parentElement.parentElement;
			
			selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedUPI = selectedRow.attributes.upi.value;
			selectedServiceCode = selectedRow.attributes.servicecode.value;
			selectedServiceId = selectedRow.attributes.serviceid.value;
			selectedOption = e.jmuiTarget.attributes.optionid.value;
			selectedOutcome = e.jmuiTarget.attributes.outcome.value;
		
			try
			{
				optionSelected();
			}
			catch(error)
			{
				alert(error.message);
			}
		}	
	}
	
	function conditionSelectionMade(e)
	{
		var selectedRow = undefined;
		var selectedRowIndex = undefined;
		var selectedUPI = undefined;
		var selectedUPIHeaderRowIndex = undefined;
		var selectedOption = undefined;
		
		function optionSelected()
		{
			
			function saveResult(selectedOptionValue)
			{
				var selectedDropIndex = mc.fl.currentsubjectobject().deliveryCTManifestItemId[mc.fl.currentsubjectobject().selectedDropIndex].toString();
				var routeResults =  mc.fl.currentsubjectobject().routeResults;
				
				var dropResults = routeResults.Drops;
				
				var itemResults = mCapture.fl.findInArray([dropResults,"DropId",selectedDropIndex]);;
				
				if(itemResults==undefined)
				{
					itemResults = {};
				}
				
				if(itemResults.UPIList==undefined)
				{
					itemResults.UPIList = [];
				}
				
				UPIResults = mCapture.fl.findInArray([itemResults.UPIList,"Identifier",selectedUPI]);
				
				if(UPIResults==undefined)
				{
					UPIResults = {};
				}
				
				if(UPIResults.Condition==undefined)
				{
					UPIResults.Condition = {};
					UPIResults.Condition.ConditionId = mc.db.guid();
				}
				
				function checkServicesComplete()
				{
					mCapture.fl.refreshcurrentpage();
				}
				
				function saveCondition()
				{
					UPIResults.Condition.Status = selectedOption;
					var timestampDT = new Date;
					UPIResults.Condition.TimeStamp = timestampDT.toISOString();
					//UPIResults.ConditionTimeStamp = timestampDT.toISOString();
					
					var location = mc.db.getCachedPosition();
					if(location!=undefined)
					{
						UPIResults.Condition.Latitude = location.coords.latitude;
						UPIResults.Condition.Longitude = location.coords.longitude;
					}
					
					if(UPIResults.index==undefined)
					{
						itemResults.UPIList.push(UPIResults);
					}
					else
					{
						itemResults.UPIList[UPIResults.index] = UPIResults;
					}
					
					if(itemResults.index==undefined)
					{
						mc.fl.currentsubjectobject().routeResults.Drops.push(itemResults);
					}
					else
					{
						mc.fl.currentsubjectobject().routeResults.Drops[itemResults.index] = itemResults;
					}
					
					mc.fl.setdata('serviceStatus',selectedOption,selectedRowIndex);
					
					$(selectedRow).find('td.answer').attr('value',selectedOption);
					
					checkServicesComplete();
				}
				
				saveCondition();
				
			}
			
			var UPIResults;
			saveResult(selectedOption);
					
		} 
		
		if($(e.jmuiTarget).hasClass("option"))
		{
			selectedRow = e.jmuiTarget.parentElement.parentElement.parentElement;
			selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedUPI = selectedRow.attributes.upi.value;
			
			selectedUPIHeaderRowIndex = 0;
			
			selectedOption = e.jmuiTarget.attributes.optionid.value;
		
			try
			{
				optionSelected();
			}
			catch(error)
			{
				alert(error.message);
			}
		}
		
	}
	
	function photoSelectionMade(e)
	{
		var selectedRow = undefined;
		var selectedRowIndex = undefined;
		var selectedUPI = undefined;
		var gridType = undefined;
		
		function gotoUPIPhotos()
		{
			mc.fl.setdata("selectedUPI", selectedUPI)
			if($(selectedRow).hasClass("upiRow"))
			{
				gridType="upi";
			}
			else
			{
				gridType="services";
			}
			
			if(gridType=="services")
			{
				mc.fl.setdata("selectedUPIServiceRowIdx", selectedRowIndex)
			}
			else
			{
				mc.fl.setdata("selectedUPIRowIdx", selectedRowIndex)
			}
			
			function gridCreated()
			{
				mc.fl.pushpage();
				mc.fl.gotopage("upiPhotos",false);
			}
			
			mc.fl.calculate({resume:gridCreated}, "calcCreateUPIPhotoGrid");
			
		}
		
		var photoButton = undefined;
		
		if($(e.jmuiTarget).hasClass("upiPhotos"))
		{
			photoButton = e.jmuiTarget;
		}
		
		if($(e.jmuiTarget.parentElement).hasClass("upiPhotos"))
		{
			photoButton = e.jmuiTarget.parentElement;
		}
		
		if(photoButton!=undefined)
		{
			selectedRow = photoButton.parentElement.parentElement;
			selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedUPI = selectedRow.attributes.upi.value;
			
			try
			{
				gotoUPIPhotos();
			}
			catch(error)
			{
				alert(error.message);
			}
		}
		
	}
	
	function phoneNumberSelectionMade(e)
	{
	

		var selectedRow = undefined;
		var selectedRowIndex = undefined;
		var selectedPhoneNumber = undefined;
		
		function makePhoneCall()
		{
			var callStart = new Date();
			var callEnd;
			
			function onResume()
			{
				try
				{
					document.removeEventListener("resume", onResume, false);
				}
				catch(err)
				{
				}
				
				try
				{
					var name, formula, i, formulaParams;
			
					function complete(result) 
					{
						mc.hideActivity();
					}
			
					name = "action_FUNCTIONS_resume_after_phone_call";
					
					callEnd = new Date();
					
					if (name && mc.fl[name] !== undefined && mc.fl[name].constructor === Function) 
					{
							mc.showActivity();
							formula = window.make_formula(mc.fl[name]);
							formulaParams = [complete, complete];
							
							var callLogObject = {};
							callLogObject.TelephoneNumberId = selectedPhoneNumberId;
							callLogObject.CallStart = callStart;
							callLogObject.CallEnd = callEnd;
							
							var location = mc.db.getCachedPosition();
							if(location!=undefined)
							{
								callLogObject.Latitude = location.coords.latitude;
								callLogObject.Longitude = location.coords.longitude;
							}
							
							formulaParams.push(callLogObject);
							
							formula.execute.apply(formula, formulaParams);
					}						
				}
				catch(err)
				{
				}

			}
			
			//mc.fl.cleardata("phoneOutcode");
			//mc.fl.refreshquestion("phoneOutcode");
			
			document.addEventListener("resume", onResume, false);
			mc.fl.makephonecall(selectedPhoneNumber);
		}
		
		var phoneNumberCell = undefined;
		
		if($(e.jmuiTarget).hasClass("phoneNumber"))
		{
			phoneNumberCell = e.jmuiTarget;
		}
		
		if($(e.jmuiTarget.parentElement).hasClass("phoneNumber"))
		{
			phoneNumberCell = e.jmuiTarget.parentElement;
		}
		
		if(phoneNumberCell!=undefined)
		{
			selectedRow = phoneNumberCell.parentElement.parentElement;
			selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedPhoneNumber = selectedRow.attributes.phonenumber.value;
			selectedPhoneNumberId = selectedRow.attributes.phonenumberid.value;
			
			try
			{
				makePhoneCall();
			}
			catch(error)
			{
				alert(error.message);
			}
		}
		
	}
	
	function selectionMade(e)
	{
		//e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
		var selectedItemId = "";
		localStorage.selectedItemId = "";
		
		function optionDataFound(options, selectedOptionId)
		{
			
			function saveResult(selectedOptionValue)
			{
				var currentAuditResult =  mc.fl.currentsubjectobject().routeResults.VehicleChecks;
				
				var resultItem = mc.fl.findInArray([currentAuditResult.Results,"ChecklistItemId",selectedItemId]);
				if(resultItem==undefined)
				{
					resultItem=JSON.parse("{}");
					resultItem.ResultId = mc.db.guid();
					resultItem.ChecklistItemId = selectedItemId;
				}
				
				resultItem.ChecklistItemOptionId = selectedOptionId;
				resultItem.OptionValue = selectedOptionValue;
				var timeStampDT = new Date;
				resultItem.TimeStamp = timeStampDT.toISOString();
				var location = mc.db.getCachedPosition();
				if(location!=undefined)
				{
					resultItem.Latitude = location.coords.latitude;
					resultItem.Longitude = location.coords.longitude;
				}
						
				if(resultItem.index==undefined)
				{
					mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results.push(resultItem);
				}
				else
				{
					mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results[resultItem.index] = resultItem;
				}
				
				mc.fl.setdata('_value',selectedOptionValue,selectedRowIndex);
				
				$(selectedRow).find('td.answer').attr('value',selectedOptionValue);
				//$(selectedRow).find('td.answer').find('.option').removeClass("selected");
				//$(selectedRow).find('td.answer').find('.option[optionid="' + selectedOptionId + '"]').addClass("selected");
				
				/*Apply action class*/
				$(selectedRow).find('td.action')[0].className = "action " + selectedOption.FurtherAction;
				
			}

			var selectedOption = mc.fl.findInArray([options, 'ChecklistItemOptionId', selectedOptionId]);
			if(selectedOption!=undefined)
			{
				saveResult(selectedOption.OptionValue);
			}
		} 
		
		if($(e.jmuiTarget).hasClass("option"))
		{
			var selectedRow = e.jmuiTarget.parentElement.parentElement.parentElement;
			var selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedItemId = selectedRow.attributes.itemid.value;
			var selectedItem = mc.fl.findInArray([checkList.ChecklistItems,'ChecklistItemId',selectedItemId]);
		
			localStorage.selectedItemId = selectedItemId;
		
			var selectedOptionId = e.jmuiTarget.attributes.optionId.value;
		
			try
			{
				if(selectedItem.ItemOptions)
				{
					optionDataFound(selectedItem.ItemOptions, selectedOptionId);
				}
			}
			catch(error)
			{
				alert(error.message);
			}
		}
	}
	
	
	function comments(e)
	{	
		//e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
		
		var selectedItemId = "";
		
		//var checkList = mCapture.fl.currentsubjectobject().staticData.vehicleCheckLists[mCapture.fl.currentsubjectobject().vehicleCheckListId];
		
		localStorage.selectedVehicleCheckListItemId = "";
		
		if($(e.jmuiTarget).hasClass("actionbutton"))
		{
			var selectedRow = e.jmuiTarget.parentElement.parentElement;
			var selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
			selectedItemId = selectedRow.attributes.itemid.value;
			
			var selectedItem = mc.fl.findInArray([checkList.ChecklistItems,'ChecklistItemId',selectedItemId]);
		
			
			localStorage.selectedVehicleCheckListItemId = selectedItem.ChecklistItemId;
			
			try
			{
				if(selectedItem!=undefined)
				{
					var checkListResult = mc.fl.findInArray([mCapture.fl.currentsubjectobject().routeResults.VehicleChecks.Results,"ChecklistItemId",selectedItem.ChecklistItemId]);
					
					if(checkListResult.Comment==undefined)
					{
						mCapture.fl.cleardata("checkListComment");
					}
					else
					{
						if(checkListResult.Comment.Comment==undefined)
						{
							mCapture.fl.cleardata("checkListComment");
						}
						else
						{						
							mCapture.fl.setdata("checkListComment",checkListResult.Comment.Comment);
						}
					}
					
					mCapture.fl.setdata("selectedVCLItemId",selectedItem.ChecklistItemId);
					mCapture.fl.pushpage();
					mCapture.fl.gotopage("checkListComments");
				}
			}
			catch(error)
			{
				alert(error.message);
			}
		}
	}
	
	function swipe(e)
	{
		alert('Swipe');
	}
	
	function picklistChange(e)
	{
		var selectedRow = e.srcElement.parentElement.parentElement.parentElement;
		var selectedRowIndex = parseInt(selectedRow.attributes.rowindex.value);
		selectedItemId = selectedRow.attributes.itemid.value;
		localStorage.selectedItemId = selectedItemId;
		
		var picklistValue = e.srcElement.value;
		
		var currentAuditResult = mc.fl.currentsubjectobject().routeResults.VehicleChecks;
		
		var resultItem = currentAuditResult.Results[selectedItemId];
		if(resultItem==undefined)
		{
			resultItem=JSON.parse("{}");
			resultItem.resultId = mc.db.guid();
			resultItem.itemId = selectedItemId;
		}
		
		resultItem.value = picklistValue;
		var timeStampDT = new Date;
		resultItem.TimeStamp = timeStampDT.toISOString();
		var location = mc.db.getCachedPosition();
		if(location!=undefined)
		{
			resultItem.Latitude = location.coords.latitude;
			resultItem.Longitude = location.coords.longitude;
		}
		
		mc.fl.currentsubjectobject().routeResults.VehicleChecks.Results[selectedItemId] = resultItem;
		
	}
	
	mc.fl.validateServices = function(args)
	{
		//args[0] - selectedDropId
		//args[1] - minimum Number of Photos
		//args[2] - True/False - whether the min count is applied to each UPI or to the Drop (True=UPI, False(Default)=Drop)
		
		var selectedDropId = args[0];
		var minPhotoCount = args[1];
		var minPhotoPerUPI = args[2] == undefined ? false:args[2]; 
		
		var missingPhoto = false;
		var photoCount = 0;
		
		var selectedDrop = mCapture.fl.findInArray([mCapture.fl.currentsubjectobject().routeResults.Drops,"DropId",selectedDropId]);
		
		var UPIResults = selectedDrop.UPIList;
		var PhotoCount = 0;
		for(var i=0;i<UPIResults.length;i++)
		{		
			if(UPIResults[i].Photos==undefined)
			{
				UPIResults[i].Photos = [];
			}
			
			if(minPhotoPerUPI&&UPIResults[i].Photos.length<minPhotoCount)
			{
				missingPhoto = true;
			}
			
			photoCount+=UPIResults[i].Photos;
		}
		
		if(!minPhotoPerUPI&&photoCount==minPhotoCount)
		{
			missingPhoto = true;
		}
		
		if(missingPhoto)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	
	mc.fl.validateCheckList = function(args)
	{
		//args[0] - checkListObject
		//args[1] - checkListResults
		
		//return status string
		//Complete
		//Incomplete
		//MissingComments
		//Failed
		
		try
		{
			var items = checkList.ChecklistItems;
			var vclResults = mCapture.fl.currentsubjectobject().routeResults.VehicleChecks;
			
			var status = "Complete";
			var missingComments=false;
			var failed=false;
			
			for(var i=0;i<items.length;i++)
			{
				var itemResult = mc.fl.findInArray([vclResults.Results,"ChecklistItemId",items[i].ChecklistItemId]);
				var mandValues = items[i].ItemMandatoryValues;
				
				if(itemResult==undefined)
				{
					status="Incomplete";
					return "Incomplete";
				}
				
				if(itemResult.OptionValue=="FAIL"&&itemResult.Comment==undefined)
				{
					$('tr[itemid="'+ items[i].id +'"]').addClass('missing');
					missingComments=true;
				}
				
				if(mandValues!=undefined)
				{
					if(mandValues!=''&&mandValues.indexOf(itemResult.OptionValue)==-1)
					{
						//FAIL
						failed="true";
					}
				}
			}
			
			if(missingComments)
			{
				status="MissingComments";
			}
			else if(failed)
			{
				status="Failed";
			}
			
			return status;
			
		}
		catch(err)
		{
			return "Error";
		}
	}
	
	mc.fl.initialiseGrid = function(args)
	{
		var checkListStatus = args[2];
		
		var completed = false;
		
		if(checkListStatus.toLowerCase()=="complete"||checkListStatus.toLowerCase()=="failed")
		{
			completed = true;
		}
		
		if(!completed)
		{
			$.ui.generateTaps($('#' + args[0] + ' td.answer').bind($.ui.tapEvent,selectionMade));
		}
		
		$('#commentscheckListComment')[0].readOnly = completed;
		
		if(completed)
		{
			$.ui.generateTaps($('#' + args[0] + ' td.action.hasComment .actionbutton').bind($.ui.tapEvent,comments));
		}
		else
		{
			$.ui.generateTaps($('#' + args[0] + ' td.action .actionbutton').bind($.ui.tapEvent,comments));
		}
			
		checkList = args[1];
	}

	mc.fl.initialiseServicesGrid = function(args)
	{
			$.ui.generateTaps($('#' + args[0] + ' tr[rowType="service"] td.answer').bind($.ui.tapEvent,serviceSelectionMade));
			$.ui.generateTaps($('#' + args[0] + ' tr[rowType="condition"] td.answer').bind($.ui.tapEvent,conditionSelectionMade));
	}
	
	
	mc.fl.initialisePhoneGrid = function(args)
	{
			$.ui.generateTaps($('#' + args[0] + ' .phoneNumberRow .phoneNumber').bind($.ui.tapEvent,phoneNumberSelectionMade));	
	}

	mc.fl.initialisePhotoButton = function(args)
	{
			$('.upiRow .upiPhotos').unbind();
			$.ui.generateTaps($('.upiRow .upiPhotos').bind($.ui.tapEvent,photoSelectionMade));
			$('tr[rowType="upiHeader"] .upiPhotos').unbind();
			$.ui.generateTaps($('tr[rowType="upiHeader"] .upiPhotos').bind($.ui.tapEvent,photoSelectionMade));
	}
	
	mc.fl.removeSelectedRowClass = function(args)
	{
		var selectedQuestionId = args[0];
		var selectedRow = $('tr[liid="' + selectedQuestionId + '"]');
		selectedRow.removeClass('jmuiSelected');
		selectedRow.removeClass('jmuiPressed');
	}
	
} (window.jmfw, window.mCapture));