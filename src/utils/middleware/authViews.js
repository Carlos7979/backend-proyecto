const jwt = require('jsonwebtoken')
const { Users } = require('../../dao/MongoDB')
const { env: { JWT_SECRET } } = require('../../config')

const authViews = async (req, res, next) => {
	let token = null
    try {
		if (!Object.keys(req.cookies).length) return res.render('login', {})
		if (req && req.cookies) token = req.cookies['coderToken']

        const { sub } = jwt.verify(token, JWT_SECRET)

		if (!sub) return res.render('login', {})

        const userFound = await Users.getUserById(sub)

        if (!userFound) return res.render('login', {})

        req.user = sub
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authViews
