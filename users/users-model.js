const db = require('../data/db-config')
const bcrypt = require('bcryptjs')

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)
    const [id] = await db('users')
    .insert(user)
    return findById(id)
}

function find() {
   return db('users')
        .select('id', 'username')

}

function findBy(filter) {
    return db('users')
        .where(filter)
        .select('id', 'username', 'password')
}

function findById(id) {
    return db('users')
        .where({ id })
        .first('id', 'username')

}





module.exports = {
    add,
    find,
    findBy,
    findById,
}