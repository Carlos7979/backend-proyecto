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
    try {
        const paginatedProducts = await Products.getPaginatedProducts(limit, page, sort, query)
		const {docs, ...rest} = paginatedProducts
		const { hasPrevPage, hasNextPage, prevPage, nextPage } = paginatedProducts
		const prevLink = hasPrevPage ? '/products' + limitLink + `&page=${prevPage}` + categoryLink + statusLink : null
		const nextLink = hasNextPage ? '/products' + limitLink + `&page=${nextPage}` + categoryLink + statusLink : null
        res.render('products', { ...paginatedProducts, prevLink, nextLink })
    } catch (error) {
        next(error)
    }
})

module.exports = router
