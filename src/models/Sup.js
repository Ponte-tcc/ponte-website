const db = require('./db')

const Sup = db.sequelize.define('suportes', {
    conteudo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
})

//Sup.sync({force: true})

module.exports = Sup