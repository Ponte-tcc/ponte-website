const db = require('./db')

const Post = db.sequelize.define('postagens', {
    conteudo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
})

//Post.sync({force: true})

module.exports = Post