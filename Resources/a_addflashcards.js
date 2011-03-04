var addFlashcards = function(title,chapterId){
	var win = Ti.UI.createWindow({backgroundColor:'#ccc'});
	
	var a_topbar = Ti.UI.createView({left:0,right:0,top:0,height:44,backgroundImage:'navbarbg.png'});
	var a_viewTitle = Ti.UI.createLabel({ text:'Add Flashcards',color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	a_topbar.add(a_viewTitle);
	var closeButton = Ti.UI.createButton({image:'a_close.png',top:9,left:5});
	var addButton = Ti.UI.createButton({image:'a_add.png',top:9,right:5});
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:1024, height:11,top:44});

	var viewSubjectsTitle = Ti.UI.createLabel({text:'Chapter',left:20,top:55,color:'black'});
	var viewSubjectsViewTitle = Ti.UI.createTextField({value:title,top:80,height:44,right:12,left:12,color:'black'});
	var viewChaptersTitle = Ti.UI.createLabel({text:'Flashcards',left:20,top:130,color:'black'});
	
	win.add(a_topbar);
	win.add(closeButton);
	win.add(addButton);
	win.add(navbarShadow);
	win.add(viewSubjectsTitle);
	win.add(viewSubjectsViewTitle);
	win.add(viewChaptersTitle);
	
	var chaptersTable = Ti.UI.createTableView({top:160,backgroundColor:'white',editable:true});
	var timer; 
	var confirmDel = function(rowId,rowName) {
		var msgTitle = "Delete Flashcard"; 
		var msgText = "Are you sure you want to delete the '"+rowName+"' flashcard?"; 
	    var statusAlert = Titanium.UI.createAlertDialog({title:msgTitle,message:msgText,buttonNames: ['Cancel','Ok']});
	    statusAlert.show();
	    statusAlert.addEventListener('click',function(e){
	    	if (e.index == 0){statusAlert.hide();}
	    	if (e.index == 1){
				var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
				db.execute("DELETE FROM flashcards WHERE id = ?", rowId);
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
		var rows = db.execute("SELECT * FROM flashcards WHERE chapter = '"+chapterId+"' ORDER BY id");
		var x = 0;
		while (rows.isValidRow()){
			var flashName = rows.fieldByName('name');
			var id = rows.fieldByName('id');
			var touchView = Ti.UI.createView({ rowId:id,rowName:flashName,left:0, top:0, right:0, bottom:0 }); // invisible view to capture touch
			var row = Ti.UI.createTableViewRow({backgroundColor:'white',flashId:id,flashName:flashName,hasChild:true});
			var label = Ti.UI.createLabel({text:flashName, left:10,color:'black'});
			row.add(touchView);
			row.add(label);
			tapAndHold(touchView);
			data[x++] = row;
			rows.next();
		};
		rows.close();
		db.close();
		chaptersTable.data=data;
	};
	refresh();
	win.add(chaptersTable);
	var window;

	addButton.addEventListener('click',function(e){
		window = addFlashCardWindow('null',chapterId);
		window.open();
		window.addEventListener('close',function(){
			refresh();
		});
	});
	
	chaptersTable.addEventListener('click',function(e){
		window = addFlashCardWindow(e.rowData.flashId,'null');
		window.open();
		window.addEventListener('close',function(){
			refresh();
		});	
	});
	
	closeButton.addEventListener('click',function(){
			var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db.execute("UPDATE chapters SET chapter = '"+viewSubjectsViewTitle.value+"' WHERE id = "+chapterId);
			db.close();
			viewSubjectsViewTitle.blur();
			win.close();
	});
	viewSubjectsViewTitle.addEventListener('return',function(){
		viewSubjectsViewTitle.blur();
	});
	
	return win;
};