const mongoose = require("mongoose")

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
    userAdm:{
        type: Number,
        require: true,
        unique: false,
        null: false,
        lowercase: false,

    }, 
    publiCurtidas:{
        type: Array,
        require: false,
        unique: false,
        null: false,

    },          
    createdAt:{ 
        type: Date,  
        default: Date.now 
    }
})

 mongoose.model('users', UserSchema)

const User = mongoose.model('users', UserSchema)

module.exports = User



