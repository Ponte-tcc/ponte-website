const mongoose  = require("mongoose");

const PublicadoSchema = new mongoose.Schema({

    conteudo: {

        type: String,
        required: true
    },
    userEx:{

        type: String,
        require: true,

    },
    userUser:{

        type: String,
        require: true,

    },
    idUser: {

        type: String,
        require: true,

    },
    createdAt:{ 
        type: Date,  
        default: Date.now 
    }

})

mongoose.model("publicados", PublicadoSchema)

const Pub = mongoose.model("publicados", PublicadoSchema)

module.exports = Pub