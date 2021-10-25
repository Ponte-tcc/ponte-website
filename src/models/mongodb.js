const mongoose = require("mongoose")


//models
/*const UserSchema = mongoose.Schema({

    nome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    senha:{
        type: String,
        require: true
    },

})

mongoose.model('usuarios', UserSchema)

const Nico = mongoose.model('usuarios', UserSchema)

new Nico({

    nome: "ola mundo!",
    email: "eu@eu.com" ,
    senha: "123"

}).save()
.then(() => {
    console.log("usuario cadastrado")
}).catch((erro) => {
    console.log("houve um erro" + erro)
})


/*const PostSchema = mongoose.Schema({

    conteudo:{
        type: String,
        require: true
    }

})mongoose.model('posts', PostSchema)*/