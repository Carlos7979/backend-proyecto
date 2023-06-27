const { Router } = require('express')
const { passportCall } = require('../../utils/middleware')
const router = Router()

router.get('/current', passportCall('jwt') , async (req, res, next) => {
    try {
        res.send({ status: 'success', payload: req.user })
    } catch (error) {
        next(error)
    }
})

module.exports = router
