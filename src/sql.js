const Sequelize = require("sequelize");

//Conexão com o banco de dados MySql
    const sequelize = new Sequelize("ponteapp", "root", "123321",{
    host: "localhost",
    dialect: "mysql",
    });


const Suporte = sequelize.define("suporte", {
  suportetxt: {
    type: Sequelize.TEXT, not: null,
  }
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

Suporte.sync({force : true})

//Insert usuarios

/*Usuario.create({
  nome: "Nicolas",
  sobrenome: "Viana",
  idade: 17,
  email: "nico@gmail.com"
})*/

//Insert postagens

/*Postagem.create({
  titulo: "TI para todos",
  conteudo: "loren djasdj jjsad jh jjhasdj jhs hdjahd jahsdjh, ahsjdj s sdad.",
})*/

//Commandos para executar o sequelize no banco de dados

//Usuario.sync({force : true})
//Postagem.sync({force : true})


//ver se está tudo OK!

/*sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro)
})*/
