// const { default: mongoose } = require('mongoose')
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
            const response = await Carts.findByIdAndUpdate(cid, cart, { new: true })
                .populate('products.product')
                .select('-__v')
                .lean()
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProducts(cid) {
        try {
            const cart = await Carts.findById(cid).select('-__v').lean()
            if (!cart) return 'Not found'
            if (cart.products.length > 0) {
                cart.products = []
            } else {
                return 'Products empty'
            }
            const response = await Carts.findByIdAndUpdate(cid, cart, { new: true })
                .populate('products.product')
                .select('-__v')
                .lean()
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(cid, pid) {
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
            if (cartProduct && cart.products[productIndex].quantity > 1) {
                --cart.products[productIndex].quantity
            } else if (cartProduct && cart.products[productIndex].quantity === 1) {
                cart.products.splice(productIndex, 1)
            } else {
                return 'Product empty'
            }
            const response = await Carts.findByIdAndUpdate(cid, cart, { new: true })
                .populate('products.product')
                .select('-__v')
                .lean()
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(cid, pid, quantity) {
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
                cart.products[productIndex].quantity = quantity
            } else {
                return 'Product empty'
            }
            const response = await Carts.findByIdAndUpdate(cid, cart, { new: true })
                .populate('products.product')
                .select('-__v')
                .lean()
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async getProductsByCartId(cid) {
        try {
            const cart = await Carts.findById(cid)
                .select('-__v')
                .lean()
                .populate('products.product')
            if (!cart) return 'Cart not found'
            // const cart = await Carts.aggregate([
            // 	{
            // 		$match: { _id: new mongoose.Types.ObjectId(cid) }
            // 	},
            // 	{
            // 		$project: {_id: 0, totalQuantity: { $sum: '$products.quantity' }, products: '$products' }
            // 	}
            // ])
            // if (cart.length === 0) return 'Not found'
            // const products = await Carts.populate(cart, { path: 'products.product' })
            // return products
            return cart
        } catch (error) {
            console.log(error)
        }
    }
}

const carts = new CartManager()
module.exports = carts
