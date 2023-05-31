const { emailValidate, idMongodb } = require('../../utils/controller/validate')
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
			const { __v, password: passwordNewUser, role, ...response } = newUser._doc
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
            const user = await Users.findById(id).select('-__v -password -role').lean()
            if (user) return user
            return 'Not found'
        } catch (error) {
            console.log(error)
        }
    }
    // async updateProduct(id, object) {
    //     try {
    //         const product = await Products.findById(id)
    //         if (!product) return 'Not found'
    //         if (object.hasOwnProperty('code')) {
    //             const product2 = await Products.find({ code: object['code'] })
    //             if (product2[0]._id.toString() !== id) return 'El valor de code debe ser único'
    //         }
    //         await Products.findByIdAndUpdate(id, object)
    //         return await Products.findById(id).select('-__v').lean()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // async deleteProduct(id) {
    //     try {
    //         const product = await Products.findById(id)
    //         if (!product) return 'Not found'
    //         const deleted = await Products.findByIdAndRemove(id).select('-__v').lean()
    //         return deleted
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

const users = new UserManager()
module.exports = users
