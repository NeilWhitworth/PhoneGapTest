
	//visualize.js file for live operation
			
  //use60Styling:
  //useProcessLocation:
  //useProcessLibrary:
   //Device type Android
   //Device format tablet
   //Device client unrestricted
   //User is 
   //mSuiteSerialNo = 
   //process id process0.144db337-fce4-4fca-a686-47b1036cc5d2(0)
   //process name yu

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
    id : 'process0.144db337-fce4-4fca-a686-47b1036cc5d2',
    
    title : 'yu',
    version : '0',
    
        home: false,
      
        isaprocess: false,
        hidden : true,
        separator : '',
      
    replicateSplashUrl: '',
    
      url: '../../process0.144db337-fce4-4fca-a686-47b1036cc5d2/0/visualize.html',
    
    icon : '../../process0.144db337-fce4-4fca-a686-47b1036cc5d2/0/resources/defaultprocessicon.png',
    
    description : '',

    
        notClientCreatable: false,
      
      // Subject Summaries
      summaryMap : [
      
		
        'name',
		
        'iscomplete',
		
        'ishidden',
		
        'FirstName',
		
        'Initials',
		
        'LastName',
		
        'DisplayName',
		
        'Description',
		
        'Office',
		
        'HomeTel1',
		
        'HomeTel2',
		
        'WorkTel1',
		
        'WorkTel2',
		
        'Pager',
		
        'MobileTel1',
		
        'MobileTel2',
		
        'HomeFax',
		
        'WorkFax',
		
        'Email1',
		
        'Email2',
		
        'Email3',
		
        'Address1',
		
        'Address2',
		
        'Address3',
		
        'Address4',
		
        'PoBox',
		
        'City',
		
        'State',
		
        'ZIP',
		
        'Country',
		
        'Title',
		
        'Department',
		
        'Company',
		
        'AuthName',
		
        'Password',
		
        'Roles',
		
        'AuthSeq',
		
        'AllowWebFrom',
		
        'AllowWebTo',
		
        'LockedBy',
		
        'ConnectedTo',
		
        'AuthChallenge',
		
        'NotifySeq',
		
        'LastDeviceID',
		
        'LastProductUse0',
		
        'LastProductUse1',
		
        'LastProductUse2',
		
        'LastProductUse3',
		
        'LastProductUse4',
		
        'LastProductUse5',
		
        'InputPropertyName',
		
        'InputPropertyValue',
		
        'OutPutPropertyName',
		
        'OutputPropertyValue',
		
        'SavedNoteSeqn',
		
        'AuthAlias',
		
        'ForeignSyncUID',
		
        'ForeignSyncComp'
		
      ],

      
        pageslist : [
  
          'DATA',
        
          'Terminator'
        ],

		pages : {

		
			//	MakePageTypeObject for DATA standard
		// MakePageObject DATA type standard  pageprefix  questionprefix 
          DATA : {
					
        // process footer button templates
        footerButtonTemplateList : {
     } ,
  
					qIdMap : {
					FirstName : 'FirstName',
              Initials : 'Initials',
              LastName : 'LastName',
              DisplayName : 'DisplayName',
              Description : 'Description',
              Office : 'Office',
              HomeTel1 : 'HomeTel1',
              HomeTel2 : 'HomeTel2',
              WorkTel1 : 'WorkTel1',
              WorkTel2 : 'WorkTel2',
              Pager : 'Pager',
              MobileTel1 : 'MobileTel1',
              MobileTel2 : 'MobileTel2',
              HomeFax : 'HomeFax',
              WorkFax : 'WorkFax',
              Email1 : 'Email1',
              Email2 : 'Email2',
              Email3 : 'Email3',
              Address1 : 'Address1',
              Address2 : 'Address2',
              Address3 : 'Address3',
              Address4 : 'Address4',
              PoBox : 'PoBox',
              City : 'City',
              State : 'State',
              ZIP : 'ZIP',
              Country : 'Country',
              Title : 'Title',
              Department : 'Department',
              Company : 'Company',
              AuthName : 'AuthName',
              Password : 'Password',
              Roles : 'Roles',
              AuthSeq : 'AuthSeq',
              AllowWebFrom : 'AllowWebFrom',
              AllowWebTo : 'AllowWebTo',
              LockedBy : 'LockedBy',
              ConnectedTo : 'ConnectedTo',
              AuthChallenge : 'AuthChallenge',
              NotifySeq : 'NotifySeq',
              LastDeviceID : 'LastDeviceID',
              LastProductUse0 : 'LastProductUse0',
              LastProductUse1 : 'LastProductUse1',
              LastProductUse2 : 'LastProductUse2',
              LastProductUse3 : 'LastProductUse3',
              LastProductUse4 : 'LastProductUse4',
              LastProductUse5 : 'LastProductUse5',
              InputPropertyName : 'InputPropertyName',
              InputPropertyValue : 'InputPropertyValue',
              OutPutPropertyName : 'OutPutPropertyName',
              OutputPropertyValue : 'OutputPropertyValue',
              SavedNoteSeqn : 'SavedNoteSeqn',
              AuthAlias : 'AuthAlias',
              ForeignSyncUID : 'ForeignSyncUID',
              ForeignSyncComp : 'ForeignSyncComp'
            }
          },

  

		Terminator : {
		qIdMap : {
		}
		}
		},
    dataIdMap : {
    
      'FirstName': {
      qIds: [
      
        'FirstName'
      ]
      },
      'Initials': {
      qIds: [
      
        'Initials'
      ]
      },
      'LastName': {
      qIds: [
      
        'LastName'
      ]
      },
      'DisplayName': {
      qIds: [
      
        'DisplayName'
      ]
      },
      'Description': {
      qIds: [
      
        'Description'
      ]
      },
      'Office': {
      qIds: [
      
        'Office'
      ]
      },
      'HomeTel1': {
      qIds: [
      
        'HomeTel1'
      ]
      },
      'HomeTel2': {
      qIds: [
      
        'HomeTel2'
      ]
      },
      'WorkTel1': {
      qIds: [
      
        'WorkTel1'
      ]
      },
      'WorkTel2': {
      qIds: [
      
        'WorkTel2'
      ]
      },
      'Pager': {
      qIds: [
      
        'Pager'
      ]
      },
      'MobileTel1': {
      qIds: [
      
        'MobileTel1'
      ]
      },
      'MobileTel2': {
      qIds: [
      
        'MobileTel2'
      ]
      },
      'HomeFax': {
      qIds: [
      
        'HomeFax'
      ]
      },
      'WorkFax': {
      qIds: [
      
        'WorkFax'
      ]
      },
      'Email1': {
      qIds: [
      
        'Email1'
      ]
      },
      'Email2': {
      qIds: [
      
        'Email2'
      ]
      },
      'Email3': {
      qIds: [
      
        'Email3'
      ]
      },
      'Address1': {
      qIds: [
      
        'Address1'
      ]
      },
      'Address2': {
      qIds: [
      
        'Address2'
      ]
      },
      'Address3': {
      qIds: [
      
        'Address3'
      ]
      },
      'Address4': {
      qIds: [
      
        'Address4'
      ]
      },
      'PoBox': {
      qIds: [
      
        'PoBox'
      ]
      },
      'City': {
      qIds: [
      
        'City'
      ]
      },
      'State': {
      qIds: [
      
        'State'
      ]
      },
      'ZIP': {
      qIds: [
      
        'ZIP'
      ]
      },
      'Country': {
      qIds: [
      
        'Country'
      ]
      },
      'Title': {
      qIds: [
      
        'Title'
      ]
      },
      'Department': {
      qIds: [
      
        'Department'
      ]
      },
      'Company': {
      qIds: [
      
        'Company'
      ]
      },
      'AuthName': {
      qIds: [
      
        'AuthName'
      ]
      },
      'Password': {
      qIds: [
      
        'Password'
      ]
      },
      'Roles': {
      qIds: [
      
        'Roles'
      ]
      },
      'AuthSeq': {
      qIds: [
      
        'AuthSeq'
      ]
      },
      'AllowWebFrom': {
      qIds: [
      
        'AllowWebFrom'
      ]
      },
      'AllowWebTo': {
      qIds: [
      
        'AllowWebTo'
      ]
      },
      'LockedBy': {
      qIds: [
      
        'LockedBy'
      ]
      },
      'ConnectedTo': {
      qIds: [
      
        'ConnectedTo'
      ]
      },
      'AuthChallenge': {
      qIds: [
      
        'AuthChallenge'
      ]
      },
      'NotifySeq': {
      qIds: [
      
        'NotifySeq'
      ]
      },
      'LastDeviceID': {
      qIds: [
      
        'LastDeviceID'
      ]
      },
      'LastProductUse0': {
      qIds: [
      
        'LastProductUse0'
      ]
      },
      'LastProductUse1': {
      qIds: [
      
        'LastProductUse1'
      ]
      },
      'LastProductUse2': {
      qIds: [
      
        'LastProductUse2'
      ]
      },
      'LastProductUse3': {
      qIds: [
      
        'LastProductUse3'
      ]
      },
      'LastProductUse4': {
      qIds: [
      
        'LastProductUse4'
      ]
      },
      'LastProductUse5': {
      qIds: [
      
        'LastProductUse5'
      ]
      },
      'InputPropertyName': {
      qIds: [
      
        'InputPropertyName'
      ]
      },
      'InputPropertyValue': {
      qIds: [
      
        'InputPropertyValue'
      ]
      },
      'OutPutPropertyName': {
      qIds: [
      
        'OutPutPropertyName'
      ]
      },
      'OutputPropertyValue': {
      qIds: [
      
        'OutputPropertyValue'
      ]
      },
      'SavedNoteSeqn': {
      qIds: [
      
        'SavedNoteSeqn'
      ]
      },
      'AuthAlias': {
      qIds: [
      
        'AuthAlias'
      ]
      },
      'ForeignSyncUID': {
      qIds: [
      
        'ForeignSyncUID'
      ]
      },
      'ForeignSyncComp': {
      qIds: [
      
        'ForeignSyncComp'
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
		
			mc.fl.action_DATA_transition=    
function($$result) {
    return this.done( "" );
    return this.done( this.locals.$$ret);
}
;
			mc.fl.action_DATA_pageForward=mc.fl.action_DATA_transition;
				
			// end of mc.fl.action_DATA_pageForward
		

	// Question hide formulas for page DATA
	// Page hide formula for page DATA
    mc.fl.pageHide_DATA=function(callback) {
			
		}; // end of mc.fl.pageHide_DATA
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
        return this.done( "true" );
    }

    return this.done( this.locals.$$ret);
}
,
		FirstName :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "FirstName" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Initials :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Initials" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastName :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastName" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		DisplayName :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "DisplayName" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Description :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Description" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Office :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Office" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		HomeTel1 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "HomeTel1" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		HomeTel2 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "HomeTel2" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		WorkTel1 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "WorkTel1" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		WorkTel2 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "WorkTel2" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Pager :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Pager" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		MobileTel1 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "MobileTel1" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		MobileTel2 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "MobileTel2" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		HomeFax :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "HomeFax" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		WorkFax :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "WorkFax" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Email1 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Email1" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Email2 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Email2" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Email3 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Email3" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Address1 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Address1" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Address2 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Address2" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Address3 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Address3" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Address4 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Address4" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		PoBox :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "PoBox" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		City :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "City" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		State :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "State" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		ZIP :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "ZIP" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Country :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Country" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Title :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Title" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Department :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Department" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Company :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Company" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		AuthName :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "AuthName" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Password :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Password" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		Roles :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "Roles" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		AuthSeq :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "AuthSeq" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		AllowWebFrom :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "AllowWebFrom" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		AllowWebTo :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "AllowWebTo" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LockedBy :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LockedBy" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		ConnectedTo :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "ConnectedTo" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		AuthChallenge :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "AuthChallenge" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		NotifySeq :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "NotifySeq" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastDeviceID :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastDeviceID" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastProductUse0 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastProductUse0" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastProductUse1 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastProductUse1" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastProductUse2 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastProductUse2" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastProductUse3 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastProductUse3" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastProductUse4 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastProductUse4" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		LastProductUse5 :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "LastProductUse5" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		InputPropertyName :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "InputPropertyName" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		InputPropertyValue :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "InputPropertyValue" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		OutPutPropertyName :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "OutPutPropertyName" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		OutputPropertyValue :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "OutputPropertyValue" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		SavedNoteSeqn :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "SavedNoteSeqn" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		AuthAlias :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "AuthAlias" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		ForeignSyncUID :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "ForeignSyncUID" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
    }
    return this.done( this.locals.$$ret);
}
,
		ForeignSyncComp :     
function($$result) {
    switch( this.state ) {
        case 1:
            if( !( true ) ) { return this.go_to(2); }
                this.state=3;
                mc.fl.ans( this, "DATA", "ForeignSyncComp" );
                return this.async( );
        case 3:
                this.locals.$$asf1 = $$result;
                return this.done( mc.fl.text( this.locals.$$asf1 ) );
            return this.go_to(2);
        case 2:
            ;
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


  