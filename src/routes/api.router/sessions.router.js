const { Router } = require('express')
const { passportCall } = require('../../middleware')
const { userController: { getUser } } = require('../../services')
const router = Router()

router.get('/current', passportCall('jwt') , getUser)

module.exports = router
