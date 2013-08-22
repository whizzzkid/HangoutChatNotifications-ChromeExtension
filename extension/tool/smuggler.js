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
n=-1;
divno=-1;
function check_new_message(){
  if(n==-1){
    n= $("div").length;
  }
  divno  = $("div").length;
  if(divno>n && n!==0){
    if(!window_focus){
      update_notifier();
    }
    n=divno;
  }
}
/**
 * Updating the notification service running in background.js
 */
function update_notifier(){

  /**
   * Thumbnail.
   */
  var allThumbs  = $('img').filter(function(){
    return ($(this).width() ==32) && ($(this).height() ==32)
  });
  var reqThumb  = allThumbs[allThumbs.length-1].src;

  /**
   * Message.
   */
  var message  = $('div.Mu.SP:last').text();

  /**
   * User.
   */
  var user  = $('div.UR.UG:last').text();
  chrome.extension.sendRequest({img: reqThumb, user: user,update: message,url: document.referrer});
}
