const fs = require('fs')

class Cart {
    constructor(path) {
        this.path = path
        this.carts = []
    }
    async addCart() {
        try {
            let carts = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            carts = JSON.parse(carts)
            const cart = {
                products: [],
                id: (carts.length + 1).toString()
            }
            carts.push(cart)
            const cartsJSON = JSON.stringify(carts, null, 2)
            await fs.promises.writeFile(this.path, cartsJSON, { encoding: 'utf8' })
            return cart
        } catch (error) {
            if (error.message.includes('no such file or directory')) {
                const cart = {
                    products: [],
                    id: (this.carts.length + 1).toString()
                }
                const cartsJSON = JSON.stringify([cart], null, 2)
                await fs.promises.writeFile(this.path, cartsJSON, { encoding: 'utf8' })
                return cart
            } else {
                console.log(error.message)
            }
        }
    }
    async addProduct(cid, product) {
        try {
            let carts = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            carts = JSON.parse(carts)
            let cartIndex
            const cart = carts.find((e, i) => {
                if (e.id === cid) {
                    cartIndex = i
                    return true
                }
            })
            if (!cart) return 'Cart not found'
            let productIndex
            const cartProduct = cart.products.find((e, i) => {
                if (e.product === product.id) {
                    productIndex = i
                    return true
                }
            })
            if (cartProduct) {
                ++cart.products[productIndex].quantity
            } else {
                cart.products.push({
                    product: product.id,
                    quantity: 1
                })
            }
            carts[cartIndex] = cart
            const cartsJSON = JSON.stringify(carts, null, 2)
            await fs.promises.writeFile(this.path, cartsJSON, { encoding: 'utf8' })
            return cart
        } catch (error) {
            if (error.message.includes('no such file or directory')) {
                const cartsJSON = JSON.stringify(this.carts, null, 2)
                await fs.promises.writeFile(this.path, cartsJSON, { encoding: 'utf8' })
                return this.carts
            } else {
                console.log(error)
            }
        }
    }
    async getProductsByCartId(id) {
        try {
            let carts = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            carts = JSON.parse(carts)
            const cart = carts.find(e => e.id === id)
            if (cart) return cart
            else return 'Not found'
        } catch (error) {
            if (error.message.includes('no such file or directory')) {
                const cartsJSON = JSON.stringify(this.carts, null, 2)
                await fs.promises.writeFile(this.path, cartsJSON, { encoding: 'utf8' })
                return this.carts
            } else {
                console.log(error)
            }
        }
    }
}

const carts = new Cart('db/carts.json')
module.exports = carts
