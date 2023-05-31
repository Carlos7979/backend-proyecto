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
        res.send({ status: 'success', payload: user })
    } catch (error) {
        next(error)
    }
})

module.exports = router
