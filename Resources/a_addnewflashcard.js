var addFlashCardWindow = function(flashId,chapterId){

	var win = Ti.UI.createWindow({backgroundColor:'#ccc'});
	
	var a_topbar = Ti.UI.createView({left:0,right:0,top:0,height:44,backgroundImage:'navbarbg.png'});
	var a_viewTitle = Ti.UI.createLabel({ text:'Flashcard',color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	a_topbar.add(a_viewTitle);
	var closeButton = Ti.UI.createButton({image:'a_close.png',top:9,left:5});
	var saveButton = Ti.UI.createButton({image:'a_save.png',top:9,right:5});
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:1024, height:11,top:44});

	var viewFlashTitle = Ti.UI.createLabel({text:'Name',left:20,top:55,color:'black'});
	var viewFlashTitleField = Ti.UI.createTextField({top:80,height:44,right:12,left:12,color:'black'});
	var viewFlashDescription = Ti.UI.createLabel({text:'Description',left:20,top:130,color:'black'});
	var viewFlashDescriptionField = Ti.UI.createTextArea({top:160,height:100,right:12,left:12,color:'black'});
	
	win.add(a_topbar);
	win.add(closeButton);
	win.add(saveButton);
	win.add(viewFlashTitle);
	win.add(viewFlashTitleField);
	win.add(viewFlashDescription);
	win.add(viewFlashDescriptionField);
	win.add(navbarShadow);


	saveButton.addEventListener('click',function(){
		viewFlashTitleField.blur();
		viewFlashDescriptionField.blur();
		if (flashId == 'null'){
			var db1 = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db1.execute("INSERT INTO flashcards (name,description,chapter) VALUES (?,?,?)",viewFlashTitleField.value,viewFlashDescriptionField.value,chapterId);
			db1.close();
			win.close();
		} else {
			var db2 = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db2.execute("UPDATE flashcards set name = '"+viewFlashTitleField.value+"', description = '"+viewFlashDescriptionField.value+"' WHERE id ="+flashId);
			db2.close();
			win.close();
		}
	});

	closeButton.addEventListener('click',function(){
		viewFlashTitleField.blur();
		viewFlashDescriptionField.blur();
		win.close();
	});


	if (flashId != 'null'){
	
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var subjectName = db.execute("SELECT * FROM flashcards WHERE id = ?",flashId);
		var thisName = subjectName.fieldByName('name');
		var thisDescription = subjectName.fieldByName('description');
		viewFlashTitleField.value = thisName;
		viewFlashDescriptionField.value = thisDescription;
		subjectName.close();
		db.close();
	}
	
	return win;
};