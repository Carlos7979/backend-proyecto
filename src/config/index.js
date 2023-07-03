const adminUser = require('./adminUser')
const initializePassport = require('./passport.config')
const env = require('./config')

module.exports = {
	adminUser,
	initializePassport,
	env
}