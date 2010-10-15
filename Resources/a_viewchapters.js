var viewChaptertWindow = function(subjectId){

	var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
	var subjectName = db.execute("SELECT * FROM subjects WHERE id = ?",subjectId);
	var thisSubject = subjectName.fieldByName('subject');
	subjectName.close();
	db.close();

	var chapsWin = Ti.UI.createWindow({backgroundColor:'#ccc'});
	
	var a_viewListTopbar = Ti.UI.createView({left:0,right:0,top:0,height:44,backgroundImage:'navbarbg.png'});
	var a_viewTitle = Ti.UI.createLabel({ text:'Chapters',color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	a_viewListTopbar.add(a_viewTitle);
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:1024, height:11,top:44});

	var backButton = Ti.UI.createImageView({image:'subjects-back.png',top:9,left:5});
	
	var viewSubjectsTitle = Ti.UI.createLabel({text:'Name of Subject',left:20,top:55,color:'black'});
	var viewSubjectsView = Ti.UI.createView({backgroundColor:'white',left:10,right:10,height:40,top:80,borderColor:'#ababab',borderWidth:1,borderRadius:7});
	var viewSubjectsViewTitle = Ti.UI.createLabel({text:thisSubject,left:12,color:'black'});
	viewSubjectsView.add(viewSubjectsViewTitle);
	
	var chaptersTitle = Ti.UI.createLabel({text:'Chapters',left:20,top:130,color:'black'});

	var chaptersTable = Ti.UI.createTableView({top:160,left:10,right:10,height:'auto',borderColor:'#ababab',borderWidth:1,borderRadius:7,backgroundColor:'white'});
	var refresh = function(){
		var data = [];
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var rows = db.execute("SELECT * FROM chapters WHERE subject = ? ORDER BY chapter",subjectId);
		var x = 0;
		while (rows.isValidRow()){
			var chapterName = rows.fieldByName('chapter');
			var id = rows.fieldByName('id');
			var row = Ti.UI.createTableViewRow({chapterId:id,chapterName:chapterName,hasChild:true});
			var label = Ti.UI.createLabel({text:chapterName, left:10,height:20,color:'black'});
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
		flashCardsWindow(e.rowData.chapterName,e.rowData.chapterId).open();
	});


	chapsWin.add(a_viewListTopbar);
	chapsWin.add(backButton);
	chapsWin.add(navbarShadow);
	chapsWin.add(viewSubjectsTitle);
	chapsWin.add(viewSubjectsView);
	chapsWin.add(chaptersTitle);
	chapsWin.add(chaptersTable);
	
	backButton.addEventListener('click',function(){
		chapsWin.close();
	});
	return chapsWin;
};
