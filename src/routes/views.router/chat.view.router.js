const { Router } = require('express')
// const { Messages } = require('../../dao/MongoDB')
const router = Router()

router.get('/', async (req, res, next) => {
    // const messages = await Messages.getMessages()
    try {
        res.render('chat', {})
    } catch (error) {
        next(error)
    }
})

module.exports = router
