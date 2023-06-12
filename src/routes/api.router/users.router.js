const { Router } = require('express')
const router = Router()
const { Users } = require('../../dao/MongoDB')
const passport = require('passport')

router.post('/', passport.authenticate('register', { failureRedirect: '/api/users/failregister' }), (req, res) => {
	res.send({ status: 'success', payload: req.user })
})

router.get('failregister', async (req, res) => {
	console.log('Failed Strategy')
	res.send({ error: 'Failed' })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
	if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
	res.send({ status: 'success', payload: req.user })
})

router.get('faillogin', async (req, res) => {
	console.log('Failed login strategy')
	res.send({ error: 'Failed login' })
})

router.get('/isLogged', async (req, res, next) => {
    try {
		if (!req.session.passport?.user) return res.send({ status: 'fail' })
		if (req.session.passport?.user === '6477f88b7fff754486aaa903') {
			res.send({ status: 'success', payload: adminUser })
		}
        const user = await Users.getUserById(req.session.passport?.user)
        res.send({ status: 'success', payload: user })
    } catch (error) {
        next(error)
    }
})

router.post('/logout', (req, res, next) => {
    try {
        req.session.destroy(err => {
            if (err) res.send({ status: 'Logout ERROR', body: err })
        })
        res.send('Logout OK')
    } catch (error) {
        next(error)
    }
})

module.exports = router
