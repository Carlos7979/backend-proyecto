const { Schema } = require('mongoose')

const messages = new Schema({
    email: {
        type: String,
        required: true,
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
    message: {
        type: String
    }
})

module.exports = messages
