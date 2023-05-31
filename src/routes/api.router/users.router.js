const { Router } = require('express')
const router = Router()
const { Users } = require('../../dao/MongoDB')
const { emailValidate } = require('../../utils/controller/validate')

router.post('/', async (req, res, next) => {
    const { first_name, last_name, email, password, date_of_birth } = req.body
    try {
        if (!first_name || !last_name || !email || !password || !date_of_birth) {
            throw new Error('Todos los campos son obligatorios')
        }
        emailValidate(email)
        const user = await Users.addUser({ first_name, last_name, email, password, date_of_birth })
        if (user === 'Todos los campos son obligatorios')
            throw new Error('Todos los campos son obligatorios')
        if (user === 'Error al crear carrito de compras')
            throw new Error('Error al crear carrito de compras')
        if (user === 'Correo ya registrado') throw new Error('Correo ya registrado')
		req.session.user = user._id
        res.send({ status: 'success', payload: user })
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
	try {
		emailValidate(email)
		const user = await Users.getUserByEmail(email)
		if (user === 'Not found') throw new Error (`El usuario con el email ${email} no se encuentra registrado.`)
		if (user.password !== password) throw new Error ('La contraseña proporcionada es incorrecta')
		req.session.user = user._id
		res.send({ status: 'success', payload: user })
	} catch (error) {
		next(error)
	}
})

router.get('/isLogged', async (req, res, next) => {
	try {
		if (!req.session.user) return res.send({status: 'fail'})
		const user = await Users.getUserById(req.session.user)
		res.send({ status: 'success', payload: user})
	} catch (error) {
		next(error)
	}
})

router.post('/logout', (req, res, next) => {
	try {
		req.session.destroy( err => {
			if (err) res.send({ status: 'Logout ERROR', body: err })
		})
		res.send('Logout OK')
	} catch (error) {
		next(error)
	}
})

module.exports = router
