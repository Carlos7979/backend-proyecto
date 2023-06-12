const auth = (req, res, next) => {
    if (!req.session.passport?.user) {
        return res.render('login', {})
    }
    next()
}

module.exports = auth
