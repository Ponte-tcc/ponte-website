const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const Suporte = new Schema({

    conteudo: {

        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }

})

mongoose.model("suportes", Suporte)

