const express = require("express")
const admin = express.Router()
const mongo = require("./models/mongodb")
const views = __dirname + "/views/"

admin.get("/", (req, res) => res.render(views + "admin/adm", {}))
admin.get("/news", (req, res) => res.render(views + "admin/news", {}))


module.exports = admin;
