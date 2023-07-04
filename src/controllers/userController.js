const { adminUser } = require("../config")
const { userManager } = require("../dao/MongoDB")
const { jwt } = require("../utils")
const { isValidPassword } = require("../utils/hash")
const { emailValidate } = require("../utils/validate")

class UserController {
	createUser = async (req, res, next) => {
		const { first_name, last_name, email, password, date_of_birth } = req.body
		try {
			if (!first_name || !last_name || !email || !password || !date_of_birth) {
				throw new Error('Todos los campos son obligatorios')
			}
			emailValidate(email)
			const user = await userManager.addUser({ first_name, last_name, email, password, date_of_birth })
			if (user === 'Todos los campos son obligatorios')
				throw new Error('Todos los campos son obligatorios')
			if (user === 'Error al crear carrito de compras')
				throw new Error('Error al crear carrito de compras')
			if (user === 'Correo ya registrado') throw new Error('Correo ya registrado')
			const token = jwt.generateToken(user._id)
			res.cookie('coderToken', token, {
				maxAge: 1000 * 60 * 60 * 12,
				httpOnly: true
			}).send({ status: 'success', payload: user })
		} catch (error) {
			next(error)
		}
	}

	loginUser = async (req, res, next) => {
		const { email, password } = req.body
		try {
			emailValidate(email)
			if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
				const token = jwt.generateToken(adminUser._id)
				return res.send({ status: 'success', payload: { token, user: adminUser } })
			}
			const user = await userManager.getUserByEmail(email)
			if (user === 'Not found')
				throw new Error(`El usuario con el email ${email} no se encuentra registrado.`)
			if (!isValidPassword(user, password))
				throw { message: 'La contraseña proporcionada es incorrecta', status: 401 }
			const token = jwt.generateToken(user._id)
			const { __v, password: passwordNewUser, ...response } = user._doc
			res.cookie('coderToken', token, {
				maxAge: 1000 * 60 * 60 * 12,
				httpOnly: true
			}).send({ status: 'success', payload: response })
		} catch (error) {
			next(error)
		}
	}

	githubCallback = (req, res, next) => {
        if (!req.user)
            return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
        // res.send({ status: 'success', payload: req.user })
        const token = jwt.generateToken(req.user._id)
        const { __v, password: passwordNewUser, ...response } = req.user
        res.cookie('coderToken', token, {
            maxAge: 1000 * 60 * 60 * 12,
            httpOnly: true
        }).redirect('/products')
    }

	getUser = async (req, res, next) => {
		try {
			res.send({ status: 'success', payload: req.user })
		} catch (error) {
			next(error)
		}
	}

	logoutUser = (req, res, next) => {
		try {
			res.clearCookie('coderToken').send('Logout OK')
		} catch (error) {
			next(error)
		}
	}
}

module.exports = UserController