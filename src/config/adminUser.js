const adminUser = {
	// id generated on https://observablehq.com/@hugodf/mongodb-objectid-generator
	_id: '6477f88b7fff754486aaa903',
	first_name: 'Coder',
	last_name: 'House',
	email: 'adminCoder@coder.com',
	date_of_birth: new Date("2023-05-31T00:00:00.000+00:00"),
	cart: {
		_id: "6477f993a6577cddb8e09cf5",
		products: [],
	},
	role: 'admin'

}

module.exports = adminUser