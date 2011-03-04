var flashCardsWindow = function(title,chapterId){
	var win = Ti.UI.createWindow({backgroundColor:'#ccc'});
	
	var a_topbar = Ti.UI.createView({left:0,right:0,top:0,height:44,backgroundImage:'navbarbg.png'});
	var a_bottombar = Ti.UI.createView({left:0,right:0,bottom:0,height:47,backgroundImage:'a_bottombar.png'});
	var a_viewTitle = Ti.UI.createLabel({ text:'Chapters',color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	a_topbar.add(a_viewTitle);
	var backButton = Ti.UI.createButton({image:'a_chaps.png',top:9,left:5});
	var flipButton = Ti.UI.createButton({backgroundImage:'flip.png',top:9,right:5,width:48,height:30});
	var randButton = Ti.UI.createButton({backgroundImage:'a_random.png',bottom:8,left:5,width:99,height:30});
	var nameButton = Ti.UI.createButton({backgroundImage:'a_byname.png',bottom:8,right:5,width:99,height:30});
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:1024, height:11,top:44});

	var totalViews1 = [];
	var totalViews2 = [];
	var mainView = Ti.UI.createView({left:5,right:5});
	var scrollView1 = Ti.UI.createScrollableView({top:49,bottom:54,left:10,right:10});
	var scrollView2 = Ti.UI.createScrollableView({top:49,bottom:54,left:10,right:10});
	var dubleTapping = function(e){
		e.addEventListener('doubletap',function(){
			flip();
		});
	};
	var refresh = function(order){
		var db = Titanium.Database.install('flashcards.sqlite', 'flash1');
		var flashcardsName;
		if (order == 'random'){
			flashcardsName = db.execute("SELECT * FROM flashcards WHERE chapter = ? ORDER BY RANDOM()",chapterId);
		} else if (order == 'name'){
			flashcardsName = db.execute("SELECT * FROM flashcards WHERE chapter = ? ORDER BY name",chapterId);
		} else {
			flashcardsName = db.execute("SELECT * FROM flashcards WHERE chapter = ?",chapterId);
		}

		var x = 0;
		while (flashcardsName.isValidRow()){
			var flashName = flashcardsName.fieldByName('name');
			var flashDescription = flashcardsName.fieldByName('description');
			var id = flashcardsName.fieldByName('id');
			
			var flashNumber1 = Ti.UI.createLabel({text:'#'+(x+1),top:10,right:10,width:300,height:20,textAlign:'right',color:'black'});
			var flashView1 = Ti.UI.createView({left:10, right:10,top:0,bottom:0,backgroundColor:'white',page:1,borderColor:'#999',borderRadius:5});
			var flashTitle1 = Ti.UI.createLabel({text:flashName,textAlign:'center',color:'black',font:{fontWeight:'bold',fontSize:20}});
			flashView1.add(flashNumber1);
			flashView1.add(flashTitle1);
			dubleTapping(flashView1);
			var flashNumber2 = Ti.UI.createLabel({text:'#'+(x+1),top:10,right:10,width:300,height:20,textAlign:'right',color:'black'});
			var flashView2 = Ti.UI.createView({left:10, right:10,top:0,bottom:0,backgroundColor:'white',backgroundImage:'flashcard.png',page:2,borderColor:'#999',borderRadius:5});
			var flashTitle2 = Ti.UI.createLabel({text:flashDescription,textAlign:'left',left:20,right:20,font:{fontWeight:'bold',fontSize:16},color:'black'});
			flashView2.add(flashNumber2);
			flashView2.add(flashTitle2);
			dubleTapping(flashView2);
			
			totalViews1[x] = flashView1;
			totalViews2[x++] = flashView2;
			flashcardsName.next();
		};
		flashcardsName.close();
		db.close();
		scrollView1.views = totalViews1;
		scrollView2.views = totalViews2;
	};
	refresh();
	win.add(a_topbar);
	win.add(a_bottombar);
	win.add(navbarShadow);

	win.add(scrollView1);
	win.add(backButton);
	win.add(randButton);
	win.add(nameButton);
	win.add(flipButton);

	var pageDisplay = 1;
	var flip = function(){
		switch (pageDisplay){
			case 1:
				scrollView2.currentPage = scrollView1.currentPage;
				win.remove(scrollView1);
				win.add(scrollView2);
				pageDisplay = 2;
				break;
			case 2:
				scrollView1.currentPage = scrollView2.currentPage;
				win.remove(scrollView2);
				win.add(scrollView1);
				pageDisplay = 1;
				break;
		}
	};
	
	
	flipButton.addEventListener('click',function(){
		flip();
	});

	randButton.addEventListener('click',function(){
		refresh('random');
	});
	
	nameButton.addEventListener('click',function(){
		refresh('name');
	});

	backButton.addEventListener('click',function(){
		win.close();
	});
	
	return win;
};