const mongoose  = require("mongoose");

const TesteSchema = new mongoose.Schema({

    hero: {

        type: String,
        required: true
    },
    

})

mongoose.model("testes", TesteSchema)

const Teste = mongoose.model('testes', TesteSchema)

module.exports = Teste