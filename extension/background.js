/**********************************************************
*** FILE	: background.js				***
*** REV		: 1.6					***
*** DEV		: me@nishantarora.in		***
*** DATE	: April 22,2013				***
*** DESC	: Provides listener function in chrome  ***
***		  Background and manages notifications	***
***		  like gmail chat earlier		***
**********************************************************/
// setting globals
notiAct	= false;
prevUser= "";
prevTab	= -1;

// listening for new messages
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	chrome.tabs.query({url: request.url}, function(tabArray) {	
		if(!tabArray[0].active){
			notify(request.user.trim(),tabArray[0].id,request.img,request.update);
		}
	});
});

function notify(user,tabID,img,update){
	var notiDisp= true;
	if(user == prevUser && tabID !== prevTab){
		notiDisp= false;
	}
	if(notiDisp){		
		prevUser=user;
		prevTab	=tabID;
		if(notiAct){
			notification.cancel();
			notiAct	= false;
		}
		notification = webkitNotifications.createNotification(img,user,update);
		notification.onclick = function(){
			chrome.tabs.update(tabID, {active: true});
			this.cancel();
			notiAct	= false;
		};
		notification.show();
		notiAct	= true;
	}
	//console.log({notiAct: notiAct, prevUser: prevUser, prevTab: prevTab, user: user, tabID: tabID, notiDisp: notiDisp});
}
