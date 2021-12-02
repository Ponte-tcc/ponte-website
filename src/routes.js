const express = require("express");
const routes = express.Router();
const views = __dirname + "/views/";
const mongoose = require("mongoose");

const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("")
const $ = require('jquery')(dom.window)

require("./models/User");
const User = mongoose.model("users");

require("./models/Suporte");
const Sup = mongoose.model("suportes");

require("./models/Publicado");
const Pub = mongoose.model("publicacoes");

require("./models/Noticia");
const Noti = mongoose.model("noticias");

require("./models/Teste");
const Teste = mongoose.model("testes");

var userUser;
var userEmail;
var userEx;
var userID;
var publiCurtidas = [];

var perfilUser;
var perfilEx;

var curtida
var star 

var sucs;
const erros = [];

var userAdm;

const errosUser = [];
const errosEx = [];
const errosEmail = [];
const errosPass = [];

var idPubli;


var naoLogado;
var sessionID;

const regexOne = /^[a-z0-9]+([_ -.]?[a-z0-9])*$/;
const regexTwo = /^[a-zA-Z0-9]+([_ -.]?[a-zA-Z0-9])*$/;



//MIDDLEWARES

routes.use((req, res, next) => {
  
  if (!req.session.user ) {
    naoLogado = 1
    res.clearCookie('user_sid');
  }else{

    naoLogado = 0
    userID = req.session.user._id;
    userUser = req.session.user.user;
    userEmail = req.session.user.email;
    userEx = req.session.user.exibition;
    userAdm = req.session.user.userAdm;
     

    
    for (var i = 0; (i = publiCurtidas.length); i++) {
      publiCurtidas.shift();
    }
    
    for (var i = 0; i < req.session.user.publiCurtidas.length; i++) {
      publiCurtidas.push(req.session.user.publiCurtidas[i]);
    
}

  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {

    naoLogado = 0
    res.redirect('/home')

  } else {
    
    next();
  }
};

var logadoChecker = (req, res, next) => {
  if (naoLogado == 1) {
    
    res.render(views + 'logarse', {naoLogado})

  } else {
    
    next();
  }
};




//GET

routes.get("/", sessionChecker, (req, res) => {
  
  naoLogado = 1;
 
  res.render(views + "index", { erros, naoLogado });
  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }
});

routes.get("/home", logadoChecker, (req, res) => {
naoLogado = 0
  console.log(req.session.user)
  
  if (req.session.user) {
    var sessionID = req.session.user._id;

    
    Pub.find({})
      .sort({ createdAt: "desc" })
      .then((pubs) => {



      
        Noti.find({})
          .sort({ createdAt: "asc" })
          .then((nots) => {

            

            res.render(views + "home", {
              userUser,
              userEmail,
              userEx,
              sucs,
              pubs,
              nots,
              sessionID,
              userAdm,
              idPubli,
              publiCurtidas,
              Pub,
              User,
              naoLogado,
            });

            sucs = "";
          });
      });
  }
});

routes.get("/suporte", logadoChecker, (req, res) => {
  naoLogado = 0;

  if (req.session.user) {
    Sup.find({})
      .sort({ createdAt: "desc" })
      .then((sups) => {
        res.render(views + "suporte", {
          userUser,
          userEmail,
          userEx,
          userID,
          sucs,
          erros,
          userAdm,
          sups,
          naoLogado,
        });
        if (erros.length >= 1) {
          for (var i = 0; (i = erros.length); i++) {
            erros.shift();
          }
        }
        sucs = "";
      });
  }
});

routes.get("/cadastro", sessionChecker,  (req, res)=> {
  
  naoLogado = 1;

  res.render(views + "cadastro", {
    erros,
    errosUser,
    errosPass,
    errosEx,
    errosEmail,
    naoLogado,
  });

  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }
  if (errosUser.length >= 1) {
    for (var i = 0; (i = errosUser.length); i++) {
      errosUser.shift();
    }
  }
  if (errosEx.length >= 1) {
    for (var i = 0; (i = errosEx.length); i++) {
      errosEx.shift();
    }
  }
  if (errosEmail.length >= 1) {
    for (var i = 0; (i = errosEmail.length); i++) {
      errosEmail.shift();
    }
  }
  if (errosPass.length >= 1) {
    for (var i = 0; (i = errosPass.length); i++) {
      errosPass.shift();
    }
  }

});

routes.get("/sobre", logadoChecker, (req, res) => {
  naoLogado = 0;

  if (req.session.user) {
    res.render(views + "sobre", {
      userUser,
      userEmail,
      userEx,
      userAdm,
      naoLogado,
    });
  }
});

routes.get("/perfil/:user", logadoChecker, (req, res) => {
  naoLogado = 2;

  if (req.session.user) {
    User.findOne({ user: req.params.user }).then((userExist) => {
      if (req.session.user == userExist._id) {
        sessionID = "YES";
        perfilUser = userExist.user;
        perfilEx = userExist.exibition;

        Pub.find({ userUser: userExist.user })
          .sort({ createdAt: "desc" })
          .then((pubs) => {
            sessionID = req.session.user;

            res.render(views + "perfil", {
              perfilEx,
              perfilUser,
              userUser,
              userEmail,
              userEx,
              sucs,
              pubs,
              sessionID,
              userAdm,
              idPubli,
              publiCurtidas,
              
              User,
              naoLogado,
            });
          });
      } else {
        sessionID = "NOT";
        perfilUser = userExist.user;
        perfilEx = userExist.exibition;

        Pub.find({ userUser: perfilUser })
          .sort({ createdAt: "desc" })
          .then((pubs) => {
            res.render(views + "perfil", {
              perfilEx,
              perfilUser,
              userUser,
              userEmail,
              userEx,
              sucs,
              pubs,
              sessionID,
              userAdm,
              idPubli,
              publiCurtidas,
              
              User,
              naoLogado,
            });
          });
      }
    });
  } else {
    res.render(views + "logarse", { naoLogado });
  }
});



// POST

routes.post('/ajax', (req, res) => {

  const newTeste = {
    hero: req.body.ajax,
  };

  new Teste(newTeste)
    .save()
    .then((nots) => {
      console.log('ae')
    })
    .catch((erro) => {
      console.log('ae n ' + erro)
    });
})


routes.post("/", (req, res) => {
  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }

  if (
    !req.body.user ||
    typeof req.body.user == undefined ||
    req.body.user == null ||
    !req.body.password ||
    typeof req.body.password == undefined ||
    req.body.password == null
  ) {
    erros.push({ txt: "Preencha todos os campos!" });
  }

  if (erros.length > 1) {
    
    erros.forEach((erro) => {
      
    });
  } else {
    const userIf = req.body.user;
    if (userIf.includes("@")) {
      User.findOne({ email: req.body.user })
        .then((userExist) => {
          if (userExist) {
            if (userExist.password == req.body.password) {
              const user = userExist._id;
              

              User.findOne({ _id: user }).then((userFind) => {
                
                req.session.user = userFind
                naoLogado = 0;
                res.redirect("/home");
              });
            } else {
              res.redirect("/");
              erros.push({ txt: "Usuário ou senha incorretos!" });
            }
          } else {
            res.redirect("/");
            erros.push({ txt: "Usuário ou senha incorretos!" });
          }
        })
        .catch((err) => {
          
        });
    } else
      User.findOne({ user: req.body.user })
        .then((userExist) => {
          if (userExist) {
            if (userExist.password == req.body.password) {
              const user = userExist._id;
             

              User.findOne({ _id:user }).then((userFind) => {
                
                req.session.user = userFind
               
                naoLogado = 0;
                res.redirect("/home");
              });
            } else {
              res.redirect("/");
              erros.push({ txt: "Usuário ou senha incorretos!" });
            }
          } else {
            res.redirect("/");
            erros.push({ txt: "Usuário ou senha incorretos!" });
          }
        })
        .catch((err) => {
          
        });
  }
});

routes.post("/cadastro", (req, res) => {
  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }
  if (errosUser.length >= 1) {
    for (var i = 0; (i = errosUser.length); i++) {
      errosUser.shift();
    }
  }
  if (errosEx.length >= 1) {
    for (var i = 0; (i = errosEx.length); i++) {
      errosEx.shift();
    }
  }
  if (errosEmail.length >= 1) {
    for (var i = 0; (i = errosEmail.length); i++) {
      errosEmail.shift();
    }
  }
  if (errosPass.length >= 1) {
    for (var i = 0; (i = errosPass.length); i++) {
      errosPass.shift();
    }
  }
 



  if (
    !req.body.user ||
    typeof req.body.user == undefined ||
    req.body.user == null
  ) {
    erros.push({ txt: "Campo user vazio" });
  } else if (req.body.user.length < 4) {
    errosUser.push({ txt: "User muito pequeno, mínimo de 4 caracteres" });
  } else if (req.body.user.length > 13) {
    errosUser.push({ txt: "User muito grande, máximo de 12 caracteres" });
  } else if (regexOne.test(req.body.user) == false) {
    errosUser.push({
      txt: "User não pode conter letras maiúsculas e/ou caracteres especiais",
    });
  }



  if (
    !req.body.exibition ||
    typeof req.body.exibition == undefined ||
    req.body.exibition == null
  ) {
    erros.push({ txt: "Campo nome de exibição vazio" });
  } else if (req.body.exibition.length < 4) {
    errosEx.push({
      txt: "Nome de exibição muito pequeno, mínimo de 4 caracteres",
    });
  } else if (req.body.exibition.length > 15) {
    errosEx.push({
      txt: "Nome de exibição muito grande, máximo de 14 caracteres",
    });
  } else if (regexTwo.test(req.body.exibition) == false) {
    errosEx.push({
      txt: "Nome de exibição não pode conter caracteres especias",
    });
  }

  var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  if (
    !req.body.email ||
    typeof req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.push({ txt: "Campo email vazio" });
  } else if (validateEmail(req.body.email) == false) {
    errosEmail.push({ txt: "Campo email inváido" });
  }

  if (
    !req.body.password ||
    typeof req.body.password == undefined ||
    req.body.password == null
  ) {
    erros.push({ txt: "Campo senha vazio" });
  } else if (req.body.password.length <= 5) {
    errosPass.push({ txt: "Senha muito pequena, mínimo de 6 caracteres" });
  }

  if (
    erros.length > 0 ||
    errosUser.length > 0 ||
    errosEx.length > 0 ||
    errosPass.length > 0 ||
    errosEmail.length > 0
  ) {
    
    res.redirect("/cadastro");
  } else {
    const newUser = {
      exibition: req.body.exibition,
      user: req.body.user,
      email: req.body.email,
      password: req.body.password,
      userAdm: 0,
    };

    new User(newUser)
      .save()
      .then((userFind) => {

        req.session.user = userFind
        naoLogado = 0;
        res.redirect("/home");
        
      })
      .catch((erro) => {
        
        res.redirect("/cadastro");
      });
  }
});

routes.post("/logout", function (req, res) {
  req.session.destroy();
  naoLogado = 1
  res.redirect("/");
  
});

routes.post("/publicacoes", (req, res) => {
  Pub.find({}).then((pubs) => {
    res.render(views + "adm/publicacoes", { pubs });
  });
});

routes.post("/perfis", (req, res) => {
  User.find({ userAdm: 0 }).then((users) => {
    res.render(views + "adm/perfis", {
      users,
      userUser,
      userEmail,
      userEx,
      sucs,
      sessionID,
      userAdm,
      idPubli,
      publiCurtidas,
      naoLogado,
    });
  });
});

routes.post("/suporte", (req, res) => {
  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }

  if (
    !req.body.conteudo ||
    typeof req.body.conteudo == undefined ||
    req.body.conteudo == null
  ) {
    erros.push({ txt: "Preencha o campo suporte!" });
  } else if (req.body.conteudo.length < 11) {
    erros.push({ txt: "Mínimo de 10 caracteres!" });
  }

  if (erros.length >= 1) {
    res.redirect("/suporte");
  } else {
    const newSup = {
      conteudo: req.body.conteudo,
      userUser: userUser,
    };

    new Sup(newSup)
      .save()
      .then(() => {
        
        sucs = "Suporte enviado!";
        res.redirect("/suporte");
      })
      .catch((erro) => {
        
        res.redirect("/suporte");
      });
  }
});

routes.post("/publicar", (req, res) => {
  const newPub = {
    userEx: userEx,
    userUser: userUser,
    conteudo: req.body.conteudo,
    idUser: userID,
    
  };

  new Pub(newPub)
    .save()
    .then((pubs) => {
      
      sucs = "Publicado!";
      naoLogado = 0
      res.redirect("/home");
    })
    .catch((erro) => {
      naoLogado = 0
      res.redirect("/home");
    });
});

routes.post("/publiNoticia", (req, res) => {
  const newNoti = {
    titulo: req.body.inputTitleNoti,
    categoria: req.body.inputCatNoti,
    conteudo: req.body.inputContNoti,
  };

  new Noti(newNoti)
    .save()
    .then((nots) => {
      naoLogado = 0
      res.redirect("/home");
      sucs = "Publicado!";
    })
    .catch((erro) => {
      naoLogado = 0
      res.redirect("/home");
    });
});

routes.post("/descurtir/:id", (req, res) => {

  idPubli = req.params.id;

  

  const index = req.session.user.publiCurtidas.indexOf(idPubli);
if (index > -1) {
  req.session.user.publiCurtidas.splice(index, 1);
}

  User.findByIdAndUpdate({ _id: userID }, { $pull: { publiCurtidas: idPubli } })
    .then((x) => {
      
      
    
        Pub.findByIdAndUpdate({ _id: idPubli }, { $pull: { userCurtidas: x.user } })
          .then((xx) => {
            
           if (naoLogado == 2) {
              res.redirect("/perfil/" + xx.userUser);
            } else {
              naoLogado = 0
              res.redirect("/home");
            }
          })
          .catch((ee) => {
            
          });
      }).catch((e) => {

      
})
})

routes.post("/curtir/:id", async (req, res, ) => {
  
  idPubli = req.params.id;
  
  req.session.user.publiCurtidas.push(idPubli)
  await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { publiCurtidas: idPubli } }
  )
    .then((x) => {

        

        Pub.findByIdAndUpdate({ _id: idPubli }, { $push: { userCurtidas: x.user } })
          .then((xx) => {

            
            if (naoLogado == 2) {
              res.redirect("/perfil/" + xx.userUser);
            } else {
              naoLogado = 0
              res.redirect("/home");
            }
          })
          .catch((ee) => {
            console.log(ee)
          });
      

    })
    .catch((e) => {
      
    });

  

  
});

routes.post("/comentar/:id", (req, res) => {
  if (
    !req.body.contComent ||
    typeof req.body.contComent == "undefined" ||
    req.body.contComent == null
  ) {
    
    if (naoLogado == 2) {
      res.redirect("/perfil/" + userUser);
    } else {
      naoLogado = 0
      res.redirect("/home");
    }
  } else {
    var comment = {
      contComent: req.body.contComent,
      userEx: userEx,
      userUser: userUser,
    };

    Pub.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { comentarios:  comment  } }
    )
      .then((x) => {
        if (naoLogado == 2) {
          res.redirect("/perfil/" + perfilUser);
        } else {
          naoLogado = 0
          res.redirect("/home");
        }
      })
      .catch((e) => {
       
      });
  }
});

routes.post("/deletar/:id", (req, res) => {
  Pub.remove({ _id: req.params.id })
    .then(() => {
      if (naoLogado == 2) {
        res.redirect("/perfil/" + userUser);
      } else {
        naoLogado = 0
        res.redirect("/home");
      }

      
    })
    .catch((err) => {
      
    });
});

routes.post("/deletar-noti-adm/:id", (req, res) => {
  Noti.remove({ _id: req.params.id })
    .then(() => {
      naoLogado = 0
      res.redirect("/home");
      
    })
    .catch((err) => {
      
    });
});

routes.post("/deletar-adm/:id", (req, res) => {
  Pub.remove({ _id: req.params.id })
    .then(() => {
      res.redirect(307, "/publicacoes");
      
    })
    .catch((err) => {
      
    });
});

routes.post("/deletar-user-adm/:id", (req, res) => {
  User.remove({ _id: req.params.id })
    .then(() => {
      res.redirect(307, "/perfis");
     
    })
    .catch((err) => {
     
    });
});

routes.post("/deletar-sup-adm/:id", (req, res) => {
  Sup.remove({ _id: req.params.id })
    .then(() => {
      res.redirect(307, "/suporte");
     
    })
    .catch((err) => {
      
    });
});


module.exports = routes;
