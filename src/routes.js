const express = require("express")
const routes = express.Router()
const Post = require('./models/Post')
const Sup = require('./models/Sup')
const User = require('./models/User')
const views = __dirname + "/views/"

  routes.get("/sobre-nos", (req, res) => res.render(views + "sobre-nos", {}))

  routes.get("/sobre-site", (req, res) => res.render(views + "sobre-site", {}))

  routes.get(""/*Header*/, (req, res) => res.render(views + "parts/page-header", {}))

  routes.get("/", (req, res) => res.render(views + "index", {}))
  routes.post("/", (req, res) => res.render(views + "index", {}))

  routes.get("/cadastro", function(req, res){
    Sup.findAll().then(function(sups){
      res.render(views + "cadastro")
    })
  });
  routes.post("/cadastro", function(req, res){
    User.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    }).then(function(){
      res.redirect('/')
    }).catch(function(erro){
      res.send("Houve um erro:" + erro)
    })
  })

  routes.get("/seu-perfil", (req, res) => res.render(views + "seu-perfil", {}))

  routes.get("/suporte", function(req, res){
    Sup.findAll().then(function(sups){
      res.render(views + "suporte")
    })
  });
  routes.post("/suporte", function(req, res){
    Sup.create({
      conteudo: req.body.conteudo
    }).then(function(){
      res.redirect('/suporte')
    }).catch(function(erro){
      res.send("Houve um erro:" + erro)
    })
  })

  routes.get("/home", function(req, res){
    Post.findAll().then(function(posts){
      res.render(views + "home", {posts: posts})
    })
  })
  routes.post("/home", function(req, res){
    Post.create({
      conteudo: req.body.conteudo
    }).then(function(){
      res.redirect('/home')
    }).catch(function(erro){
      res.send("Houve um erro:" + erro)
    })
  })

module.exports = routes;
