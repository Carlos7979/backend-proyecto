const { Router } = require('express')
const router = Router()
const { Users } = require('../../dao/MongoDB')
const passport = require('passport')
const { jwt } = require('../../utils/controller')
const { emailValidate } = require('../../utils/controller/validate')
const { isValidPassword } = require('../../utils/controller/hash')
const { adminUser } = require('../../config')
const { passportCall } = require('../../utils/middleware')

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
        const token = jwt.generateToken(user._id)
        res.cookie('coderToken', token, {
            maxAge: 1000 * 60 * 60 * 12,
            httpOnly: true
        }).send({ status: 'success', payload: user })
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    try {
        emailValidate(email)
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            const token = jwt.generateToken(adminUser._id)
            return res.send({ status: 'success', payload: { token, user: adminUser } })
        }
        const user = await Users.getUserByEmail(email)
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
})

router.get('/github', passportCall('github'))

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    (req, res, next) => {
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
)

router.post('/logout', (req, res, next) => {
    try {
        res.clearCookie('coderToken').send('Logout OK')
    } catch (error) {
        next(error)
    }
})

module.exports = router
