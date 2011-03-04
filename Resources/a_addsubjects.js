var addSubjectsWindow = function(subjectId){
	var win = Ti.UI.createWindow({backgroundColor:'#ccc'});
	
	var a_topbar = Ti.UI.createView({left:0,right:0,top:0,height:44,backgroundImage:'navbarbg.png'});
	var a_viewTitle = Ti.UI.createLabel({ text:'Add New Subject',color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	a_topbar.add(a_viewTitle);
	var closeButton = Ti.UI.createButton({image:'a_close.png',top:9,left:5});
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:1024, height:11,top:44});

	var viewSubjectsTitle = Ti.UI.createLabel({text:'Name of Subject',left:20,top:55,color:'black'});
	var viewSubjectsViewTitle = Ti.UI.createTextField({top:80,height:44,right:12,left:12,color:'black'});


	win.add(a_topbar);
	win.add(viewSubjectsTitle);
	win.add(viewSubjectsViewTitle);
	win.add(closeButton);
	win.add(navbarShadow);
	viewSubjectsViewTitle.focus();
	closeButton.addEventListener('click',function(){
		viewSubjectsViewTitle.blur();
		if(viewSubjectsViewTitle.value == null){	} else {
			var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
			db.execute("INSERT INTO subjects (subject) VALUES (?)",viewSubjectsViewTitle.value);
			db.close();
		}
		win.close();
	});
	
	return win;
};