const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')
// const { env: { JWT_SECRET } } = require('../config')

const generateToken = userId => {
    return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '12h' })
}

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) token = req.cookies['coderToken']
    return token
}

module.exports = {
	generateToken,
	cookieExtractor
}
