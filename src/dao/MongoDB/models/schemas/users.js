const { Schema } = require('mongoose')

const users = new Schema({
	first_name: {
		type: String,
        required: true
	},
	last_name: {
		type: String,
        required: true
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
	date_of_birth: {
		type: Date,
        required: true
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		type: Schema.Types.ObjectId, ref: 'Carts'
	},
	role: {
		type: String,
		default: 'user',
		enum: ["admin", "user"]
	}
})

module.exports = users
