const express = require("express")
const routes = express.Router()
const views = __dirname + "/views/"
const mongoose = require("mongoose")
require("./models/Usuario")
const Usuario = mongoose.model("usuarios")
require("./models/Suporte")
const Suporte = mongoose.model("suportes")


routes.get("/sobre-nos", (req, res) => res.render(views + "sobre-nos", {}))


routes.get("/sobre-site", (req, res) => res.render(views + "sobre-site", {}))


routes.get("/", (req, res) => res.render(views + "index", {}))
routes.post("/", (req, res) => {

})


routes.get("/cadastro", function(req, res){
  res.render(views + "cadastro")
});

routes.post("/cadastro", (req, res) => {

  const novoUsuario = {

    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha

  }

  new Usuario(novoUsuario).save().then(() => {

    console.log("Usuário cadastrado com sucesso!")
    res.redirect("/")

  })
  .catch((erro) =>{

    console.log("Erro ao cadastrar usuário:" + erro)
    res.redirect("/")

  })

})


routes.get("/seu-perfil", (req, res) => res.render(views + "seu-perfil", {}))


routes.get("/suporte", function(req, res){
  res.render(views + "suporte")
});

routes.post("/suporte", (req, res) => {
  
  const novoSuporte = {

    conteudo: req.body.conteudo

  }

  new Suporte(novoSuporte).save().then(() => {

    console.log("Suporte gravado com sucesso!")
    res.redirect("/suporte")

  })
  .catch((erro) =>{

    console.log("Erro ao gravar suporte:" + erro)
    res.redirect("/suporte")

  })
  
})


routes.get("/home", function(req, res){
  res.render(views + "home")
})

routes.post("/home", function(req, res){
    res.redirect('/home')
})

module.exports = routes;
