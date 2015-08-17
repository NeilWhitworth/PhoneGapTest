
	//visualize.js file for live operation
			
  //use60Styling:
  //useProcessLocation:
  //useProcessLibrary:
   //Device type Android
   //Device format tablet
   //Device client unrestricted
   //User is 
   //mSuiteSerialNo = 
   //process id process1.7d9c06cf-c3bc-4972-ba6d-0c1e34baf3dd(0)
   //process name home
    var cache = window.ctAppCache;
    function cachedEventListener()
    {
    log.info('Update Cache Cached Event:');
    }

    function checkingEventListener()
    {
    log.info('Update Cache Checking Event:');
    }

    function downloadingEventListener()
    {
    log.info('Update Cache Downloading Event:');
    }

    function errorEventListener()
    {
    log.info('Update Cache Error Event:');
    }

    function obsoleteEventListener()
    {
    log.info('Update Cache Obsolete Event:');
    }

    function noUpdateEventListener()
    {
    log.info('Update Cache NoUpdate Event:');
    }

    function progressEventListener()
    {
    log.info('Update Cache Progress Event:');
    }

    function updateReadyEventListener()
    {
    function reload() {
    function done(URL) {
    log.debug('On our way home to ' + URL);
    }
    logmessage('Update Cache Ready Reload');
    window.MCAPTURE_Provisioning_Processes = true;
    if (typeof(mCapture) !== 'undefined') {
    log.debug('Calling mCapture.fl.gotoprovisioningurl');
    mCapture.fl.gotoprovisioningurl(done);
    } else {
    log.debug('Changing location to ../../index.html');
    window.locationUtils.setHref('../../index.html');
    }
    }
    if (cache) {
    log.info('Update Cache Event: Status = ' + cache.status);
    if (cache.status == 4) {
    try {
    cache.swapCache();
    log.info('Update Cache Event: Swapped - Status = ' + cache.status);
    //althought this seems to work, it doesnt seem to be necessary because the cache
    //seems to get swapped on page change
    //alert('New process versions have been downloaded, the application will now be reloaded');
    mCapture.fl.msgboxasync(reload,'New process versions have been downloaded, the application will now be reloaded');
    }
    catch (e)
    {
    log.debug('Update Cache Event Swap: Error = ' + e.toString());
    mCapture.fl.msgboxasync(reload,'New process versions have been downloaded but could not be activated, the application will now be reloaded');
    }
    } else {
    log.debug('Update Cache Event: Not Ready - Status = ' + cache.status);
    }
    } else {
    log.debug('Update Cache Event: No Cache');
    }
    }

    //Swap cache if update ready
    (function() {
    //debugger;
    var cache = window.ctAppCache;
    if (cache) {
    cache.addEventListener('checking', checkingEventListener, false);
    cache.addEventListener('downloading', downloadingEventListener, false);
    cache.addEventListener('noupdate', noUpdateEventListener, false);
    cache.addEventListener('updateready', updateReadyEventListener, false);
    cache.addEventListener('progress', progressEventListener, false);
    cache.addEventListener('cached', cachedEventListener, false);
    cache.addEventListener('error', errorEventListener, false);
    cache.addEventListener('obsolete', obsoleteEventListener, false);
    log.debug('Cache update Configuration Page : Cache State : ' + cache.status);
    try {
    //cache.update(); //see if the cache has been updated
    } catch (e){
    log.error('Cache update Configuration Page : Cache Error : ' + e);
    }
    updateReadyEventListener();
    } else {
    log.info('Load Launch Page : No Cache');
    }
    })();


  

    (function($, mc) {


    
    var visualize,width,height,process;
    
        visualize = false;
      
    width = 0; //dont force a window size unless we are visualizing
    height = 0; //dont force a window size unless we are visualizing
    if (visualize) {
    
        width = 1024;
        height = 768;
      

    }

  
    process = {
    
    devPlatform : 'android',
    devFormat : 't',
    devClient : 'u',
    deviceType : 'Android',
    deviceFormat : 'tablet',
    deviceClient : 'unrestricted',
    deviceScreen : '',
    id : 'process1.7d9c06cf-c3bc-4972-ba6d-0c1e34baf3dd',
    
    title : 'home',
    version : '0',
    
        home: true,
      
        isaprocess: true,
        
            hidden : false,
          
    replicateSplashUrl: '',
    
      url: '../../process1.7d9c06cf-c3bc-4972-ba6d-0c1e34baf3dd/0/visualize.html',
    
    icon : '../../process1.7d9c06cf-c3bc-4972-ba6d-0c1e34baf3dd/0/resources/defaultprocessicon.png',
    
    description : '',

    
        notClientCreatable: false,
      
      // Subject Summaries
      summaryMap : [
      
		
        'name',
		
        'iscomplete',
		
        'ishidden'
		
      ],

      
        pageslist : [
  
          'Start',
        
          'p1',
        
          'Terminator'
        ],

		pages : {

		
			//	MakePageTypeObject for Start Start
		// MakePageObject Start type Start  pageprefix  questionprefix 
          Start : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					
            }
          },

  
			//	MakePageTypeObject for p1 standard
		// MakePageObject p1 type standard  pageprefix  questionprefix 
          p1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					procs : 'procs',
              procs_1 : 'procs_1'
            }
          },

  

		Terminator : {
		qIdMap : {
		}
		}
		},
    dataIdMap : {
    
      'procs': {
      qIds: [
      
        'procs'
      ]
      },
      'procs_1': {
      qIds: [
      
        'procs_1'
      ]
      }
    },
  
        questions : {
        
			procs : {
			

			},
		
			procs_1 : {
			

			},
		

        //finalise the questions with something that doesnt have a ,
        $end$ : {}

        } // end of questions
      
    };


  
    // init call - set visualization, page size, process bindings
    if (window.MCAPTURE_Provisioning_Processes === true) {
    mc.provision(process);
    } else {
    $.ready(function() {
    mc.ready(visualize, width, height, process);
    

    mc.fl.preNotification =
    
      function($$result) {
        return this.done( false );        
      };
    

    mc.fl.postNotification =
    
      function($$result) {
        return this.done( false );
      };
    
		mc.fl.action_back=    
function($$result) {
    return this.done( mc.fl.poppage(  ) );
    return this.done( this.locals.$$ret);
}
;
		
		

		// end of mc.fl.action_back
		mc.fl.action_next=    
function($$result) {
    this.locals.$$ret = mc.fl.pagenext(  );
    return this.done( this.locals.$$ret);
}
;
		
		

		// end of mc.fl.action_next
		mc.fl.action_home=    
function($$result) {
    this.locals.$$ret = mc.fl.pagehome(  );
    return this.done( this.locals.$$ret);
}
;
		
		

		// end of mc.fl.action_home
		mc.fl.action_clear=    
function($$result) {
    switch( this.state ) {
        case 1:
            this.state=2;
            mc.fl.cleardbandreplicate( this, mc.fl.currentprocessid(  ), "defaultRepProfile", "Sync", "", 300 );
            return this.async( );
        case 2:
            this.locals.$$asf1 = $$result;
            this.locals.$$ret = this.locals.$$asf1;
            this.locals.$$ret = mc.fl.gotourl( "..\/..\/index.html", false );
    }
    return this.done( this.locals.$$ret);
}
;
		
		

		// end of mc.fl.action_clear
		mc.fl.action_sync=    
function($$result) {
    switch( this.state ) {
        case 1:
            this.locals.currentpage=mc.fl.currentpage(  );
            this.state=2;
            mc.fl.replicatedialog( this, mc.fl.currentprocessid(  ), "defaultRepProfile", "Sync", "", 300 );
            return this.async( );
        case 2:
            this.locals.$$asf1 = $$result;
            this.locals.result=this.locals.$$asf1;
            if( this.locals.result === 0 )
            {
                return this.done( mc.fl.gotopage( this.locals.currentpage ) );
            }

            this.state=3;
            mc.fl.msgbox( this, "Failed, error code: " + this.locals.result, "Sync", 0, 16, 0 );
            return this.async( );
        case 3:
            this.locals.$$asf2 = $$result;
            this.locals.$$ret = this.locals.$$asf2;
            return this.done( mc.fl.gotopage( this.locals.currentpage ) );
    }
    return this.done( this.locals.$$ret);
}
;
		
		

		// end of mc.fl.action_sync
	
		// MakePageToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_Start_transition=    
function($$result) {
    if( true )
    {
        this.locals.$$ret = mc.fl.pushpage(  );
        return this.done( "p1" );
    }

    this.locals.$$ret = mc.fl.currentpage(  );
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_Start_pageForward=mc.fl.action_Start_transition;
				
			// end of mc.fl.action_Start_pageForward
		

	// Question hide formulas for page Start
	// Page hide formula for page Start
    mc.fl.pageHide_Start=function(callback) {
			
		}; // end of mc.fl.pageHide_Start
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		
	
		// MakePageToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_p1_transition=    
function($$result) {
    return this.done( "" );
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_p1_pageForward=mc.fl.action_p1_transition;
				
			// end of mc.fl.action_p1_pageForward
		

	// Question hide formulas for page p1
	// Page hide formula for page p1
    mc.fl.pageHide_p1=function(callback) {
			
		}; // end of mc.fl.pageHide_p1
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		

		// Cross page functions
		// These should all be in the calcval entries in the question section
		
		

		// Subject Summaries
			mc.fl.summaries = {
			
		name :     
function($$result) {
    if( true )
    {
        return this.done( "Home process should not be visible" );
    }

    return this.done( this.locals.$$ret);
}
,
		iscomplete :     
function($$result) {
    if( true )
    {
        return this.done( "set this value to the unquoted string true to remove it from the device" );
    }

    return this.done( this.locals.$$ret);
}
,
		ishidden :     
function($$result) {
    if( true )
    {
        return this.done( "true" );
    }

    return this.done( this.locals.$$ret);
}

		
	}; // end of mc.fl.summaries()

	
	// Replication profile formulas and contexts
		
			mc.fl.repl_defaultRepProfile = function( ) {
					make_formula(
					    
function($$result) {
    this.locals.pid=mc.fl.summaryitem( mc.fl.selectedsubject(  ), "processid" );
    this.locals.ishidden=mc.fl.summaryitem( mc.fl.selectedsubject(  ), "ishidden" );
    return this.done( this.locals.pid !== "0" && ( mc.fl.substring( this.locals.pid, 1 ) !== "_" ) );
    return this.done( this.locals.$$ret);
}

					).execute(function(result)
					{ return result;},
					function(){
					alert("Transform Asynchronous function failure: mc.fl.repl_defaultRepProfile");
					}
					);
			};

			
		
	mc.fl.replContext_defaultRepProfile={'type':'normal',
		'context':{
			'username':'$username',
			'password':'$password',
			'token':'$token',
			'subject':'$subject',
			'query':'',
			
			'targetprocess':''
			}
			};	// end of mc.fl.replContext_$username$password$token$subject

			mc.fl.repl_defaultRepProfile = function( ) {
					make_formula(
					    
function($$result) {
    this.locals.pid=mc.fl.summaryitem( mc.fl.selectedsubject(  ), "processid" );
    this.locals.ishidden=mc.fl.summaryitem( mc.fl.selectedsubject(  ), "ishidden" );
    return this.done( this.locals.pid !== "0" && ( mc.fl.substring( this.locals.pid, 1 ) !== "_" ) );
    return this.done( this.locals.$$ret);
}

					).execute(function(result)
					{ return result;},
					function(){
					alert("Transform Asynchronous function failure: mc.fl.repl_defaultRepProfile");
					}
					);
			};

			
		
	mc.fl.replContext_defaultRepProfile={'type':'normal',
		'context':{
			'username':'',
			'password':'',
			'token':'',
			'subject':'',
			'query':'',
			
			'targetprocess':''
			}
			};	// end of mc.fl.replContext_

			
		mc.fl.replContext_defaultRepProfile={'type':'normal',
			'context':{
				'username':'$username',
				'password':'$password',
				'token':'$token',
				'subject':'$subject',
				'query':''
			}
		};

	
    // Jools says we dont need this any more
    //mc.fl.refreshhidden();
    });  //end of ready()
    }// end of else

  



    } (window.jmfw, window.mCapture)); // end of function($, mc)


  