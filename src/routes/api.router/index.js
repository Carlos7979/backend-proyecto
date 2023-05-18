const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.router')
const carts = require('./carts.router')

// Configurar los routers
router.use('/products', products)
router.use('/carts', carts)

module.exports = router
