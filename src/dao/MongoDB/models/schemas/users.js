const { Schema } = require('mongoose')

const users = new Schema({
	fisrt_name: {
		type: String
	},
	last_name: {
		type: String
	},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if (!re.test(value)) {
                    return false
                }
                return true
            }
        }
    },
	gender: {
		type: String
	}
})

module.exports = users
