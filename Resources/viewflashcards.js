var flashCardsWindow = function(title,chapterId){
	var win = Ti.UI.createWindow({color:'#61290C',title:title,barImage:'navbarbg.png', barColor:'#D0A159',backgroundColor:'#ccc'});
	var customhead = Ti.UI.createLabel({ text:win.title,color:'#61290C',height:30,font:{fontFamily:'Arial-BoldMT',fontSize:20}});
	win.titleControl = customhead;
	

	var flipButton = Ti.UI.createButton({title:'flip',style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED});
	var randButton = Ti.UI.createButton({title:'random order',style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED});
	var flexSpace = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});

	var nameButton = Ti.UI.createButton({title:'order by name',style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED});
	var toolbar = Ti.UI.createToolbar({bottom:0,barColor:'#1b242a',items:[randButton,flexSpace,nameButton]});
	win.rightNavButton=flipButton;
	var totalViews1 = [];
	var totalViews2 = [];
	var mainView = Ti.UI.createView({});
	var scrollView1 = Ti.UI.createScrollableView({top:10,bottom:54});
	var scrollView2 = Ti.UI.createScrollableView({top:10,bottom:54});
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
			
			var flashNumber1 = Ti.UI.createLabel({text:'#'+(x+1),top:10,right:10,width:300,height:20,textAlign:'right'});
			var flashView1 = Ti.UI.createView({left:10, right:10,top:0,bottom:0,backgroundColor:'white',page:1,borderColor:'#999',borderRadius:5});
			var flashTitle1 = Ti.UI.createLabel({text:flashName,textAlign:'center',color:'black',font:{fontWeight:'bold',fontSize:20}});
			flashView1.add(flashNumber1);
			flashView1.add(flashTitle1);
			
			var flashNumber2 = Ti.UI.createLabel({text:'#'+(x+1),top:10,right:10,width:300,height:20,textAlign:'right'});
			var flashView2 = Ti.UI.createView({left:10, right:10,top:0,bottom:0,backgroundColor:'white',backgroundImage:'flashcard.png',page:2,borderColor:'#999',borderRadius:5});
			var flashTitle2 = Ti.UI.createLabel({text:flashDescription,textAlign:'left',left:20,right:20,font:{fontWeight:'bold',fontSize:16}});
			flashView2.add(flashNumber2);
			flashView2.add(flashTitle2);
	
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

	mainView.add(scrollView1);
	win.add(mainView);
	win.add(toolbar);
	
	
	var pageDisplay = 1;
	var flip = function(){
		switch (pageDisplay){
			case 1:
				scrollView2.currentPage = scrollView1.currentPage;
				var animation2 = Ti.UI.createAnimation({view:scrollView2,transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,duration: 500});
				mainView.animate(animation2);
				pageDisplay = 2;
				break;
			case 2:
				scrollView1.currentPage = scrollView2.currentPage;
				var animation1 = Ti.UI.createAnimation({view:scrollView1,transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,duration: 500});
				mainView.animate(animation1);
				pageDisplay = 1;
				break;
		}
	};
	
	flipButton.addEventListener('click',function(){
		flip();
	});
	scrollView2.addEventListener('doubletap',function(){
		flip();
	});
	scrollView1.addEventListener('doubletap',function(){
		flip();
	});
	randButton.addEventListener('click',function(){
		refresh('random');
	});
	nameButton.addEventListener('click',function(){
		refresh('name');
	});
	var navbarShadow = Ti.UI.createImageView({backgroundImage:'nav-bar-shadow.png', width:480, height:11,top:0});
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