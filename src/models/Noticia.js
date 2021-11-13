const mongoose  = require("mongoose");

const NoticiaSchema = new mongoose.Schema({

    titulo: {

        type: String,
        required: true
    },
    categoria: {

        type: String,
        require: true,

    },
    conteudo: {

        type: String,
        require: true,

    },
    createdAt:{ 
        type: Date,  
        default: Date.now 
    }

})

mongoose.model("noticias", NoticiaSchema)

const Noti = mongoose.model('noticias', NoticiaSchema)

module.exports = Noti