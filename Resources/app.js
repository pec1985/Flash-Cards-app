
Titanium.UI.setBackgroundColor('#000');
if (Ti.Platform.name != 'android'){
	var tabGroup = Titanium.UI.createTabGroup();

	var win1 = Titanium.UI.createWindow({color:'#61290C', url:'viewlist.js',title:'Subjects',barImage:'navbarbg.png',barColor:'#D0A159' });
	var tab1 = Titanium.UI.createTab({  
	    icon:'icon1.png',
	    title:'Study',
	    window:win1
	});

	var win2 = Titanium.UI.createWindow({color:'#61290C', url:'editlist.js',title:'Subjects',barImage:'navbarbg.png',barColor:'#D0A159' });
	var tab2 = Titanium.UI.createTab({  
	    icon:'icon2.png',
	    title:'Edit Subjects',
	    window:win2
	});

	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);  


	tabGroup.open();
} 
else {
	
	Ti.include('a_viewlist.js');
	Ti.include('a_editlist.js');
	Ti.include('a_viewchapters.js');
	Ti.include('a_viewflascards.js');
	Ti.include('a_addsubjects.js');
	Ti.include('a_addchapters.js');
	Ti.include('a_addnewchapter.js');
	Ti.include('a_addflashcards.js');
	Ti.include('extras.js');
	Ti.include('a_addnewflashcard.js');
	
	
	var a_mainWindow = Ti.UI.createWindow({backgroundColor:'white'});
	var a_bottomTabs = Ti.UI.createView({left:0, right:0, height:48, bottom:0, backgroundImage:'a_tab2.png' });
	var a_bottomTab1 = Ti.UI.createView({left:20, width:120, height:48, bottom:0, backgroundImage:'a_tab1.png' });
	var a_bottomTab2 = Ti.UI.createView({right:20, width:120, height:48, bottom:0 });
	
	var a_bottomTab1Image = Ti.UI.createImageView({image:'icon1s.png',bottom:18});
	var a_bottomTab2Image = Ti.UI.createImageView({image:'icon2.png',bottom:18});
	
	
	var a_bottomTab1Text = Ti.UI.createLabel({text:'Study',bottom:0,color:'white'});
 	var a_bottomTab2Text = Ti.UI.createLabel({text:'Edit Subjects',bottom:0,color:'white'});
		
	a_bottomTab1.add(a_bottomTab1Text);
	a_bottomTab2.add(a_bottomTab2Text);
	
	a_bottomTab1.add(a_bottomTab1Image);
	a_bottomTab2.add(a_bottomTab2Image);

	a_mainWindow.add(a_viewList());
	a_bottomTabs.add(a_bottomTab1);
	a_bottomTabs.add(a_bottomTab2);
	a_mainWindow.add(a_bottomTabs);
	
	a_mainWindow.open();
//	var width = (a_mainWindow.size.width/2);
	
	a_bottomTab1.addEventListener('click',function(){
		a_bottomTab1.backgroundImage='a_tab1.png';
		a_bottomTab2.backgroundImage=null;
		a_bottomTab1Image.image='icon1s.png';
		a_bottomTab2Image.image='icon2.png';
		a_bottomTab1Text.color='white';
		a_bottomTab2Text.color='#999';
		a_mainWindow.remove(a_editList());
		a_mainWindow.add(a_viewList());
	});
	a_bottomTab2.addEventListener('click',function(){
		a_bottomTab2.backgroundImage='a_tab1.png';
		a_bottomTab1.backgroundImage=null;
		a_bottomTab1Image.image='icon1.png';
		a_bottomTab2Image.image='icon2s.png';
		a_bottomTab1Text.color='#999';
		a_bottomTab2Text.color='white';
		a_mainWindow.remove(a_viewList());
		a_mainWindow.add(a_editList());
	});
	a_mainWindow.addEventListener('focus',function(){
		alert(a_mainWindow.toImage().width);
	});
}
