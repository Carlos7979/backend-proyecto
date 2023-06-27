const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.router')
const carts = require('./carts.router')
const users = require('./users.router')
const sessions = require('./sessions.router')

// Configurar los routers
router.use('/products', products)
router.use('/carts', carts)
router.use('/users', users)
router.use('/sessions', sessions)

module.exports = router
