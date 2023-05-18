const fs = require('fs')

class Products {
    constructor(path) {
        this.path = path
    }
    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        try {
            if (!title || !description || !code || !price || !status || !stock || !category)
                return 'Todos los campos son obligatorios'
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            products = JSON.parse(products)
            if (products.some(e => e.code === code)) return 'El valor de code debe ser único'
            if (!thumbnails) thumbnails = []
            const product = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
                id: (products[0].idCounter + 1).toString()
            }
            products.push(product)
            products[0].idCounter += 1
            const productsJSON = JSON.stringify(products, null, 2)
            await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' })
            return product
        } catch (error) {
            console.log(error)
        }
    }
    async getProducts() {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            products = JSON.parse(products)
            products.shift()
            return products
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(id) {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            products = JSON.parse(products)
            const product = products.find(e => e.id === id)
            if (product) return product
            return 'Not found'
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(id, object) {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            products = JSON.parse(products)
            products.shift()
            let index
            const product = products.find((e, i) => {
                if (e.id === id) {
                    index = i
                    return true
                }
            })
            if (!product) return 'Not found'
            for (const key in object) {
                if (Object.hasOwnProperty.call(product, key) && key !== 'id') {
                    if (key !== 'code') product[key] = object[key]
                    else {
                        if (products.some((e, i) => e.code === object[key] && i !== index))
                            return 'El valor de code debe ser único'
                    }
                }
            }
            products[index] = product
            const productsJSON = JSON.stringify(products, null, 2)
            await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' })
            return product
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(id) {
        try {
            let products = await fs.promises.readFile(this.path, { encoding: 'utf8' })
            products = JSON.parse(products)
            let index
            const product = products.find((e, i) => {
                if (e.id === id) {
                    index = i
                    return true
                }
            })
            if (!product) return 'Not found'
            const deleted = products.splice(index, 1)[0]
            const productsJSON = JSON.stringify(products, null, 2)
            await fs.promises.writeFile(this.path, productsJSON, { encoding: 'utf8' })
            return deleted
        } catch (error) {
            console.log(error)
        }
    }
}

const products = new Products('db/products.json')
module.exports = products
