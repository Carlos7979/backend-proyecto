const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.view.router')
const cart = require('./cart.view.router')
const login = require('./login.view.router')
const register = require('./register.view.router')
const profile = require('./profile.view.router')
const home = require('./home.view.router')
const { auth } = require('../../utils/middleware')

// Configurar los routers
router.use('/products', auth, products)
router.use('/carts', auth, cart)
router.use('/login', login)
router.use('/register', register)
router.use('/profile', auth, profile)
router.use('/', home)

module.exports = router