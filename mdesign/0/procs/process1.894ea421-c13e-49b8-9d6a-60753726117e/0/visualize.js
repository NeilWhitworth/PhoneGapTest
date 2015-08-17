
	//visualize.js file for live operation
			
  //use60Styling:
  //useProcessLocation:
  //useProcessLibrary:
   //Device type Android
   //Device format tablet
   //Device client unrestricted
   //User is 
   //mSuiteSerialNo = 
   //process id process1.894ea421-c13e-49b8-9d6a-60753726117e(0)
   //process name tre

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
    id : 'process1.894ea421-c13e-49b8-9d6a-60753726117e',
    
    title : 'tre',
    version : '0',
    
        home: false,
      
        isaprocess: true,
        
            hidden : false,
          
    replicateSplashUrl: '',
    
      url: '../../process1.894ea421-c13e-49b8-9d6a-60753726117e/0/visualize.html',
    
    icon : '../../process1.894ea421-c13e-49b8-9d6a-60753726117e/0/resources/defaultprocessicon.png',
    
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
        
          'eqw',
        
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

  
			//	MakePageTypeObject for eqw standard
		// MakePageObject eqw type standard  pageprefix  questionprefix 
          eqw : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					ft2 : 'ft2',
              ft1 : 'ft1'
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
      'ft1': {
      qIds: [
      
        'ft1'
      ]
      },
      'ft2': {
      qIds: [
      
        'ft2'
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
        return this.done( "eqw" );
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
		
			mc.fl.action_eqw_transition=    
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( !(mc.fl.ishidden( "eqw", "ft2" ) ) ) ) { return this.go_to(2); }
                this.state=5;
                mc.fl.isanswered( this, "eqw", "ft2" );
                return this.async( );
        case 5:
                this.locals.$$asf1 = $$result;
                if( !( this.locals.$$asf1 ) ) { return this.go_to(3); }
                    this.state=6;
                    mc.fl.ans( this, "eqw", "ft2" );
                    return this.async( );
        case 6:
                    this.locals.$$asf2 = $$result;
                    this.locals.eqw_ft2=this.locals.$$asf2;
                return this.go_to(4);
        case 3:
                    this.locals.eqw_ft2="";
                return this.go_to(4);
        case 4:
                ;
                if( !( !(mc.fl.matchregex( this.locals.eqw_ft2, ".*" ) ) ) ) { return this.go_to(7); }
                    this.state=8;
                    mc.fl.msgbox( this, "qid = ft2 - Input format, does not match .*", "Error", 0, 48 );
                    return this.async( );
        case 8:
                    this.locals.$$asf3 = $$result;
                    this.locals.$$ret = this.locals.$$asf3;
                    this.locals.$$ret = mc.fl.setfocus( "ft2" );
                    return this.done( mc.fl.currentpage(  ) );
                return this.go_to(7);
        case 7:
                ;
            return this.go_to(2);
        case 2:
            ;
            if( !( !(mc.fl.ishidden( "eqw", "ft1" ) ) ) ) { return this.go_to(9); }
                this.state=12;
                mc.fl.isanswered( this, "eqw", "ft1" );
                return this.async( );
        case 12:
                this.locals.$$asf4 = $$result;
                if( !( this.locals.$$asf4 ) ) { return this.go_to(10); }
                    this.state=13;
                    mc.fl.ans( this, "eqw", "ft1" );
                    return this.async( );
        case 13:
                    this.locals.$$asf5 = $$result;
                    this.locals.eqw_ft1=this.locals.$$asf5;
                return this.go_to(11);
        case 10:
                    this.locals.eqw_ft1="";
                return this.go_to(11);
        case 11:
                ;
                if( !( !(mc.fl.matchregex( this.locals.eqw_ft1, "^.*$" ) ) ) ) { return this.go_to(14); }
                    this.state=15;
                    mc.fl.msgbox( this, "qid = ft1 - Input format, does not match ^.*$", "Error", 0, 48 );
                    return this.async( );
        case 15:
                    this.locals.$$asf6 = $$result;
                    this.locals.$$ret = this.locals.$$asf6;
                    this.locals.$$ret = mc.fl.setfocus( "ft1" );
                    return this.done( mc.fl.currentpage(  ) );
                return this.go_to(14);
        case 14:
                ;
            return this.go_to(9);
        case 9:
            ;
            return this.done( "" );
    }
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_eqw_pageForward=mc.fl.action_eqw_transition;
				
			// end of mc.fl.action_eqw_pageForward
		

	// Question hide formulas for page eqw
	// Page hide formula for page eqw
    mc.fl.pageHide_eqw=function(callback) {
			
		}; // end of mc.fl.pageHide_eqw
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


  