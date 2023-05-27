const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.view.router')
const home = require('./home.view.router')
const cart = require('./cart.view.router')

// Configurar los routers
router.use('/products', products)
router.use('/carts', cart)
router.use('/', home)

module.exports = router