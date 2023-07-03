const { Router } = require('express')
const { viewController: { cartView } } = require('../../services')
const router = Router()

router.get('/:cid', cartView)

module.exports = router
