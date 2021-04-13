const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {

    id : 3,
    name: "Nico",
    email: "nicolas@gmail.com",
    born : "06-04-2000",
    password : 3315,
    avatar: "https://avatars.githubusercontent.com/u/80636884?v=4",
    created_at : Date.now()
    
}

const users = [
    {

    id : 1,  
    name : "Paulo",
    email : "Paulo123@gmail.com",
    born : "06-04-2000",
    password : 101010,
    avatar : "https://avatars.githubusercontent.com/u/80636884?v=4",
    created_at : Date.now()

},

{

    id : 2,  
    name : "Paula",
    email : "Luana123@gmail.com",
    born : "02-07-1999",
    password : 121212,
    avatar : "https://avatars.githubusercontent.com/u/80636884?v=4",
    created_at : Date.now()

},

{   
    id : 3,
    name: "Nico",
    email: "nicolas@gmail.com",
    born : "06-04-2000",
    password : 3315,
    avatar: "https://avatars.githubusercontent.com/u/80636884?v=4",
    created_at : Date.now()
}]

const publi = [{

    publiGo : "Olá Mundo"

},
{

    publiGo : "Olá Lula Lindo"

}]


routes.post('/home', (req, res) => { 

    
    publi.push( req.body ) 
    console.log(publi[0])
    return res.redirect('/home')
    

})

routes.post('/', (req, res) => { 

    login.push( req.body ) 
    return res.redirect('/home')

})


routes.post('/cadastro', (req, res) =>  {

    const lastId = users[users.length - 1]?.id || 1

    users.push({

        id : lastId + 1,  
        name : req.body.name,
        email : req.body.email,
        born : req.body.born,
        password : req.body.password,
        created_at : Date.now() // atribuindo data de hoje

    })
    return res.redirect('/')

})

routes.get('/', (req, res) =>  res.render( views + "index", { profile }))
routes.get('/cadastro', (req, res) =>  res.render( views + "cadastro", { profile }))
routes.get('/home', (req, res) =>  res.render( views + "home", { profile, users, publi }))
routes.get('/seu-perfil', (req, res) =>  res.render( views + "seu-perfil", { profile }))
routes.get('/sobre-nos', (req, res) =>  res.render( views + "sobre-nos", { profile }))
routes.get('/sobre-site', (req, res) =>  res.render( views + "sobre-site", { profile }))
routes.get('/suporte', (req, res) =>  res.render( views + "suporte", { profile }))
routes.get('/', (req, res) =>  res.render( views + "parts/page-header", { profile }))

module.exports = routes