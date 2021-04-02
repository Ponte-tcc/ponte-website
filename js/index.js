const express = require('express')
const session = require('express-session')

const port = 3000
const path = require('path')
const app = express()

var login = "nicoo"
var password = "123123nn"

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({secret:'asdj1124nawjdnad'}))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, '/views'))


app.post('/',(req,res) =>{

    if(req.body.loginjs == login && req.body.senhajs == password){

        req.session.login = login
        res.render('home')

    }else{

        console.log('Usuário ou Senha incorretos')
        res.render('index')

    }

    console.log(req.body.loginjs)
    console.log(req.body.passwordjs)

})

app.get('/',(req,res) =>{

    if(req.session.login){

        res.render('home')

    }
    else{

        res.render('index')

    }

})

app.listen(port,() => {
    console.log('Server Rodando!')
})



