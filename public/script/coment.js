const btnCc = document.querySelectorAll(".comentPart");
const warpCc = document.querySelectorAll(".comentarios");


var i = 0
btnCc.forEach(btn => {

  btn.addEventListener('click', function open(){
    
    console.log(i)
    warpCc[i].classList.add('hide')

  })

  i++



})



