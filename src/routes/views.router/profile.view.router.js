const { Router } = require('express')
const router = Router()

router.get('/', async (req, res, next) => {
    try {
		res.render('profile', {})
    } catch (error) {
        next(error)
    }
})

module.exports = router
