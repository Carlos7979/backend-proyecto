const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const products = require('./products.view.router')
const chat = require('./chat.view.router')

// Configurar los routers
router.use('/products', products)
router.use('/chat', chat)
router.get('/', (req, res, next) => {
    res.render('home', {})
})

module.exports = router