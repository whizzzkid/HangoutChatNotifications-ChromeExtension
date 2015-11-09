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
notiAct = false;
prevUser = "";
prevTab = -1;

/**
 * Listening for new messages.
 */
//chrome.extension.onRequest.addListener(onNewMessage);
chrome.runtime.onMessage.addListener(onNewMessage);

function onNewMessage(request, sender, sendResponse) {
  chrome.tabs.query({url: request.url}, function(tabArray) {
    var tab = (tabArray.length === 0 ? tabArray : tabArray[0]);
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    } else {
      windowID = tab.windowId;
      isFocused = true;
      chrome.windows.get(windowID, function(window){
        isFocused = (window.focused == "true") ? true : false;
        if(!isFocused || !tab.active){
          console.log(isFocused);
          notify(request.user.trim(),tab.id,request.img,request.update);
        }
      });
    }
  });
}

/**
 * Create notifications.
 */
function notify(user,tabID,img,update){
  var notiDisp = true;
  if(user == prevUser && tabID !== prevTab){
    notiDisp= false;
  }
  if(notiDisp){
    prevUser = user;
    prevTab = tabID;
    if(notiAct){
      if(notification !== undefined)
        notification.close();
      notiAct = false;
    }
    notification = new Notification(user,{body:update, icon:img});
    notification.onclick = function(){
      chrome.tabs.update(tabID, {active: true});
      this.close();
      notiAct = false;
    };
    notiAct = true;
  }
}
