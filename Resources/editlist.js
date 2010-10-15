Ti.include('addchapter.js');
Ti.include('addnewchapter.js');
Ti.include('flashcardsedit.js');
Ti.include('addflashcard.js');
Ti.include('addsubject.js');

var win = Titanium.UI.currentWindow;
var customhead = Ti.UI.createLabel({ text:win.title,color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
win.titleControl = customhead;
var addSubject = Ti.UI.createButton({title:'Add'});
var listOfSubjects = Ti.UI.createTableView({editable:true});
win.rightNavButton = addSubject;
win.add(listOfSubjects);
var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:480, height:11,top:0});
win.add(navbarShadow);


var refresh = function(){
	var data = [];
	var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
	var rows = db.execute("SELECT * FROM subjects ORDER BY subject");
	var x = 0;
	while (rows.isValidRow()){
		var subjectName = rows.fieldByName('subject');
		var id = rows.fieldByName('id');
		var row = Ti.UI.createTableViewRow({backgroundColor:'white',subjectId:id,subjectName:subjectName});
		var label = Ti.UI.createLabel({text:subjectName, left:10});
		row.add(label);
		data[x++] = row;
		rows.next();
	};
	rows.close();
	db.close();
	listOfSubjects.data=data;
};

refresh();


addSubject.addEventListener('click', function(){
	
	var window = addSubjectWindow();
	window.open({modal:true});
	window.addEventListener('close',function(){	
		Ti.UI.currentTab.close(window);
		if(window.nameOfSubject == null){	} else {
			var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db.execute("INSERT INTO subjects (subject) VALUES (?)",window.nameOfSubject);
			db.close();
			refresh();
		}
	});
	
});

listOfSubjects.addEventListener('delete',function(e){
	var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
	db.execute("DELETE FROM subjects WHERE id = ?", e.rowData.subjectId);
	db.close();	
});
listOfSubjects.addEventListener('click',function(e){
	
	
	var window = addChaptertWindow(e.rowData.subjectId);
	Ti.UI.currentTab.open(window);
	
	window.addEventListener('close',function(){
			var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db.execute("UPDATE subjects SET subject = '"+window.nameOfSubject+"' WHERE id = "+e.rowData.subjectId);
			db.close();
			refresh();
	});
	

});
win.orientationModes = [Titanium.UI.PORTRAIT];
