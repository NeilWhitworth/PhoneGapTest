
	//visualize.js file for live operation
			
  //use60Styling:
  //useProcessLocation:
  //useProcessLibrary:
   //Device type Android
   //Device format tablet
   //Device client unrestricted
   //User is 
   //mSuiteSerialNo = 
   //process id process1.82eb013f-19f2-4f85-9bec-2a90eb2d74e4(0)
   //process name Test

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
    id : 'process1.82eb013f-19f2-4f85-9bec-2a90eb2d74e4',
    
    title : 'Test',
    version : '0',
    
        home: false,
      
        isaprocess: true,
        
            hidden : false,
          
    replicateSplashUrl: '',
    
      url: '../../process1.82eb013f-19f2-4f85-9bec-2a90eb2d74e4/0/visualize.html',
    
    icon : '../../process1.82eb013f-19f2-4f85-9bec-2a90eb2d74e4/0/resources/defaultprocessicon.png',
    
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
        
          'Test',
        
          'Testgrd1Capture',
    
          'unlinked_page_1',
        
          'pagegroup1',
        
          'pg1',
        
          'pg2',
        
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

  
			//	MakePageTypeObject for Test standard
		// MakePageObject Test type standard  pageprefix  questionprefix 
          Test : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					txtTest : 'txtTest',
              drpTest : 'drpTest',
              Tab1 : 'Tab1',
              grd1 : 'grd1',
              Label1 : 'Label1',
              Label2 : 'Label2',
              dt1 : 'dt1',
              Lst1 : 'Lst1',
              Radio1 : 'Radio1'
            }
          },

  
          //grid page Test
          Testgrd1Capture : {
            qIdMap : {
              
            }
          },
          
			//	MakePageTypeObject for unlinked_page_1 standard
		// MakePageObject unlinked_page_1 type standard  pageprefix  questionprefix 
          unlinked_page_1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					ft65 : 'ft65'
            }
          },

  
			//	MakePageTypeObject for pagegroup1 pagegroup
		// MakePageObject pagegroup1 type pagegroup  pageprefix  questionprefix 
          pagegroup1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					pgdate1 : 'pgdate1',
              ft26378 : 'ft26378'
            }
          },

  
		// MakePageObject pg1 type standard  pageprefix pagegroup1 questionprefix pg1
          pagegroup1pg1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					pgdate1 : 'pgdate1'
            }
          },

  
		// MakePageObject pg1 type standard  pageprefix  questionprefix pg1
          pg1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					pgdate1 : 'pgdate1'
            }
          },

  
		// MakePageObject pg1 type standard  pageprefix pagegroup1 questionprefix 
          pagegroup1pg1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					pgdate1 : 'pgdate1'
            }
          },

  
		// MakePageObject pg1 type standard  pageprefix  questionprefix pg1
          pg1 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					pgdate1 : 'pgdate1'
            }
          },

  
		// MakePageObject pg2 type standard  pageprefix pagegroup1 questionprefix pg2
          pagegroup1pg2 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					ft26378 : 'ft26378'
            }
          },

  
		// MakePageObject pg2 type standard  pageprefix  questionprefix pg2
          pg2 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					ft26378 : 'ft26378'
            }
          },

  
		// MakePageObject pg2 type standard  pageprefix pagegroup1 questionprefix 
          pagegroup1pg2 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					ft26378 : 'ft26378'
            }
          },

  
		// MakePageObject pg2 type standard  pageprefix  questionprefix pg2
          pg2 : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					ft26378 : 'ft26378'
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
      'txtTest': {
      qIds: [
      
        'txtTest'
      ]
      },
      'drpTest': {
      qIds: [
      
        'drpTest'
      ]
      },
      'Tab1': {
      qIds: [
      
        'Tab1'
      ]
      },
      'grd1': {
      qIds: [
      
        'grd1'
      ]
      },
      'Label1': {
      qIds: [
      
        'Label1'
      ]
      },
      'Label2': {
      qIds: [
      
        'Label2'
      ]
      },
      'dt1': {
      qIds: [
      
        'dt1'
      ]
      },
      'txtTest_2': {
      qIds: [
      
      ]
      },
      'drpTest_2': {
      qIds: [
      
      ]
      },
      'Tab1_2': {
      qIds: [
      
      ]
      },
      'grd1_2': {
      qIds: [
      
      ]
      },
      'Label1_2': {
      qIds: [
      
      ]
      },
      'Label2_2': {
      qIds: [
      
      ]
      },
      'dt1_2': {
      qIds: [
      
      ]
      },
      'Lst1': {
      qIds: [
      
        'Lst1'
      ]
      },
      'Radio1': {
      qIds: [
      
        'Radio1'
      ]
      },
      'ft65': {
      qIds: [
      
        'ft65'
      ]
      },
      'pgdate1': {
      qIds: [
      
        'pgdate1'
      ]
      },
      'ft26378': {
      qIds: [
      
        'ft26378'
      ]
      },
      'txtTest_1': {
      qIds: [
      
      ]
      },
      'drpTest_1': {
      qIds: [
      
      ]
      },
      'Tab1_1': {
      qIds: [
      
      ]
      },
      'grd1_1': {
      qIds: [
      
      ]
      },
      'Label1_1': {
      qIds: [
      
      ]
      },
      'Label2_1': {
      qIds: [
      
      ]
      },
      'dt1_1': {
      qIds: [
      
      ]
      },
      'Lst1_1': {
      qIds: [
      
      ]
      },
      'Radio1_1': {
      qIds: [
      
      ]
      },
      'drpTest_5': {
      qIds: [
      
      ]
      },
      'can_connect_1': {
      qIds: [
      
      ]
      },
      'deviceclient_1': {
      qIds: [
      
      ]
      },
      'deviceformat_1': {
      qIds: [
      
      ]
      },
      'deviceplatform_1': {
      qIds: [
      
      ]
      },
      'is_2g_at_least_1': {
      qIds: [
      
      ]
      },
      'is_3g_atleast_1': {
      qIds: [
      
      ]
      },
      'is_server_subject_1': {
      qIds: [
      
      ]
      },
      'is_wifi_at_least_1': {
      qIds: [
      
      ]
      },
      'orientation_1': {
      qIds: [
      
      ]
      },
      'txtTest_6': {
      qIds: [
      
      ]
      },
      'drpTest_7': {
      qIds: [
      
      ]
      },
      'Tab1_6': {
      qIds: [
      
      ]
      },
      'grd1_6': {
      qIds: [
      
      ]
      },
      'Label1_6': {
      qIds: [
      
      ]
      },
      'Label2_6': {
      qIds: [
      
      ]
      },
      'dt1_6': {
      qIds: [
      
      ]
      }
    },
  
        questions : {
        
			grd1 : {

		
			latch: false,
				


			columns:[
			
			]
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
		
			mc.fl.action_Test_transition=    
function($$result) {
    if( true )
    {
        this.locals.$$ret = mc.fl.pushpage(  );
        return this.done( "pagegroup1" );
    }

    this.locals.$$ret = mc.fl.currentpage(  );
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_Test_pageForward=mc.fl.action_Test_transition;
				
			// end of mc.fl.action_Test_pageForward
		

			// call the named action from the grid on tap 
				
	
	// Question hide formulas for page Test
	// Page hide formula for page Test
    mc.fl.pageHide_Test=function(callback) {
			
		}; // end of mc.fl.pageHide_Test
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
	// Question hide formulas for page Testgrd1Capture
	// Page hide formula for page Testgrd1Capture
    mc.fl.pageHide_Testgrd1Capture=function(callback) {
			
		}; // end of mc.fl.pageHide_Testgrd1Capture
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		
		mc.fl.action_Testgrd1Capture_Validate=    
function($$result) {
    return this.done( true );
    return this.done( this.locals.$$ret);
}
;
		
		
	
		// MakePageToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_pagegroup1_pageBack=    
function($$result) {
    this.locals.$$ret = mc.fl.poppage(  );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pagegroup1_pageBack
		
			mc.fl.action_pagegroup1_pageNext=    
function($$result) {
    return this.done( "" );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pagegroup1_pageNext
		
			mc.fl.action_pagegroup1_pageHome=    
function($$result) {
    return this.done( "" );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pagegroup1_pageHome
		
			mc.fl.action_pagegroup1_transition=    
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( !(mc.fl.ishidden( "pagegroup1", "ft26378" ) ) ) ) { return this.go_to(2); }
                this.state=5;
                mc.fl.isanswered( this, "pagegroup1", "ft26378" );
                return this.async( );
        case 5:
                this.locals.$$asf1 = $$result;
                if( !( this.locals.$$asf1 ) ) { return this.go_to(3); }
                    this.state=6;
                    mc.fl.ans( this, "pagegroup1", "ft26378" );
                    return this.async( );
        case 6:
                    this.locals.$$asf2 = $$result;
                    this.locals.pagegroup1_ft26378=this.locals.$$asf2;
                return this.go_to(4);
        case 3:
                    this.locals.pagegroup1_ft26378="";
                return this.go_to(4);
        case 4:
                ;
                if( !( !(mc.fl.matchregex( this.locals.pagegroup1_ft26378, "^...+$" ) ) ) ) { return this.go_to(7); }
                    this.state=8;
                    mc.fl.msgbox( this, "qid = ft26378 - Input format, does not match ^...+$", "Error", 0, 48 );
                    return this.async( );
        case 8:
                    this.locals.$$asf3 = $$result;
                    this.locals.$$ret = this.locals.$$asf3;
                    this.locals.$$ret = mc.fl.setfocus( "ft26378" );
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
			mc.fl.action_pagegroup1_pageForward=mc.fl.action_pagegroup1_transition;
				
			// end of mc.fl.action_pagegroup1_pageForward
		



		// Question hide formulas for pagegroup page pagegroup1
		// Page hide formula for pagegroup page pagegroup1
    mc.fl.pageHide_pagegroup1=function(callback) {
			
		}; // end of mc.fl.pageHide_pagegroup1
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
// Bind the page hide formula to any controls that use refreshhidden() to change the page display
	
		// Bind the page refresh formula to any controls that use refreshquestion() to change the page display
		
	
		// MakeProcessToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_pg1_pageBack=    
function($$result) {
    return this.done( mc.fl.poppage(  ) );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pg1_pageBack
		
			mc.fl.action_pg1_pageNext=    
function($$result) {
    this.locals.$$ret = mc.fl.pagenext(  );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pg1_pageNext
		
			mc.fl.action_pg1_pageHome=    
function($$result) {
    this.locals.$$ret = mc.fl.pagehome(  );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pg1_pageHome
		
			mc.fl.action_pg1_page_NewSubject=    
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
				
			// end of mc.fl.action_pg1_page_NewSubject
		

				// no hide formulas for sub page pg1 in pagegroup pagegroup1
	
		// MakeProcessToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_pg2_pageBack=    
function($$result) {
    return this.done( mc.fl.poppage(  ) );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pg2_pageBack
		
			mc.fl.action_pg2_pageNext=    
function($$result) {
    this.locals.$$ret = mc.fl.pagenext(  );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pg2_pageNext
		
			mc.fl.action_pg2_pageHome=    
function($$result) {
    this.locals.$$ret = mc.fl.pagehome(  );
    return this.done( this.locals.$$ret);
}
;
				
			// end of mc.fl.action_pg2_pageHome
		
			mc.fl.action_pg2_page_NewSubject=    
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
				
			// end of mc.fl.action_pg2_page_NewSubject
		

				// no hide formulas for sub page pg2 in pagegroup pagegroup1
	
		// MakePageToolbarActions - Action formulas to be bound to navigation and action buttons
		
			mc.fl.action_Start_transition=    
function($$result) {
    if( true )
    {
        this.locals.$$ret = mc.fl.pushpage(  );
        return this.done( "Test" );
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
		
			mc.fl.action_unlinked_page_1_transition=    
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( !(mc.fl.ishidden( "unlinked_page_1", "ft65" ) ) ) ) { return this.go_to(2); }
                this.state=5;
                mc.fl.isanswered( this, "unlinked_page_1", "ft65" );
                return this.async( );
        case 5:
                this.locals.$$asf1 = $$result;
                if( !( this.locals.$$asf1 ) ) { return this.go_to(3); }
                    this.state=6;
                    mc.fl.ans( this, "unlinked_page_1", "ft65" );
                    return this.async( );
        case 6:
                    this.locals.$$asf2 = $$result;
                    this.locals.unlinked_page_1_ft65=this.locals.$$asf2;
                return this.go_to(4);
        case 3:
                    this.locals.unlinked_page_1_ft65="";
                return this.go_to(4);
        case 4:
                ;
                if( !( !(mc.fl.matchregex( this.locals.unlinked_page_1_ft65, "^.+$" ) ) ) ) { return this.go_to(7); }
                    this.state=8;
                    mc.fl.msgbox( this, "qid = ft65 - Input format, does not match ^.+$", "Error", 0, 48 );
                    return this.async( );
        case 8:
                    this.locals.$$asf3 = $$result;
                    this.locals.$$ret = this.locals.$$asf3;
                    this.locals.$$ret = mc.fl.setfocus( "ft65" );
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
			mc.fl.action_unlinked_page_1_pageForward=mc.fl.action_unlinked_page_1_transition;
				
			// end of mc.fl.action_unlinked_page_1_pageForward
		

	// Question hide formulas for page unlinked_page_1
	// Page hide formula for page unlinked_page_1
    mc.fl.pageHide_unlinked_page_1=function(callback) {
			
		}; // end of mc.fl.pageHide_unlinked_page_1
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
		
				mc.fl.fn_can_connect_1 = function(callback
				
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
				alert("Transform Asynchronous function failure: mc.fl.fn_can_connect_1");
				}
				);};// end of mc.fl.fn_can_connect_1
		
				mc.fl.fn_deviceclient_1 = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getcodetype(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_deviceclient_1");
				}
				);};// end of mc.fl.fn_deviceclient_1
		
				mc.fl.fn_deviceformat_1 = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getformattype(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_deviceformat_1");
				}
				);};// end of mc.fl.fn_deviceformat_1
		
				mc.fl.fn_deviceplatform_1 = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getplatform(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_deviceplatform_1");
				}
				);};// end of mc.fl.fn_deviceplatform_1
		
				mc.fl.fn_is_2g_at_least_1 = function(callback
				
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
				alert("Transform Asynchronous function failure: mc.fl.fn_is_2g_at_least_1");
				}
				);};// end of mc.fl.fn_is_2g_at_least_1
		
				mc.fl.fn_is_3g_atleast_1 = function(callback
				
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
				alert("Transform Asynchronous function failure: mc.fl.fn_is_3g_atleast_1");
				}
				);};// end of mc.fl.fn_is_3g_atleast_1
		
				mc.fl.fn_is_server_subject_1 = function(callback
				
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
				alert("Transform Asynchronous function failure: mc.fl.fn_is_server_subject_1");
				}
				);};// end of mc.fl.fn_is_server_subject_1
		
				mc.fl.fn_is_wifi_at_least_1 = function(callback
				
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
				alert("Transform Asynchronous function failure: mc.fl.fn_is_wifi_at_least_1");
				}
				);};// end of mc.fl.fn_is_wifi_at_least_1
		
				mc.fl.fn_orientation_1 = function(callback
				
				) {
				make_formula(
				    
function($$result) {
    return this.done( mc.fl.getorientation(  ) );
    return this.done( this.locals.$$ret);
}

				).execute(function(result)
				{ callback.resume(result);},
				function(){
				alert("Transform Asynchronous function failure: mc.fl.fn_orientation_1");
				}
				);};// end of mc.fl.fn_orientation_1
		

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


  