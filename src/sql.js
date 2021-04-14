const Sequelize = require("sequelize");
const sequelize = new Sequelize("ponte", "root", "123321", {
  host: "localhost",
  dialect: "mysql",
});
