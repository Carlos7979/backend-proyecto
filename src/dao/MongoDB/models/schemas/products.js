const { Schema } = require('mongoose')
const mongoosePaginate = require('mongoose-aggregate-paginate-v2')

const products = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	},
	status: {
		type: Boolean,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	thumbnails: [{
		type: String
	}]
})
products.plugin(mongoosePaginate)

module.exports = products