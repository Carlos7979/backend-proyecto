const { Router } = require('express')
const { Users } = require('../../dao/MongoDB')
const router = Router()
const adminUser = {
	_id: '6477f88b7fff754486aaa903',
	first_name: 'Coder',
	last_name: 'House',
	email: 'adminCoder@coder.com',
	date_of_birth: new Date("2023-05-31T00:00:00.000+00:00"),
	cart: {
		_id: "6477f993a6577cddb8e09cf5",
		products: [],
	},
	role: 'admin'

}

router.get('/', async (req, res, next) => {
    try {
		if (req.session.user === '6477f88b7fff754486aaa903') {
			return res.render('profile', { user: adminUser })
		}
		const user = await Users.getUserById(req.session.user)
		res.render('profile', {user})
    } catch (error) {
        next(error)
    }
})

module.exports = router
