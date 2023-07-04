const bcrypt = require('bcrypt')

const hash = {
    createHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },
    isValidPassword(user, password) {
        return bcrypt.compareSync(password, user.password)
    }
}

module.exports = hash;