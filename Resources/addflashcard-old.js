var addFlashCardWindow = function(flashId,chapterId){
	var win = Ti.UI.createWindow({color:'#61290C',title:'Add New Chapter',barImage:'navbarbg.png',barColor:'#D0A159',backgroundColor:'#ccc'});
	var closeButton = Ti.UI.createButton({title:'cancel'});
	var saveButton = Ti.UI.createButton({title:'save'});
	win.leftNavButton=closeButton;
	win.rightNavButton=saveButton;
	var addName = Ti.UI.createTableView({style:Ti.UI.iPhone.TableViewStyle.GROUPED,backgroundColor:'#ccc',top:0,height:90});

	var data = [];
	var row = Ti.UI.createTableViewRow({header:'Name',backgroundColor:'white'});
	var label = Ti.UI.createTextField({left:10,right:10,hintText:'Name'});
	row.add(label);
	data[0] = row;
	var contentLabel=Ti.UI.createLabel({text:'Defenition', height:30,textAlign:'left',top:90,width:300,left:20,color:'#4c566c',shadowColor:'white',shadowOffset:{x:0,y:1},font:{fontFamily:'Arial-BoldMT',fontSize:17}});
	var label2 = Ti.UI.createTextArea({top:120,width:320,height:100,hintText:'Description',backgroundColor:'white',suppressReturn:false});

	addName.data = data;
	win.add(addName);
	win.add(label2);
	win.add(contentLabel);

	saveButton.addEventListener('click',function(){
		if (flashId == 'null'){
			var db1 = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db1.execute("INSERT INTO flashcards (name,description,chapter) VALUES (?,?,?)",label1.value,label2.value,chapterId);
			db1.close();
			win.close();
		} else {
			var db2 = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db2.execute("UPDATE flashcards set name = '"+label1.value+"', description = '"+label2.value+"' WHERE id ="+flashId);
			db2.close();
			win.close();
		}
	});

	closeButton.addEventListener('click',function(){
		win.close();
	});


	if (flashId != 'null'){
	
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var subjectName = db.execute("SELECT * FROM flashcards WHERE id = ?",flashId);
		var thisName = subjectName.fieldByName('name');
		var thisDescription = subjectName.fieldByName('description');
		label1.value = thisName;
		label2.value = thisDescription;
		subjectName.close();
		db.close();
	}
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:480, height:11,top:0});
	win.add(navbarShadow);
	return win;
};