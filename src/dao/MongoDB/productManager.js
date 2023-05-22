const { Products } = require('./models')

class ProductManager {
    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        try {
            if (!title || !description || !code || !price || (status === false ? status : !status) || (stock === 0 ? false : !stock) || !category)
                return 'Todos los campos son obligatorios'
            const productByCode = await Products.find({ code }).select('-__v').lean()
            if (productByCode.length > 0) return 'El valor de code debe ser único'
            const product = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            }
            return await Products.create(product)
        } catch (error) {
            console.log(error)
        }
    }
    async getProducts() {
        try {
            const products = await Products.find().select('-__v').lean()
            return products
        } catch (error) {
            console.log(error)
        }
    }
    async getPaginatedProducts(limit, page, sort, query) {
		const aggregations = []
		if (Object.keys(query).length > 0) aggregations.push({ $match: query })
		if (sort === 'asc') aggregations.push({ $sort: { price: 1 } })
		if (sort === 'desc') aggregations.push({ $sort: { price: -1 } })
        try {
			let products = Products.aggregate(aggregations)
            products = await Products.aggregatePaginate(products, { limit, page, lean: true })
            return products
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(id) {
        try {
            const product = await Products.findById(id).select('-__v').lean()
            if (product) return product
            return 'Not found'
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(id, object) {
        try {
            const product = await Products.findById(id)
            if (!product) return 'Not found'
            if (object.hasOwnProperty('code')) {
                const product2 = await Products.find({ code: object['code'] })
                if (product2.length > 0 && product2[0]._id.toString() !== id)
                    return 'El valor de code debe ser único'
            }
            await Products.findByIdAndUpdate(id, object)
            return await Products.findById(id).select('-__v').lean()
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(id) {
        try {
            const product = await Products.findById(id)
            if (!product) return 'Not found'
            const deleted = await Products.findByIdAndRemove(id).select('-__v').lean()
            return deleted
        } catch (error) {
            console.log(error)
        }
    }
}

const products = new ProductManager()
module.exports = products
