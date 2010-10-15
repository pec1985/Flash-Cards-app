var flashCardsWindow = function(title,chapterId){
	
	var win = Ti.UI.createWindow({color:'#61290C',title:title ,chapterId:chapterId,barImage:'navbarbg.png',barColor:'#D0A159'});
	var customhead = Ti.UI.createLabel({ text:win.title,color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	win.titleControl = customhead;
	
	var addButton = Ti.UI.createButton({title:'add'});
	win.rightNavButton=addButton;

	var chapterView = Ti.UI.createTableView({style:Ti.UI.iPhone.TableViewStyle.GROUPED,backgroundColor:'#ccc',scrollable:false});
	var row1 = Ti.UI.createTableViewRow({backgroundColor:'white',header:'Chapter'});
	var label1 = Ti.UI.createTextField({left:10,right:10,value:win.title});
	var data = [];
	row1.add(label1);
	data[0] = row1;
	chapterView.data = data;


	var flashCardsTable = Ti.UI.createTableView({top:90,editable:true});

	var refresh = function(){
		var data = [];
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var rows = db.execute("SELECT * FROM flashcards WHERE chapter = '"+chapterId+"' ORDER BY id");
		var x = 0;
		while (rows.isValidRow()){
			var flashName = rows.fieldByName('name');
			var id = rows.fieldByName('id');
			var row = Ti.UI.createTableViewRow({backgroundColor:'white',flashId:id,flashName:flashName,hasChild:true});
			var label = Ti.UI.createLabel({text:flashName, left:10});
			row.add(label);
			data[x++] = row;
			rows.next();
		};
		rows.close();
		db.close();
		flashCardsTable.data=data;
	};
	refresh();

	win.add(chapterView);
	win.add(flashCardsTable);

	addButton.addEventListener('click',function(e){
		var window = addFlashCardWindow('null',chapterId);
		Ti.UI.currentTab.open(window);
		window.addEventListener('close',function(){
			Ti.UI.currentTab.close(window);
			refresh();
		});
	});
	
	label1.addEventListener('change', function(){
		win.title=label1.value;
	});


	flashCardsTable.addEventListener('click',function(e){
		var window = addFlashCardWindow(e.rowData.flashId,'null');
		Ti.UI.currentTab.open(window);
		window.addEventListener('close',function(){
			Ti.UI.currentTab.close(window);
			refresh();
		});
	});
	
	
	flashCardsTable.addEventListener('delete',function(e){
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		db.execute("DELETE FROM flashcards WHERE id = ?", e.rowData.flashId);
		db.close();	

	});
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:480, height:11,top:0});
	win.add(navbarShadow);
	win.orientationModes = [Titanium.UI.PORTRAIT];
	return win;
	
};
