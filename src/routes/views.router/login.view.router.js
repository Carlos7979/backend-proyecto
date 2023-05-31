const { Router } = require('express')
const router = Router()

router.get('/', async (req, res, next) => {
    try {
		res.render('login', {})
    } catch (error) {
        next(error)
    }
})

module.exports = router
