const { Router } = require('express')
const { viewController: { profileView } } = require('../../services')
const router = Router()

router.get('/', profileView)

module.exports = router
