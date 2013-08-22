/**
 * @file background.js
 * @revision 1.7
 * @author me@nishantarora.in
 */

/**
 * Provides listener function in chrome and manages notifications like gmail
 * chat earlier.
 */

/**
 * Setting globals.
 */
notiAct  = false;
prevUser= "";
prevTab  = -1;

/**
 * Listening for new messages.
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  chrome.tabs.query({url: request.url}, function(tabArray) {
    windowID = tabArray[0].windowId;
    isFocused = true;
    chrome.windows.get(windowID, function(window){
      isFocused = (window.focused == "true") ? true : false;
      if(!isFocused || !tabArray[0].active){
        console.log(isFocused);
        notify(request.user.trim(),tabArray[0].id,request.img,request.update);
      }
    });
  });
});

/**
 * Create notifications.
 */
function notify(user,tabID,img,update){
  var notiDisp= true;
  if(user == prevUser && tabID !== prevTab){
    notiDisp= false;
  }
  if(notiDisp){
    prevUser=user;
    prevTab  =tabID;
    if(notiAct){
      notification.cancel();
      notiAct = false;
    }
    notification = webkitNotifications.createNotification(img,user,update);
    notification.onclick = function(){
      chrome.tabs.update(tabID, {active: true});
      this.cancel();
      notiAct = false;
    };
    notification.show();
    notiAct = true;
  }
}
