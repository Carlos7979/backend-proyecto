const { validate: { emailValidate, idMongodb } } = require('../../utils/controller')
const { Users, Carts } = require('./models')

class UserManager {
    async addUser({ first_name, last_name, email, password, date_of_birth }) {
        try {
            if (!first_name || !last_name || !email || !password || !date_of_birth)
                return 'Todos los campos son obligatorios'
            emailValidate(email)
            const user = await Users.find({ email })
			if (user.length > 0) return 'Correo ya registrado'
            const cart = await Carts.create({})
            if (!cart) return 'Error al crear carrito de compras'
            let newUser = await Users.create({
                first_name,
                last_name,
                email,
                password,
                date_of_birth,
                cart: cart._id
            })
			newUser = await Carts.populate(newUser, { path: 'cart' })
			const { __v, password: passwordNewUser, ...response } = newUser._doc
			return response
        } catch (error) {
            console.log(error)
        }
    }
    async getUsers() {
        try {
            const users = await Users.find().select('-__v -password').lean()
            return users
        } catch (error) {
            console.log(error)
        }
    }
    async getUserById(id) {
        try {
            const user = await Users.findById(id).select('-__v -password').lean()
            if (user) return user
            return 'Not found'
        } catch (error) {
            console.log(error)
        }
    }
    async getUserByEmail(email) {
		try {
			emailValidate(email)
            let user = await Users.findOne({ email })
            if (!user) return 'Not found'
			user = await Carts.populate(user, { path: 'cart' })
			user = await Carts.populate(user, { path: 'cart.products.product' })
			return user
        } catch (error) {
            console.log(error)
        }
	}
}

const users = new UserManager()
module.exports = users
