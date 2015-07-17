
	//visualize.js file for live operation
			
  //use60Styling:
  //useProcessLocation:
  //useProcessLibrary:
   //Device type Android
   //Device format standard
   //Device client unrestricted
   //User is 
   //mSuiteSerialNo = 
   //process id process1.cc83bc68-6cdd-484e-9047-044848d04bc3(0)
   //process name pgbs2

    (function($, mc) {


    
    var visualize,width,height,process;
    
        visualize = false;
      
    width = 0; //dont force a window size unless we are visualizing
    height = 0; //dont force a window size unless we are visualizing
    if (visualize) {
    
        width = 320;
        height = 480;
      

    }

  
    process = {
    
    devPlatform : 'android',
    devFormat : 'n',
    devClient : 'u',
    deviceType : 'Android',
    deviceFormat : 'standard',
    deviceClient : 'unrestricted',
    deviceScreen : '',
    id : 'process1.cc83bc68-6cdd-484e-9047-044848d04bc3',
    
    title : 'pgbs2',
    version : '0',
    
        home: false,
      
        isaprocess: true,
        
            hidden : false,
          
    replicateSplashUrl: '',
    
      url: '../../process1.cc83bc68-6cdd-484e-9047-044848d04bc3/0/visualize.html',
    
    icon : '../../process1.cc83bc68-6cdd-484e-9047-044848d04bc3/0/resources/defaultprocessicon.png',
    
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
        
          'pag1',
        
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

  
			//	MakePageTypeObject for pag1 standard
		// MakePageObject pag1 type standard  pageprefix  questionprefix 
          pag1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					text1 : 'text1'
            }
          },

  

		Terminator : {
		qIdMap : {
		}
		}
		},
    dataIdMap : {
    
      'can_connect': {
      qIds: [
      
      ]
      },
      'deviceclient': {
      qIds: [
      
      ]
      },
      'deviceformat': {
      qIds: [
      
      ]
      },
      'deviceplatform': {
      qIds: [
      
      ]
      },
      'is_2g_at_least': {
      qIds: [
      
      ]
      },
      'is_3g_atleast': {
      qIds: [
      
      ]
      },
      'is_server_subject': {
      qIds: [
      
      ]
      },
      'is_wifi_at_least': {
      qIds: [
      
      ]
      },
      'orientation': {
      qIds: [
      
      ]
      },
      'text1': {
      qIds: [
      
        'text1'
      ]
      }
    },
  
        questions : {
        

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
		mc.fl.action_NewSubject=    
function($$result) {
    switch( this.state ) {
        case 1:
            this.locals.$$ret = "---remove---";
            this.state=2;
            mc.fl.msgbox( this, "This is a script template for creating an arbitrary new subject and you must modify the script" );
            return this.async( );
        case 2:
            this.locals.$$asf1 = $$result;
            this.locals.$$ret = this.locals.$$asf1;
            this.locals.$$ret = "---remove---";
            this.locals.currentguid=mc.fl.currentsubject(  );
            this.locals.$$ret = mc.fl.setenvironment( "parentGuid", this.locals.currentguid );
            this.state=3;
            mc.fl.createsubject( this, "[Your process id replaces this]" );
            return this.async( );
        case 3:
            this.locals.$$asf2 = $$result;
            this.locals.newsubjectguid=this.locals.$$asf2;
            this.state=4;
            mc.fl.modifysubjectsyncinfo( this, this.locals.newsubjectguid, "parentGuid", this.locals.currentguid );
            return this.async( );
        case 4:
            this.locals.$$asf3 = $$result;
            this.locals.$$ret = this.locals.$$asf3;
            this.locals.$$ret = mc.fl.pushsubject(  );
            this.state=5;
            mc.fl.opensubject( this, this.locals.newsubjectguid );
            return this.async( );
        case 5:
            this.locals.$$asf4 = $$result;
            this.locals.$$ret = this.locals.$$asf4;
    }
    return this.done( this.locals.$$ret);
}
;
		
		

		// end of mc.fl.action_NewSubject
	
		// MakePageToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_Start_transition=    
function($$result) {
    if( true )
    {
        this.locals.$$ret = mc.fl.pushpage(  );
        return this.done( "pag1" );
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
		
			mc.fl.action_pag1_transition=    
function($$result) {
    return this.done( "" );
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_pag1_pageForward=mc.fl.action_pag1_transition;
				
			// end of mc.fl.action_pag1_pageForward
		

	// Question hide formulas for page pag1
	// Page hide formula for page pag1
    mc.fl.pageHide_pag1=function(callback) {
			
		}; // end of mc.fl.pageHide_pag1
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		

		// Cross page functions
		// These should all be in the calcval entries in the question section
		
		
				mc.fl.fn_can_connect = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    switch( this.state ) {
        case 1:
            this.state=4;
            mc.fl.isreachable( this, 3000 );
            return this.async( );
        case 4:
            this.locals.$$asf1 = $$result;
            if( this.locals.$$asf1 )

            {
                return this.done( "true" );
                return this.go_to(3);
            }
        case 2:
                return this.done( "false" );
            return this.go_to(3);
        case 3:
            ;
    }
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_can_connect");
				}
				);};// end of mc.fl.fn_can_connect
		
				mc.fl.fn_deviceclient = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getcodetype(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_deviceclient");
				}
				);};// end of mc.fl.fn_deviceclient
		
				mc.fl.fn_deviceformat = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getformattype(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_deviceformat");
				}
				);};// end of mc.fl.fn_deviceformat
		
				mc.fl.fn_deviceplatform = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getplatform(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_deviceplatform");
				}
				);};// end of mc.fl.fn_deviceplatform
		
				mc.fl.fn_is_2g_at_least = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    if( mc.fl.canconnectatleast( "2g" ) )
    {
        return this.done( "true" );
    }

    else
    {
        return this.done( "false" );
    }

    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_is_2g_at_least");
				}
				);};// end of mc.fl.fn_is_2g_at_least
		
				mc.fl.fn_is_3g_atleast = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    if( mc.fl.canconnectatleast( "3g" ) )
    {
        return this.done( "true" );
    }

    else
    {
        return this.done( "false" );
    }

    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_is_3g_atleast");
				}
				);};// end of mc.fl.fn_is_3g_atleast
		
				mc.fl.fn_is_server_subject = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    if( mc.fl.isserversubject(  ) === true )
    {
        return this.done( "true" );
    }

    else
    {
        return this.done( "false" );
    }

    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_is_server_subject");
				}
				);};// end of mc.fl.fn_is_server_subject
		
				mc.fl.fn_is_wifi_at_least = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    if( mc.fl.canconnectviawifi(  ) )
    {
        return this.done( "true" );
    }

    else
    {
        return this.done( "false" );
    }

    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_is_wifi_at_least");
				}
				);};// end of mc.fl.fn_is_wifi_at_least
		
				mc.fl.fn_orientation = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getorientation(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_orientation");
				}
				);};// end of mc.fl.fn_orientation
		

		// Subject Summaries
			mc.fl.summaries = {
			
		name :     
function($$result) {
    if( true )
    {
        return this.done( "Please change before deployment" );
    }

    return this.done( this.locals.$$ret);
}
,
		iscomplete :     
function($$result) {
    if( true )
    {
        return this.done( "" );
    }

    return this.done( this.locals.$$ret);
}
,
		ishidden :     
function($$result) {
    if( true )
    {
        return this.done( "" );
    }

    return this.done( this.locals.$$ret);
}

		
	}; // end of mc.fl.summaries()

	
	// Replication profile formulas and contexts
		
			
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


  