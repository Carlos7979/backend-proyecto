const { Schema } = require('mongoose')

const carts = new Schema({
	products: {
		type: [{
            product: { type: Schema.Types.ObjectId, ref: 'Products' },
            quantity: { type: Number, min: 1 }
        }],
		default: []
	}
})

module.exports = carts