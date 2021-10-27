const mongoose  = require("mongoose");

const SuporteSchema = new mongoose.Schema({

    conteudo: {

        type: String,
        required: true
    },
    userUser: {

        type: String,
        require: true,

    },
    createdAt:{ 
        type: Date,  
        default: Date.now 
    }

})

mongoose.model("suportes", SuporteSchema)

const Sup = mongoose.model('suportes', SuporteSchema)

module.exports = Sup