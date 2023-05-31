const auth = (req, res, next) => {
	if (!req.session.user) {
		return res.render('login', {})
	}
	next()
}

module.exports = auth;