const { Router } = require('express')
const { viewController: { homeView } } = require('../../services')
const router = Router()

router.get('/', homeView)

module.exports = router
