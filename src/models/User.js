const db = require('./db')
const User = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING(15),
        len: [4,15],
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING(120),
        len: [8,120],
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING(16),
        len: [6,16],
        allowNull: false
    },
    avatar: {
        type: db.Sequelize.BLOB('long')
    }
})

//User.sync({force: true})

module.exports = User