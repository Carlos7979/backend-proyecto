const { Router } = require('express')
const { viewController: { registerView } } = require('../../services')
const router = Router()

router.get('/', registerView)

module.exports = router
