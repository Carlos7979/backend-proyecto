const { Router } = require('express')
const { viewController: { loginView } } = require('../../services')
const router = Router()

router.get('/', loginView)

module.exports = router
