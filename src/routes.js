const express = require("express")
const routes = express.Router()
const views = __dirname + "/views/"
const mongoose = require("mongoose")
require("./models/User")
const User = mongoose.model("users")

require("./models/Suporte")
const Sup = mongoose.model("suportes")

require("./models/Publicado")
const Pub = mongoose.model("publicados")

var userUser
var userEmail
var userEx
var userID 

var perfilUser
var perfilEx

var sucs
const erros = []

var userAdm

const errosUser = []
const errosEx = []
const errosEmail = []
const errosPass = []

const regexOne = /^[a-z0-9]+([_ -.]?[a-z0-9])*$/
const regexTwo = /^[a-zA-Z0-9]+([_ -.]?[a-zA-Z0-9])*$/


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
        
        User.findOne({_id:req.session.user}).then((user)=>{
          userID = user._id
          userUser = user.user
          userEmail = user.email
          userEx = user.exibition
          res.redirect('/home')
        })

       
        
  
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
        
        User.findOne({_id:req.session.user}).then((user)=>{
          userID = user._id
          userUser = user.user
          userEmail = user.email
          userEx = user.exibition
          res.redirect('/home')
        })      
          
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

  
     
     console.log(req.body.user)
     console.log(regexOne.test(req.body.user))

if(! req.body.user || typeof req.body.user == undefined || req.body.user == null){erros.push({txt: "Campo user vazio"})}
else if(req.body.user.length < 4){errosUser.push({txt: "User muito pequeno, mínimo de 4 caracteres"})}
else if(req.body.user.length > 13){errosUser.push({txt: "User muito grande, máximo de 12 caracteres"})}
else if(regexOne.test(req.body.user) == false){errosUser.push({txt:"User não pode conter letras maiúsculas e/ou caracteres especiais"})}

     
     console.log(req.body.exibition)
     console.log(regexTwo.test(req.body.exibition))


if(! req.body.exibition || typeof req.body.exibition == undefined || req.body.exibition == null){
erros.push({txt: "Campo nome de exibição vazio"})}
else if(req.body.exibition.length < 4){errosEx.push({txt: "Nome de exibição muito pequeno, mínimo de 4 caracteres"})}
else if(req.body.exibition.length > 15){errosEx.push({txt: "Nome de exibição muito grande, máximo de 14 caracteres"})}
else if(regexTwo.test(req.body.exibition) == false){errosEx.push({txt: "Nome de exibição não pode conter caracteres especias"})}



var validateEmail = function(email){ var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; return re.test(email)} 
if(! req.body.email || typeof req.body.email == undefined || req.body.email == null){
erros.push({txt: "Campo email vazio"})}
else if(validateEmail(req.body.email) == false){ errosEmail.push({txt: "Campo email inváido"})}
        


if(! req.body.password || typeof req.body.password == undefined || req.body.password == null){
erros.push({txt: "Campo senha vazio"})}
else if(req.body.password.length <= 5){errosPass.push({txt: "Senha muito pequena, mínimo de 6 caracteres"})}



          if(erros.length > 0 || errosUser.length > 0 || errosEx.length > 0 
            || errosPass.length > 0 || errosEmail.length > 0){
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
    password: req.body.password,
    curtidas: '617822683fd1ac46842d338e',
    userAdm: 0

  }

  new User(newUser).save().then(() => {
    userEmail = req.body.email
    res.redirect(307, '/cadastroRedirect')
    console.log(userEmail + " Usuário cadastrado com sucesso!")
    
  })
  .catch((erro) =>{

    console.log("Erro ao cadastrar usuário:" + erro)
    res.redirect("/cadastro")

  })
}
})

routes.post('/cadastroRedirect', (req, res)=> {

  User.findOne({email:userEmail}).then((userExist)=>{

    console.log(userEmail)    
          req.session.user = userExist._id
          
          User.findOne({_id:req.session.user}).then((user)=>{
            userID = user._id
            userUser = user.user
            userEmail = user.email
            userEx = user.exibition
            userAdm = user.userAdm

            res.redirect('/home')
          })           
        
      
        
        }).catch((err) => {
        console.log(err)
        })

})


routes.post("/logout", function(req, res){
  req.session.destroy()
  res.redirect('/')
})


routes.post("/publicacoes", (req, res)=>{
  
  Pub.find({}).then((pubs)=>{

    res.render(views + 'adm/publicacoes', {pubs})

  })

})

routes.post("/perfis", (req, res)=>{
  
  User.find({userAdm:0}).then((users)=>{

    res.render(views + 'adm/perfis', {users})

  })

})


routes.get("/home", (req, res) =>{

  

if(req.session.user){

  User.findOne({_id:req.session.user}).then((userExist)=>{

    userAdm = userExist.userAdm


  })

Pub.find({}).sort({createdAt: 'desc'}).then((pubs)=>{




  var sessionID = req.session.user
  
  res.render(views + 'home', {userUser, userEmail, userEx, sucs, pubs, sessionID, userAdm})
  sucs = ''

})
}
else{res.render(views + 'logarse')}
})


routes.get("/suporte", function(req, res){
  if(req.session.user){
Sup.find({}).sort({createdAt: 'desc'}).then((sups)=>{

res.render(views + 'suporte', {userUser, userEmail, userEx, userID, sucs, erros, userAdm, sups})
    if(erros.length >= 1){for(var i = 0; i = erros.length; i++){erros.shift()}}
    sucs = ''

})
    
  }else{
    res.render(views + 'logarse')
}})

routes.post("/suporte",(req, res) =>{
if(erros.length >= 1){for(var i = 0; i = erros.length; i++){erros.shift()}};

if(! req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
erros.push({txt: "Preencha o campo suporte!"})
}
else if(req.body.conteudo.length < 11){
erros.push({txt: "Mínimo de 10 caracteres!"})
}

if(erros.length >= 1){

  res.redirect('/suporte')

}else{

  const newSup = {

    conteudo: req.body.conteudo,
    userUser: userUser,

  }

  new Sup(newSup).save().then(() => {

    console.log("Suporte cadastrado com sucesso!")
    sucs = "Suporte enviado!"
    res.redirect("/suporte")

  })
  .catch((erro) =>{

    console.log("Erro ao cadastrar suporte:" + erro)
    res.redirect("/suporte")

  })
}
})


routes.post("/publicar",(req, res) =>{
  
    const newPub = {
  
      userEx: userEx,
      userUser: userUser,
      conteudo: req.body.conteudo,
      idUser: userID,
      curtidas: 0,
  
    }
  
    new Pub(newPub).save().then(() => {
  
      console.log("Publicado com sucesso!")
      sucs = "Publicado!"
      res.redirect("/home")
  
    })
    .catch((erro) =>{
  
      console.log("Erro: " + erro)
      res.redirect("/home")
  
    })
  
})

routes.post("/descurtir/:id",(req, res) =>{
  

  Pub.findOne({_id:req.params.id}).then((pub)=>{

      pub.userEx = pub.userEx,
      pub.userUser =  pub.userUser,
      pub.conteudo = pub.conteudo,
      pub.idUser = pub.idUser,
      pub.curtidas = pub.curtidas - 1,

    pub.save().then(() => {

    
      res.redirect("/home")
  
    })
    .catch((erro) =>{
  
      console.log("Erro: " + erro)
      res.redirect("/home")
  
    })

  })
  

})

routes.post("/curtir/:id",async (req, res, next) =>{
  const id = req.session.user
  const curtida = req.params.id
  console.log(id)
  console.log(curtida)
  await User.findByIdAndUpdate({_id: id }, { $push: { curtidas: curtida } })
    .then(x => {
        console.log('salvo')
    })
    .catch(e => {
      console.log('nao salvo')
      })


Pub.findOne({_id:curtida}).then((pub)=>{

  
      pub.userEx = pub.userEx,
      pub.userUser =  pub.userUser,
      pub.conteudo = pub.conteudo,
      pub.idUser = pub.idUser,
      pub.curtidas = pub.curtidas + 1,

    pub.save().then(() => {

    
      res.redirect("/home")
  
    })
    .catch((erro) =>{
  
      console.log("Erro: " + erro)
      res.redirect("/home")
  
    })

  })
  
})


routes.post("/deletar/:id",(req, res) =>{
  
  Pub.remove({_id:req.params.id}).then(()=>{
    res.redirect('/home')
    console.log('deletado')
  }).catch((err)=>{console.log(err)})

})

routes.post("/deletar-adm/:id",(req, res) =>{
  
  Pub.remove({_id:req.params.id}).then(()=>{
    res.redirect(307, '/publicacoes')
    console.log('deletado')
  }).catch((err)=>{console.log(err)})

})

routes.post("/deletar-user-adm/:id",(req, res) =>{
  
  User.remove({_id:req.params.id}).then(()=>{
    res.redirect(307, '/perfis')
    console.log('deletado')
  }).catch((err)=>{console.log(err)})

})

routes.post("/deletar-sup-adm/:id",(req, res) =>{
  
  Sup.remove({_id:req.params.id}).then(()=>{
    res.redirect(307, '/suporte')
    console.log('deletado')
  }).catch((err)=>{console.log(err)})

})


routes.get("/sobre-nos", (req, res) => {
if(req.session.user){res.render(views + 'sobre-nos', {userUser, userEmail, userEx, userAdm})}
else{res.render(views + 'logarse')}
})


routes.get("/sobre-site", (req, res) => {
if(req.session.user){res.render(views + 'sobre-site', {userUser, userEmail, userEx, userAdm})}
else{res.render(views + 'logarse')}
})
 

routes.get("/perfil/:user", (req, res) => {

User.findOne({user:req.params.user}).then((userExist)=>{
if(req.session.user){

  perfilUser = userExist.user
  perfilEx = userExist.exibition


if(req.session.user == userExist._id){
  Pub.find({}).sort({createdAt: 'desc'}).then((pubs)=>{

    var sessionID = req.session.user
    
    res.render(views + 'perfil/perfil', {userUser, userEmail, userEx, pubs, 
      sessionID, perfilEx, perfilUser, userAdm})
    
  
  })
}else{
  Pub.find({userUser:perfilUser}).sort({createdAt: 'desc'}).then((pubs)=>{
    
    var sessionID = "NOT"

    res.render(views + 'perfil/perfil', {userUser, userEmail, userEx, pubs, 
      sessionID, perfilEx, perfilUser, userAdm})
    
  
  })


}

}else{res.render(views + 'logarse')}

})
})







module.exports = routes;
