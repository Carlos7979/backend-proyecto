const { Router } = require('express')
const { viewController: { productsView, oneProductView } } = require('../../services')
const router = Router()

router.get('/', productsView)

router.get('/:pid', oneProductView)

module.exports = router
