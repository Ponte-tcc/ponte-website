const Sequelize = require("sequelize");
const sequelize = new Sequelize("ponte", "root", "123321", {
  host: "localhost",
  dialect: "mysql",
});

const Postagem = sequelize.define("postagens", {
  titulo: {
    type: Sequelize.STRING,
  },
  conteudo: {
    type: Sequelize.TEXT,
  },
});

const Usuario = sequelize.define("usuarios", {
  nome: {
    type: Sequelize.STRING,
  },
  sobrenome: {
    type: Sequelize.STRING,
  },
  idade: {
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING,
  },
});

//Usuario.sync({force : true})

//ver se está tudo OK!

/*sequelize.authenticate().then(function(){

    console.log("Conectado com sucesso!")

}).catch(function(erro){

    console.log("Falha ao se conectar: " + erro)

})*/
