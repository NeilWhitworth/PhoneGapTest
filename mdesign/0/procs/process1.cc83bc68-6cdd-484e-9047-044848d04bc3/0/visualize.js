
	//visualize.js file for live operation
			
  //use60Styling:
  //useProcessLocation:
  //useProcessLibrary:
   //Device type Android
   //Device format tablet
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
        
          'changeme',
        
          'lookup',
        
          'p2',
        
          'p3',
        
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

  
			//	MakePageTypeObject for changeme standard
		// MakePageObject changeme type standard  pageprefix  questionprefix 
          changeme : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					text1 : 'text1',
              DropList1 : 'DropList1',
              cb1 : 'cb1',
              rb1 : 'rb1',
              combo1 : 'combo1',
              dd : 'dd'
            }
          },

  
			//	MakePageTypeObject for lookup lookup
		// MakePageObject lookup type lookup  pageprefix  questionprefix 
          lookup : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					
            }
          },

  
			//	MakePageTypeObject for p2 standard
		// MakePageObject p2 type standard  pageprefix  questionprefix 
          p2 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					lbl1 : 'lbl1',
              lbl2 : 'lbl2'
            }
          },

  
			//	MakePageTypeObject for p3 standard
		// MakePageObject p3 type standard  pageprefix  questionprefix 
          p3 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					date1 : 'date1',
              date2 : 'date2',
              ft6 : 'ft6',
              l8 : 'l8',
              lbl967 : 'lbl967'
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
      },
      'DropList1': {
      qIds: [
      
        'DropList1'
      ]
      },
      'cb1': {
      qIds: [
      
        'cb1'
      ]
      },
      'rb1': {
      qIds: [
      
        'rb1'
      ]
      },
      'combo1': {
      qIds: [
      
        'combo1'
      ]
      },
      'lbl1': {
      qIds: [
      
        'lbl1'
      ]
      },
      'date1': {
      qIds: [
      
        'date1'
      ]
      },
      'date2': {
      qIds: [
      
        'date2'
      ]
      },
      'lbl2': {
      qIds: [
      
        'lbl2'
      ]
      },
      'dd': {
      qIds: [
      
        'dd'
      ]
      },
      'ft6': {
      qIds: [
      
        'ft6'
      ]
      },
      'l8': {
      qIds: [
      
        'l8'
      ]
      },
      'lbl967': {
      qIds: [
      
        'lbl967'
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
        return this.done( "p2" );
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
		
			mc.fl.action_changeme_transition=    
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.locals.$$ret = mc.fl.setenvironment( "$$sourcepage", mc.fl.currentpage(  ) );
                this.locals.$$ret = mc.fl.setenvironment( "subject", mc.fl.currentsubject(  ) );
                this.state=3;
                mc.fl.replicatedialog( this, "process1.cc83bc68-6cdd-484e-9047-044848d04bc3", "fb195c8e-ce18-4fe1-bd1f-a7f968f7c496", "", "", 120 );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                this.locals.result=this.locals.$$asf1;
                this.locals.$$ret = mc.fl.setenvironment( "subject", "" );
                if( !( mc.fl.lowercase( mc.fl.getenvironment( "loginsucceeded" ) ) === "true" ) ) { return this.go_to(4); }
                    if( !( this.locals.result !== 0 ) ) { return this.go_to(6); }
                        this.state=8;
                        mc.fl.msgbox( this, "Sync Failed", "Error", 0, 48 );
                        return this.async( );
        case 8:
                        this.locals.$$asf2 = $$result;
                        this.locals.$$ret = this.locals.$$asf2;
                        return this.done( mc.fl.currentpage(  ) );
                    return this.go_to(7);
        case 6:
                        if( true )
                        {
                            this.locals.$$ret = mc.fl.pushpage(  );
                            return this.done( "changeme" );
                        }

                    return this.go_to(7);
        case 7:

                return this.go_to(5);
        case 4:
                    this.locals.$$ret = mc.fl.setenvironment( "username", "" );
                    this.locals.$$ret = mc.fl.setenvironment( "password", "" );
                    this.locals.$$ret = mc.fl.setenvironment( "token", "" );
                    this.locals.$$ret = mc.fl.setenvironment( "loginsucceeded", "false" );
                    this.state=9;
                    mc.fl.msgbox( this, "Login failed.", "Error", 0, 48 );
                    return this.async( );
        case 9:
                    this.locals.$$asf3 = $$result;
                    this.locals.$$ret = this.locals.$$asf3;
                    this.locals.$$ret = mc.fl.exitapp(  );
                    return this.done( "" );
                return this.go_to(5);
        case 5:
                ;
            return this.go_to(2);
        case 2:
            ;
            if( true )
            {
                this.locals.$$ret = mc.fl.pushpage(  );
                return this.done( "p3" );
            }

            this.locals.$$ret = mc.fl.currentpage(  );
    }
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_changeme_pageForward=mc.fl.action_changeme_transition;
				
			// end of mc.fl.action_changeme_pageForward
		

	// Question hide formulas for page changeme
		// Question hide formula for question cb1
		mc.fl.questionHide_changemecb1=function(callback) {
		
		make_formula(
		    
function($$result) {
    switch( this.state ) {
        case 1:
            this.state=2;
            mc.fl.isanswered( this, "changeme", "DropList1" );
            return this.async( );
        case 2:
            this.locals.$$asf1 = $$result;
            this.state=3;
            mc.fl.ans( this, "changeme", "DropList1" );
            return this.async( );
        case 3:
            this.locals.$$asf2 = $$result;
            this.locals.$$ret = this.locals.$$asf1 && mc.fl.contains( this.locals.$$asf2, "dl1" );
    }
    return this.done( this.locals.$$ret);
}

		).execute(function(result) {
			if(result){	
				mc.q.hide("changemecb1");
			}	else {
				mc.q.show("changemecb1");
			}
		}, function(){alert("Transform Asynchronous Function Failure: mc.fl.questionHide_changemecb1");}
		);
		if (callback && callback.constructor === Function) {
			callback();
		}
		};
	
	// Page hide formula for page changeme
    mc.fl.pageHide_changeme=function(callback) {
			
			var count;
			function hidden() {
				count -= 1;
				if (count === 0 && callback && callback.constructor === Function) {
					callback();
				}
			}
			count = 1;
			
		// Call question hide formula for question cb1
		mc.fl.questionHide_changemecb1(hidden);
	
		}; // end of mc.fl.pageHide_changeme
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
				// Change formula for question DropList1 on page changeme in section 
								$('#changemeDropList1').bind('change',function() {
							
						mc.currentPage($.ui.parentPage(this).id);
						mc.fl.refreshhidden(); 
						});
					
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		
	
		// MakePageToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_p2_transition=    
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.locals.$$ret = mc.fl.setenvironment( "$$sourcepage", mc.fl.currentpage(  ) );
                this.locals.$$ret = mc.fl.setenvironment( "subject", mc.fl.currentsubject(  ) );
                this.state=3;
                mc.fl.replicatedialog( this, "process1.cc83bc68-6cdd-484e-9047-044848d04bc3", "fb195c8e-ce18-4fe1-bd1f-a7f968f7c496", "", "", 120 );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                this.locals.result=this.locals.$$asf1;
                this.locals.$$ret = mc.fl.setenvironment( "subject", "" );
                if( !( mc.fl.lowercase( mc.fl.getenvironment( "loginsucceeded" ) ) === "true" ) ) { return this.go_to(4); }
                    if( !( this.locals.result !== 0 ) ) { return this.go_to(6); }
                        this.state=8;
                        mc.fl.msgbox( this, "Sync Failed", "Error", 0, 48 );
                        return this.async( );
        case 8:
                        this.locals.$$asf2 = $$result;
                        this.locals.$$ret = this.locals.$$asf2;
                        return this.done( mc.fl.currentpage(  ) );
                    return this.go_to(7);
        case 6:
                        if( true )
                        {
                            this.locals.$$ret = mc.fl.pushpage(  );
                            return this.done( "changeme" );
                        }

                    return this.go_to(7);
        case 7:

                return this.go_to(5);
        case 4:
                    this.locals.$$ret = mc.fl.setenvironment( "username", "" );
                    this.locals.$$ret = mc.fl.setenvironment( "password", "" );
                    this.locals.$$ret = mc.fl.setenvironment( "token", "" );
                    this.locals.$$ret = mc.fl.setenvironment( "loginsucceeded", "false" );
                    this.state=9;
                    mc.fl.msgbox( this, "Login failed.", "Error", 0, 48 );
                    return this.async( );
        case 9:
                    this.locals.$$asf3 = $$result;
                    this.locals.$$ret = this.locals.$$asf3;
                    this.locals.$$ret = mc.fl.exitapp(  );
                    return this.done( "" );
                return this.go_to(5);
        case 5:
                ;
            return this.go_to(2);
        case 2:
            ;
            this.locals.$$ret = mc.fl.currentpage(  );
    }
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_p2_pageForward=mc.fl.action_p2_transition;
				
			// end of mc.fl.action_p2_pageForward
		

	// Question hide formulas for page p2
	// Page hide formula for page p2
    mc.fl.pageHide_p2=function(callback) {
			
		}; // end of mc.fl.pageHide_p2
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		
	
		// MakePageToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_p3_transition=    
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( !(mc.fl.ishidden( "p3", "ft6" ) ) ) ) { return this.go_to(2); }
                this.state=5;
                mc.fl.isanswered( this, "p3", "ft6" );
                return this.async( );
        case 5:
                this.locals.$$asf1 = $$result;
                if( !( this.locals.$$asf1 ) ) { return this.go_to(3); }
                    this.state=6;
                    mc.fl.ans( this, "p3", "ft6" );
                    return this.async( );
        case 6:
                    this.locals.$$asf2 = $$result;
                    this.locals.p3_ft6=this.locals.$$asf2;
                return this.go_to(4);
        case 3:
                    this.locals.p3_ft6="";
                return this.go_to(4);
        case 4:
                ;
                if( !( !(mc.fl.matchregex( this.locals.p3_ft6, "^.+$" ) ) ) ) { return this.go_to(7); }
                    this.state=8;
                    mc.fl.msgbox( this, "qid = ft6 - Input format, does not match ^.+$", "Error", 0, 48 );
                    return this.async( );
        case 8:
                    this.locals.$$asf3 = $$result;
                    this.locals.$$ret = this.locals.$$asf3;
                    this.locals.$$ret = mc.fl.setfocus( "ft6" );
                    return this.done( mc.fl.currentpage(  ) );
                return this.go_to(7);
        case 7:
                ;
            return this.go_to(2);
        case 2:
            ;
            return this.done( "" );
    }
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_p3_pageForward=mc.fl.action_p3_transition;
				
			// end of mc.fl.action_p3_pageForward
		

	// Question hide formulas for page p3
	// Page hide formula for page p3
    mc.fl.pageHide_p3=function(callback) {
			
		}; // end of mc.fl.pageHide_p3
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
    switch( this.state ) {
        case 1:
            this.state=4;
            mc.fl.isanswered( this, "changeme", "DropList1" );
            return this.async( );
        case 4:
            this.locals.$$asf1 = $$result;
            this.state=5;
            mc.fl.ans( this, "changeme", "DropList1" );
            return this.async( );
        case 5:
            this.locals.$$asf2 = $$result;
            if( this.locals.$$asf1 && mc.fl.contains( this.locals.$$asf2, "dl1" ) )

            {
                return this.done( "bfh" );
                return this.go_to(3);
            }
        case 2:
                return this.done( "Please change before deployment" );
            return this.go_to(3);
        case 3:
            ;
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
		
			mc.fl.repl_fb195c8e_ce18_4fe1_bd1f_a7f968f7c496 = function( ) {
					make_formula(
					    
function($$result) {
    this.locals.$$ret = mc.fl.summaryitem( mc.fl.selectedsubject(  ), "guid" ) === mc.fl.getenvironment( "subject" );
    return this.done( this.locals.$$ret);
}

					).execute(function(result)
					{ return result;},
					function(){
					alert("Transform Asynchronous function failure: mc.fl.repl_fb195c8e_ce18_4fe1_bd1f_a7f968f7c496");
					}
					);
			};

			
		
	mc.fl.replContext_fb195c8e_ce18_4fe1_bd1f_a7f968f7c496={'type':'lookup',
		'context':{
			'username':'$username',
			'password':'$password',
			'token':'$token',
			'subject':'$subject',
			'query':'fb195c8e-ce18-4fe1-bd1f-a7f968f7c496',
			
			'targetprocess':''
			}
			};	// end of mc.fl.replContext_$username$password$token$subjectfb195c8e-ce18-4fe1-bd1f-a7f968f7c496

			
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


  