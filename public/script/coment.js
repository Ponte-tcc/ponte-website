const btnCc = document.querySelector(".comentPart");
const warpCc = document.querySelector(".comentarios");
const publi = document.querySelector(".textInput");

btnCc.addEventListener('click', function(event) {

  warpCc.classList.toggle('hide')

})

document.addEventListener('click', function(event) {
  var isClickInsideElementCc = warpCc.contains(event.target);
  var isClickInsideElementCct = btnCc.contains(event.target);
  if (isClickInsideElementCc || isClickInsideElementCct) {
      //Do something click is outside specified element
      warpCc.classList.remove('hide')
    
  }
  else{
    warpCc.classList.add('hide')
      }
});

