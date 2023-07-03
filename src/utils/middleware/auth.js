const jwt = require('jsonwebtoken')
const { Users } = require('../../dao/MongoDB')
const { env: { JWT_SECRET } } = require('../../config')

const auth = async (req, res, next) => {
	let token = null
    try {
		if (!Object.keys(req.cookies).length) {
			throw { status: 401, message: 'No autenticado' }
		}
		if (req && req.cookies) token = req.cookies['coderToken']
        const { sub } = jwt.verify(token, JWT_SECRET)

		if (!sub) throw { status: 403, message: 'No autorizado' }

        const userFound = await Users.getUserById(sub)
        if (!userFound) throw { status: 403, message: 'No autorizado' }

        req.user = sub

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = auth