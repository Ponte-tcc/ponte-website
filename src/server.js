const express = require("express")
const server = express()
const routes = require("./routes")
const admin = require("./routes-adm")
const session = require("express-session")
const flash = require("connect-flash")

//sessions
server.use(session({
    secret: "123321",
    resave: true,
    saveUninitialized: true
}))
server.use(flash())

//middleware
server.use((req, res, next) => {
    //req.locals.success_msg = req.flash("success_msg")
    //req.locals.error_msg = req.flash("error_msg")
    next()
    
    })


//usando template engine
server.set("view engine", "ejs")

//conexão mongoose
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/ponteweb2", {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Conectado...")
}).catch((erro) => {
    console.log("Houve um erro ao se conectar: " + erro)
})



//habilitar arquivos statics
server.use(express.static("public"))


//usar o req.body
server.use(express.urlencoded({ extended: true }))


//routes
server.use(routes)
server.use('/admin', admin)
server.listen(3000, () => console.log("Server Rodando!"))
