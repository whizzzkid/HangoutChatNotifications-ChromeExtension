/**
 * @file smuggler.js
 * @rev 1.8
 * @author me@nishantarora.in
 */

/**
 * Smuggles data from chat frame to the document, so that a notification can be
 * created.
 */

/**
 * Setting a proper timeout.
 */
$(document).ready(function(){
  setTimeout(function(){}, 5000);
  setInterval(check_new_message, 100);
  n= $("div").length;
  window_focus = false;
  $(window).focus(function() {
    window_focus = true;
  }).blur(function() {
    window_focus = false;
  });
});

/**
 * Counting difference in divs.
 */
var divno=-1;
var divs = {};
function check_new_message(){
  var name = $('div.Ob2Lud.RE.EIhiV.OxDpJ').text();
  if(name !== '' && !divs[name]) {
    divs[name] = $("div").length;
  }
  var n = divs[name];
  divno = $("div").length;
  
  if(divno>n && n!==0){
    if(!window_focus){
      update_notifier();
    }
    divs[name]=divno;
  }
}
/**
 * Updating the notification service running in background.js
 */
function update_notifier(){

  var div = $('div.tk.Sn:last');
  
  /**
   * Thumbnail.
   */
  var allThumbs = $(div).find('img.Yf');
  var reqThumb  = allThumbs.length > 0 ? allThumbs[allThumbs.length-1].src : '';
  reqThumb = reqThumb.replace(/\/s32-/, '/s256-');
  
  /**
   * Message.
   */
  var message  = $(div).find('.Mu.SP:last').text();

  /**
   * User.
   */
  var user  = $(div).find('.UR.UG').text();
  
  if (user !== '')
    chrome.runtime.sendMessage({img: reqThumb, user: user,update: message,url: document.referrer});
}
