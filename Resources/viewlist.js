Ti.include('viewchapter.js');
Ti.include('viewflashcards.js');

var win = Ti.UI.currentWindow;
var customhead = Ti.UI.createLabel({ text:win.title,color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
win.titleControl = customhead;

win.barImage='navbarbg.png';
win.barColor='#D0A159';

var listOfSubjects = Ti.UI.createTableView({});
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
win.addEventListener('focus', function(){
	refresh();
});

listOfSubjects.addEventListener('click',function(e){
	var window = viewChaptertWindow(e.rowData.subjectId);
	Ti.UI.currentTab.open(window);
});
