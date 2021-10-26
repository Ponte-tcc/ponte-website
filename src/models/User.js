const mongoose = require("mongoose")

/*const uri = "mongodb+srv://nico:123321@cluster0.rtak1.mongodb.net/pontewebsiteDB?retryWrites=true&w=majority"

mongoose.Promise = global.Promise
mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
console.log("MongoDB Conectado...")
}).catch((erro) => {
console.log("Houve um erro ao se conectar: " + erro)
})*/


const UserSchema = mongoose.Schema({

    user:{
        type: String,
        require: true,
        unique: true,
        null: false,
        lowercase: true,
        
    },
    exibition:{

        type: String,
        require: true,
        unique: false,
        null: false,
        lowercase: false,

    },
    password:{
        type: String,
        require: true,
        unique: false,
        null: false,
        lowercase: false,

    },
    email:{
        type: String,
        require: true,
        unique: true,
        null: false,
        lowercase: true,

    },         
    createdAt:{ 
        type: Date,  
        default: Date.now 
    }
})



 mongoose.model('users', UserSchema)

const User = mongoose.model('users', UserSchema)

module.exports = User

/*new User({

    email: "alui@eu.com",
    valida: 2,
    perfil: "hist",
    dest: "roma"

}).save()
.then(() => {
    console.log("Pedido cadastrado")
}).catch((erro) => {
    console.log("Houve um erro " + erro)
})*/



