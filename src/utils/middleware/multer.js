const multer = require('multer')
const { resolve } = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, resolve(__dirname, '..', '..', '..', 'public/uploads'))
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`)
	}
})

const uploader = multer({
	storage,
	onError: (err, next) => {
		next(err)
	}
})

module.exports = uploader
