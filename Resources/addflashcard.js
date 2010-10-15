var addFlashCardWindow = function(flashId,chapterId){
	var win = Ti.UI.createWindow({color:'#61290C',title:'Add New Flash Card',barImage:'navbarbg.png',barColor:'#D0A159'});
	
	var customhead = Ti.UI.createLabel({ text:win.title,color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:18}});
	win.titleControl = customhead;
	
	var closeButton = Ti.UI.createButton({title:'cancel'});
	var saveButton = Ti.UI.createButton({title:'save'});
	var addSubjectsView = Ti.UI.createTableView({style:Ti.UI.iPhone.TableViewStyle.GROUPED,backgroundColor:'#ccc'});
	win.leftNavButton=closeButton;
	win.rightNavButton=saveButton;

	var data = [];
	var row1 = Ti.UI.createTableViewRow({header:'Name',backgroundColor:'white'});
	var label1 = Ti.UI.createTextField({left:10,right:10,hintText:'Name'});
	row1.add(label1);
	data[0] = row1;

	var row2 = Ti.UI.createTableViewRow({header:'Description',height:100,backgroundColor:'white'});
	var label2 = Ti.UI.createTextArea({left:10,bottom:10,top:10,right:10,font:{fontSize:15},backgroundColor:'white',suppressReturn:false});
	row2.add(label2);
	data[1] = row2;

	// this still needs to be fixed
	var row3 = Ti.UI.createTableViewRow({header:'',height:80,backgroundImage:''});
	data[2] = row3;
	// ---------------------------

	addSubjectsView.data = data;
	win.add(addSubjectsView);

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
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:'480', height:11,top:0});
	win.add(navbarShadow);
	win.orientationModes = [
	            Titanium.UI.PORTRAIT,
	            Titanium.UI.LANDSCAPE_LEFT,
	            Titanium.UI.LANDSCAPE_RIGHT
	];
	if (Ti.UI.orientation == 3 || Ti.UI.orientation == 4){
		win.barImage='navbarbg-landscape.png';
	}
	if (Ti.UI.orientation == 1 || Ti.UI.orientation == 2){
		win.barImage='navbarbg.png';
	}
	
	Ti.Gesture.addEventListener('orientationchange', function(e){
		if (e.orientation == 3 || e.orientation == 4){
			win.barImage='navbarbg-landscape.png';
		}
		if (e.orientation == 1 || e.orientation == 2){
			win.barImage='navbarbg.png';
		}
	});
	
	return win;
};