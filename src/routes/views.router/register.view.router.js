const { Router } = require('express')
const router = Router()

router.get('/', async (req, res, next) => {
    try {
		res.render('register', {})
    } catch (error) {
        next(error)
    }
})

module.exports = router
