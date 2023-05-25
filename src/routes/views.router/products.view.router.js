const { Router } = require('express')
const { Products } = require('../../dao/MongoDB')
const router = Router()

router.get('/', async (req, res, next) => {
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
})

router.get('/:pid', async (req, res, next) => {
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
})

module.exports = router
