var a_viewList = function(){

	var a_view = Ti.UI.createView({bottom:48});
	var a_viewListTopbar = Ti.UI.createView({left:0,right:0,top:0,height:44,backgroundImage:'navbarbg.png'});
	var a_viewTitle = Ti.UI.createLabel({ text:'Subjects',color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	var a_viewListTable = Ti.UI.createTableView({backgroundColor:'white',top:44});
	a_viewListTopbar.add(a_viewTitle);
	a_view.add(a_viewListTopbar);
	a_view.add(a_viewListTable);
	var refresh = function(){
		var data = [];
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var rows = db.execute("SELECT * FROM subjects ORDER BY subject");
		var x = 0;
		while (rows.isValidRow()){
			var subjectName = rows.fieldByName('subject');
			var id = rows.fieldByName('id');
			var row = Ti.UI.createTableViewRow({backgroundColor:'white',subjectId:id,subjectName:subjectName,hasChild:true});
			var label = Ti.UI.createLabel({text:subjectName, left:10,color:'black'});
			row.add(label);
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
	a_viewListTable.addEventListener('click',function(e){
		viewChaptertWindow(e.rowData.subjectId).open();
	});

	return a_view;
};
