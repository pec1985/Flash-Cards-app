var addSubjectWindow = function(){
	var win = Ti.UI.createWindow({color:'#61290C',title:'Add New Subject'});
	var customhead = Ti.UI.createLabel({ text:win.title,color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	win.titleControl = customhead;
	
	win.barImage='navbarbg.png';
	win.barColor='#D0A159';
	win.hideTabBar();
	
	var closeButton = Ti.UI.createButton({title:'close'});
	win.leftNavButton=closeButton;

	var addSubjectsView = Ti.UI.createTableView({style:Ti.UI.iPhone.TableViewStyle.GROUPED,backgroundColor:'#ccc',scrollable:false});
	var row = Ti.UI.createTableViewRow({backgroundColor:'white',header:'Name of Subject'});
	var label = Ti.UI.createTextField({left:10,right:10,hintText:'Subject'});
	var data = [];
	row.add(label);
	data[0] = row;
	addSubjectsView.data = data;
	win.add(addSubjectsView);
	//label.focus();

	label.addEventListener('change', function(){
		win.nameOfSubject=label.value;
	});

	closeButton.addEventListener('click',function(){
		win.close();
	});

	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:480, height:11,top:0});
	win.add(navbarShadow);
	win.orientationModes = [Titanium.UI.PORTRAIT];
	
	return win;
};