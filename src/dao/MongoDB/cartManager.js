const { Carts } = require('./models')

class CartManager {
    async addCart() {
        try {
            const cart = await Carts.create({})
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct(cid, pid) {
        try {
            const cart = await Carts.findById(cid).select('-__v').lean()
            if (!cart) return 'Cart not found'
            let productIndex
            const cartProduct = cart.products.find((e, i) => {
                if (e.product.toString() === pid) {
                    productIndex = i
                    return true
                }
            })
            if (cartProduct) {
                ++cart.products[productIndex].quantity
            } else {
                cart.products.push({
                    product: pid,
                    quantity: 1
                })
            }
            await Carts.findByIdAndUpdate(cid, cart)
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    async getProductsByCartId(cid) {
        try {
            const cart = await Carts.findById(cid).select('-__v').lean()
            if (!cart) return 'Not found'
			return cart.products
        } catch (error) {
            console.log(error)
        }
    }
}

const carts = new CartManager()
module.exports = carts
