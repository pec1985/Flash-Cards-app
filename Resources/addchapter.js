var addChaptertWindow = function(subjectId){

	var win = Ti.UI.createWindow({color:'#61290C',title:'Add Chapters',barImage:'navbarbg.png',barColor:'#D0A159'});
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
	var label = Ti.UI.createTextField({left:10,right:10,value:thisSubject});
	var data = [];
	row.add(label);
	data[0] = row;
	addSubjectsView.data = data;

	var chaptersTable = Ti.UI.createTableView({top:90,style:Ti.UI.iPhone.TableViewStyle.GROUPED,backgroundColor:'#ccc',editable:true});

	var refresh = function(){
		var data = [];
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var rows = db.execute("SELECT * FROM chapters WHERE subject = ? ORDER BY chapter",subjectId);
		var x = 0;
		while (rows.isValidRow()){
			var chapterName = rows.fieldByName('chapter');
			var id = rows.fieldByName('id');
			var row = Ti.UI.createTableViewRow({backgroundColor:'white',chapterId:id,chapterName:chapterName,hasChild:true});
			if (x == 0){ row.header='Chapters';}
			var label = Ti.UI.createLabel({text:chapterName, left:10,height:20});
			row.add(label);
			data[x++] = row;
			rows.next();
		};
		rows.close();
		db.close();
		row = Ti.UI.createTableViewRow({backgroundColor:'white',chapterName:'addChapter',header:''});
		label = Ti.UI.createLabel({text:'Add Chapter',textAlign:'center'});
		row.add(label);
		data[data.length] = row;
		chaptersTable.data=data;
	};
	chaptersTable.addEventListener('click',function(e){
		var window;
		if (e.rowData.chapterName == 'addChapter'){
			window = addNewChapterWindow();
			window.open({modal:true});
			window.addEventListener('close',function(){
				Ti.UI.currentTab.close(window);
				if(window.addChapter=='true'){
					var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
					db.execute("INSERT INTO chapters (chapter,subject) VALUES (?,?)",window.chapterValue,subjectId);
					db.close();
					refresh();
				}
			});
		
		
		}
		if (e.rowData.hasChild){
			var thisId = e.rowData.chapterId;
			window = flashCardsWindow(e.rowData.chapterName,thisId);
			Ti.UI.currentTab.open(window);
			window.addEventListener('close',function(){
				Ti.UI.currentTab.close(window);
				var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
				db.execute("UPDATE chapters SET chapter = '"+window.title+"' WHERE id = "+thisId);
				db.close();
				refresh();
			});
		}
	});

	win.nameOfSubject=label.value;

	label.addEventListener('change',function(){
		win.nameOfSubject=label.value;
		win.title=label.value;
	});

	chaptersTable.addEventListener('delete',function(e){
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		db.execute("DELETE FROM chapters WHERE id = ?", e.rowData.chapterId);
		db.close();	

	});


	refresh();
	
	win.add(addSubjectsView);
	win.add(chaptersTable);
	
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:480, height:11,top:0});
	win.add(navbarShadow);
	win.orientationModes = [Titanium.UI.PORTRAIT];
	
	return win;
};
