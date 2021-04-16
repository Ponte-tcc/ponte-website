const Sequelize = require("sequelize");

//Conexão com o banco de dados MySql
    const sequelize = new Sequelize("ponteweb", "root", "123321",{
    host: "localhost",
    dialect: "mysql",
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}