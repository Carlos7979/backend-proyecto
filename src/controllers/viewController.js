const { Carts, Products } = require('../dao/MongoDB')

class ViewController {
    cartView = async (req, res, next) => {
        const { cid } = req.params
        try {
            const cart = await Carts.getProductsByCartId(cid)
            if (cart === 'Cart not found')
                res.render('not-found', {
                    error: { message: `El carrito con el id ${cid}, no existe` }
                })
            res.render('cart', { cart })
        } catch (error) {
            next(error)
        }
    }

    homeView = (req, res, next) => {
        res.render('home', {})
    }

    loginView = async (req, res, next) => {
        try {
            res.render('login', {})
        } catch (error) {
            next(error)
        }
    }

	productsView = async (req, res, next) => {
		let { limit, page, sort, category, status } = req.query
		if (limit) limit = Number(limit)
		else limit = 10
		const limitLink = `?limit=${limit}`
		if (page) Number(page)
		else page = 1
		const query = {}
		let categoryLink = ''
		if (category) {
			query.category = category
			categoryLink += `&category=${category}`
		}
		if (status === 'true') query.status = true
		if (status === 'false') query.status = false
		let statusLink = ''
		if (status) {
			statusLink += `&status=${status}`
		}
		let sortLink = ''
		if (sort) {
			sortLink += `&sort=${sort}`
		}
		try {
			const paginatedProducts = await Products.getPaginatedProducts(limit, page, sort, query)
			const { hasPrevPage, hasNextPage, prevPage, nextPage } = paginatedProducts
			const prevLink = hasPrevPage ? '/products' + limitLink + `&page=${prevPage}` + categoryLink + statusLink + sortLink : null
			const nextLink = hasNextPage ? '/products' + limitLink + `&page=${nextPage}` + categoryLink + statusLink + sortLink : null
			res.render('products', { ...paginatedProducts, prevLink, nextLink })
		} catch (error) {
			next(error)
		}
	}

	oneProductView = async (req, res, next) => {
		try {
			let { pid } = req.params
			const product = await Products.getProductById(pid)
			if (product === 'Not found') {
				return res
					.status(400)
					.send({ status: 'error', error: `El producto con el id ${pid} no existe` })
			}
			return res.render('product', { product })
		} catch (error) {
			next(error)
		}
	}

	profileView = async (req, res, next) => {
		try {
			res.render('profile', {})
		} catch (error) {
			next(error)
		}
	}

	registerView = async (req, res, next) => {
		try {
			res.render('register', {})
		} catch (error) {
			next(error)
		}
	}
}

module.exports = ViewController
