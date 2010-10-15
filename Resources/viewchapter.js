var viewChaptertWindow = function(subjectId){
	var win = Ti.UI.createWindow({color:'#61290C',title:'Chapters',barImage:'navbarbg.png',barColor:'#D0A159'});
	var customhead = Ti.UI.createLabel({ text:win.title,color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	win.titleControl = customhead;
	
	win.hideTabBar();

	var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
	var subjectName = db.execute("SELECT * FROM subjects WHERE id = ?",subjectId);
	var thisSubject = subjectName.fieldByName('subject');
	subjectName.close();
	db.close();

	var addSubjectsView = Ti.UI.createTableView({style:Ti.UI.iPhone.TableViewStyle.GROUPED,backgroundColor:'#ccc',scrollable:false});
	var row = Ti.UI.createTableViewRow({backgroundColor:'white',header:'Name of Subject'});
	var label = Ti.UI.createLabel({left:10,right:10,text:thisSubject});
	var data = [];
	row.add(label);
	data[0] = row;
	addSubjectsView.data = data;

	var chaptersTable = Ti.UI.createTableView({top:90,style:Ti.UI.iPhone.TableViewStyle.GROUPED,backgroundColor:'#ccc'});
	var refresh = function(){
		var data = [];
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var rows = db.execute("SELECT * FROM chapters WHERE subject = ? ORDER BY chapter",subjectId);
		var x = 0;
		while (rows.isValidRow()){
			var chapterName = rows.fieldByName('chapter');
			var id = rows.fieldByName('id');
			var row = Ti.UI.createTableViewRow({backgroundColor:'white',chapterId:id,chapterName:chapterName,hasChild:true});
			if (x == 0){row.header='Chapters';}
			var label = Ti.UI.createLabel({text:chapterName, left:10,height:20});
			row.add(label);
			data[x++] = row;
			rows.next();
		};
		rows.close();
		db.close();
		chaptersTable.data=data;
	};
	refresh();
	chaptersTable.addEventListener('click',function(e){
			var window = flashCardsWindow(e.rowData.chapterName,e.rowData.chapterId);
			Ti.UI.currentTab.open(window);
	});


	win.add(addSubjectsView);
	win.add(chaptersTable);
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:480, height:11,top:0});
	win.add(navbarShadow);
	win.orientationModes = [Titanium.UI.PORTRAIT];
	
	
	return win;
};
