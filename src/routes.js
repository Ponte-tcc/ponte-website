const express = require("express")
const routes = express.Router()
const views = __dirname + "/views/"
const mongoose = require("mongoose")
require("./models/User")
const User = mongoose.model("users")
require("./models/Suporte")
const Suporte = mongoose.model("suportes")

var userUser
var userEmail
var userEx 


const erros = []

const errosUser = []
const errosEx = []
const errosEmail = []
const errosPass = []


routes.get("/", (req, res) => {
  res.render(views + "index", {erros})
  if(erros.length >= 1){for(var i = 0; i = erros.length; i++){erros.shift()}}
})
routes.post("/", (req, res) => { 
if(erros.length >= 1){for(var i = 0; i = erros.length; i++){erros.shift()}}


if(! req.body.user || typeof req.body.user == undefined || req.body.user == null ||
  ! req.body.password || typeof req.body.password == undefined || req.body.password == null){
  erros.push({txt: "Preencha todos os campos!"})}

  if(erros.length > 1){
    console.log('erros')
            erros.forEach(erro => {
               console.log(erro.txt)})
  }else{


const userIf = req.body.user
  if(userIf.includes('@')){

   
    User.findOne({email:req.body.user}).then((userExist)=>{

    
      if(userExist){
       if(userExist.password == req.body.password){
        const user = userExist._id
        req.session.user = user
        const userSession = req.session.user 
        console.log(userSession)
        res.redirect(307, '/home')
        
  
       }else{
  
        res.redirect('/')
        erros.push({txt: "Usuário ou senha incorretos!"})
  
       }
        
   
      
    }
    else{
        res.redirect('/')
        erros.push({txt: "Usuário ou senha incorretos!"})
      }
      
      }).catch((err) => {
      console.log(err)
      })  

  }else(

    
    User.findOne({user:req.body.user}).then((userExist)=>{

    
      if(userExist){
       if(userExist.password == req.body.password){
        const user = userExist._id
        req.session.user = user
        const userSession = req.session.user 
        console.log(userSession)
        res.redirect(307, '/home')
    
        
  
       }else{
  
        res.redirect('/')
        erros.push({txt: "Usuário ou senha incorretos!"})
  
       }
        
   
      
    }
    else{
        res.redirect('/')
        erros.push({txt: "Usuário ou senha incorretos!"})
      }
      
      }).catch((err) => {
      console.log(err)
      })
  )
}
})


routes.get("/cadastro", function(req, res){
 
  res.render(views + "cadastro", {erros, errosUser, errosPass, errosEx, errosEmail})

  if(erros.length >= 1){for(var i = 0; i = erros.length; i++){erros.shift()}};
  if(errosUser.length >= 1){for(var i = 0; i = errosUser.length; i++){errosUser.shift()}}
  if(errosEx.length >= 1){for(var i = 0; i = errosEx.length; i++){errosEx.shift()}}
  if(errosEmail.length >= 1){for(var i = 0; i = errosEmail.length; i++){errosEmail.shift()}}
  if(errosPass.length >= 1){for(var i = 0; i = errosPass.length; i++){errosPass.shift()}}
})
routes.post("/cadastro", (req, res) => {
  if(erros.length >= 1){for(var i = 0; i = erros.length; i++){erros.shift()}}
  if(errosUser.length >= 1){for(var i = 0; i = errosUser.length; i++){errosUser.shift()}}
  if(errosEx.length >= 1){for(var i = 0; i = errosEx.length; i++){errosEx.shift()}}
  if(errosEmail.length >= 1){for(var i = 0; i = errosEmail.length; i++){errosEmail.shift()}}
  if(errosPass.length >= 1){for(var i = 0; i = errosPass.length; i++){errosPass.shift()}}

  const regex =  /^[a-z0-9]([._](?![._])|[a-z0-9]){4,12}[a-z0-9]$/
  const regexUser = regex.test(req.body.user)

if(! req.body.user || typeof req.body.user == undefined || req.body.user == null){erros.push({txt: "Campo user vazio"})}
else if(req.body.user.length < 4){errosUser.push({txt: "User muito pequeno, mínimo de 4 caracteres"})}
else if(req.body.user.length > 13){errosUser.push({txt: "User muito grande, máximo de 12 caracteres"})}
else if(regexUser == false){errosUser.push({txt:"User não pode conter letras maiúsculas e/ou caracteres especiais"})}


     const regexTwo = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,14}[a-zA-Z0-9]$/
     const regexEx = regexTwo.test(req.body.exibition)


if(! req.body.exibition || typeof req.body.exibition == undefined || req.body.exibition == null){
erros.push({txt: "Campo nome de exibição vazio"})}
else if(req.body.exibition.length < 4){errosEx.push({txt: "Nome de exibição muito pequeno, mínimo de 4 caracteres"})}
else if(req.body.exibition.length > 15){errosEx.push({txt: "Nome de exibição muito grande, máximo de 14 caracteres"})}
else if(regexEx == false){errosEx.push({txt: "Nome de exibição não pode conter caracteres especias"})}



var validateEmail = function(email){ var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; return re.test(email)} 
if(! req.body.email || typeof req.body.email == undefined || req.body.email == null){
erros.push({txt: "Campo email vazio"})}
else if(validateEmail(req.body.email) == false){ errosEmail.push({txt: "Campo email inváido"})}
        


if(! req.body.password || typeof req.body.password == undefined || req.body.password == null){
erros.push({txt: "Campo senha vazio"})}
else if(req.body.password.length < 6){errosPass.push({txt: "Senha muito pequena, mínimo de 6 caracteres"})}



          if(erros.length > 0){
            console.log('erros')
            erros.forEach(erro => {
               console.log(erro.txt)
            });

            res.redirect('/cadastro')

          }else{

  const newUser = {

    exibition: req.body.exibition,
    user: req.body.user,
    email: req.body.email,
    password: req.body.password

  }

  new User(newUser).save().then(() => {

    console.log("Usuário cadastrado com sucesso!")
    res.redirect(307, "/home")

  })
  .catch((erro) =>{

    console.log("Erro ao cadastrar usuário:" + erro)
    res.redirect("/cadastro")

  })
}
})

routes.post("/home", function(req, res){
  User.findOne({_id:req.session.user}).then((user)=>{
    userUser = user.user
    userEmail = user.email
    userEx = user.exibition
  })

    res.render(views + '/home',{userUser, userEmail, userEx})
})

routes.post("/logout", function(req, res){
  req.session.destroy()
  res.redirect('/')
  })


routes.get("/home", (req, res) =>{
  if(req.session.user){res.render(views + 'home', {userUser, userEmail, userEx})}else{res.render(views + 'logarse')}})

routes.get("/sobre-nos", (req, res) => {
  if(req.session.user){res.render(views + 'sobre-nos', {userUser, userEmail, userEx})}else{res.render(views + 'logarse')}})

routes.get("/sobre-site", (req, res) => {
  if(req.session.user){res.render(views + 'sobre-site', {userUser, userEmail, userEx})}else{res.render(views + 'logarse')}})
 

routes.get("/seu-perfil", (req, res) => {
  if(req.session.user){res.render(views + 'seu-perfil', {userUser, userEmail, userEx})}else{res.render(views + 'logarse')}})

routes.get("/suporte", function(req, res){
  if(req.session.user){res.render(views + 'suporte', {userUser, userEmail, userEx})}else{res.render(views + 'logarse')}})





module.exports = routes;
