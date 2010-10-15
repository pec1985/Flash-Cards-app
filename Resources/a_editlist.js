var a_editList = function(){

	var a_view = Ti.UI.createView({bottom:48});
	var a_viewListTopbar = Ti.UI.createView({left:0,right:0,top:0,height:44,backgroundImage:'navbarbg.png'});
	var a_viewTitle = Ti.UI.createLabel({ text:'Edit Subjects',color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	var a_viewListTable = Ti.UI.createTableView({backgroundColor:'white',top:44});
	var addButton = Ti.UI.createImageView({image:'a_add.png',top:9,right:5});
	a_viewListTopbar.add(a_viewTitle);
	a_view.add(a_viewListTopbar);
	a_view.add(a_viewListTable);
	a_view.add(addButton);
	
	var timer; 
	var confirmDel = function(rowId,rowName) {
		var msgTitle = "Delete Entire Subject"; 
		var msgText = "Are you sure you want to delete the '"+rowName+"' subject?"; 
	    var statusAlert = Titanium.UI.createAlertDialog({title:msgTitle,message:msgText,buttonNames: ['Cancel','Ok']});
	    statusAlert.show();
	    statusAlert.addEventListener('click',function(e){
	    	if (e.index == 0){statusAlert.hide();}
	    	if (e.index == 1){
				var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
				db.execute("DELETE FROM subjects WHERE id = ?", rowId);
				db.close();
				refresh();
			}
	    });
	    
	};
	var tapAndHold = function(e){
		e.addEventListener('touchstart', function(e){
		    timer = setTimeout(function() {
		        confirmDel(e.source.rowId,e.source.rowName);
		    }, 500);
		});
		e.addEventListener('touchend', function(e){
		    clearTimeout(timer);
		});
	};
	
	var refresh = function(){
	var data = [];
	var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
	var rows = db.execute("SELECT * FROM subjects ORDER BY subject");
	var x = 0;
	while (rows.isValidRow()){
		var subjectName = rows.fieldByName('subject');
		var id = rows.fieldByName('id');
		var row = Ti.UI.createTableViewRow({backgroundColor:'white',subjectId:id,subjectName:subjectName,hasChild:true});
		var touchView = Ti.UI.createView({ rowId:id,rowName:subjectName,left:0, top:0, right:0, bottom:0 }); // invisible view to capture touch
		var label = Ti.UI.createLabel({text:subjectName, left:10,color:'black'});
		row.add(label);
		row.add(touchView);
		tapAndHold(row);
		data[x++] = row;
		rows.next();
	};
	rows.close();
	db.close();
	a_viewListTable.data=data;
	};
	refresh();
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:1024, height:11,top:44});
	a_view.add(navbarShadow);
	var window;
	addButton.addEventListener('click',function(){
		window = addSubjectsWindow();
		window.open();
		window.addEventListener('close',function(){
				refresh();
		});
		
	});

	a_viewListTable.addEventListener('click',function(e){
		window = addChapters(e.rowData.subjectId);
		window.open();
		window.addEventListener('close',function(){
				refresh();
		});
		
	});

	
	return a_view;
};
