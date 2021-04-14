const drop_btn = document.querySelector(".drop-btn span");
const menu_wrapper = document.querySelector(".wrapper");

drop_btn.onclick = () => {
  menu_wrapper.classList.toggle("show");
};

const drop_btn_perfil = document.querySelector(".drop-btn-perfil span");
const menu_wrapper_perfil = document.querySelector(".wrapper-perfil");

drop_btn_perfil.onclick = () => {
  menu_wrapper_perfil.classList.toggle("show");
};

/*Maneira 2

const drop_btn = document.querySelector(".drop-btn span")
const menu_wrapper = document.querySelector(".wrapper")
const drop_btn_perfil = document.querySelector(".drop-btn-perfil span")
menu_wrapper.style.display = 'none'



drop_btn.addEventListener("click", (event) =>{

  if(menu_wrapper.style.display == 'none'){

    menu_wrapper.style.display = 'block'

  }else{

    menu_wrapper.style.display = 'none'

}})*/
