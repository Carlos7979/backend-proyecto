const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const api = require('./api.router')
const views = require('./views.router')

// Configurar los routers
router.use('/api', api)
router.use('/', views)

module.exports = router