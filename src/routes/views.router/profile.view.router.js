const { Router } = require('express')
const { Users } = require('../../dao/MongoDB')
const router = Router()

router.get('/', async (req, res, next) => {
    try {
		const user = await Users.getUserById(req.session.user)
		res.render('profile', {user})
    } catch (error) {
        next(error)
    }
})

module.exports = router
