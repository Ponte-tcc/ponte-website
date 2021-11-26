const express = require("express");
const server = express();
const routes = require("./src/routes");
var cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo')

const uri =
  "mongodb+srv://nico:123321@cluster0.rtak1.mongodb.net/pontewebsiteDB?retryWrites=true&w=majority";

//middleware
server.use((req, res, next) => {
  //req.locals.success_msg = req.flash("success_msg")
  //req.locals.error_msg = req.flash("error_msg")
  next();
});

server.use(cookieParser());

//usando template engine
server.set("view engine", "ejs");

//conexão mongoose
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: true,
  })
  .then(() => {
    console.log("MongoDB Conectado...");
  })
  .catch((erro) => {
    console.log("Houve um erro ao se conectar: " + erro);
  });

//habilitar arquivos statics
server.use(express.static(__dirname + '/public'))


//usar o req.body
server.use(express.urlencoded({ extended: true }));

const session = require("express-session");
//sessions
server.use(
  session({
    key: 'user_sid',
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
    
    store: MongoStore.create({
      mongoUrl: uri,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native' 
  })
  })
);

//routes
server.use(routes);
server.listen(3000, () => console.log("Server Rodando!"));
