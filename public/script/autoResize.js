var textarea = document.querySelectorAll('textarea');

for (var i = 0; i < textarea.length; i++) {

  textarea[i].addEventListener('keydown', autosize);
  
}

             
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0;';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}