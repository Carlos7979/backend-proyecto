const { Router } = require('express')
const router = Router()
const passport = require('passport')
const { passportCall } = require('../../middleware')
const {
    userController: { createUser, loginUser, githubCallback, logoutUser }
} = require('../../services')

router.post('/', createUser)

router.post('/login', loginUser)

router.get('/github', passportCall('github'))

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    githubCallback
)

router.post('/logout', logoutUser)

module.exports = router
