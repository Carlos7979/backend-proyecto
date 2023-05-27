const { Router } = require('express')
const router = Router()
const { Products } = require('../../dao/MongoDB')

router.post('/', async (req, res, next) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    if (!title || !description || !code || !price || (status === false ? status : !status) || (stock === 0 ? false : !stock) || !category)
        return res.status(400).send({ status: 'error', error: 'Todos los campos son obligatorios' })
    try {
        const product = await Products.addProduct(
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        )
        if (product === 'El valor de code debe ser único')
            return res
                .status(400)
                .send({ status: 'error', error: 'El valor de code debe ser único' })
        res.send({ status: 'success', payload: product })
    } catch (error) {
        next(error)
    }
})

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
		const {docs, ...rest} = paginatedProducts
		const { hasPrevPage, hasNextPage, prevPage, nextPage } = paginatedProducts
		const prevLink = hasPrevPage ? '/api/products' + limitLink + `&page=${prevPage}` + categoryLink + statusLink + sortLink : null
		const nextLink = hasNextPage ? '/api/products' + limitLink + `&page=${nextPage}` + categoryLink + statusLink + sortLink : null
		return res.send({ status: 'success', payload: docs, ...rest, prevLink, nextLink })
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
        return res.send({ status: 'success', payload: product })
    } catch (error) {
        next(error)
    }
})

router.put('/:pid', async (req, res, next) => {
    try {
        let { pid } = req.params
        const product = await Products.updateProduct(pid, req.body)
        if (product === 'Not found') {
            return res
                .status(400)
                .send({ status: 'error', error: `El producto con el id ${pid} no existe` })
        }
        if (product === 'El valor de code debe ser único') {
            return res
                .status(400)
                .send({ status: 'error', error: `El valor de code ya existe para otro producto` })
        }
        return res.send({ status: 'success', payload: product })
    } catch (error) {
        next(error)
    }
})

router.delete('/:pid', async (req, res, next) => {
    try {
        let { pid } = req.params
        const product = await Products.deleteProduct(pid)
        if (product === 'Not found') {
            return res
                .status(400)
                .send({ status: 'error', error: `El producto con el id ${pid} no existe` })
        }
        return res.send({ status: 'success', payload: product })
    } catch (error) {
        next(error)
    }
})

module.exports = router
