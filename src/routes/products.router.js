const { Router } = require('express');
const router = Router();
const { Product } = require('../../data');

router.post('/', async (req, res) => {
        const { 
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnails
		} = req.body
		if (!title || !description|| !code || !price || !status || !stock || !category)
                return res.status(400).send( {status: "error", error: "Todos los campos son obligatorios"} )
        try {
			const products = await Product.getProducts()
			if (products.some(e => e.code === code)) return res.status(400).send( {status: "error", error: "El valor de code debe ser único"} )
            const product = await Product.addProduct(
				title,
				description,
				code,
				price,
				status,
				stock,
				category,
				thumbnails
			)
            res.send({ status: "success", payload: product })
        } catch (error) {
            console.log(error)
        }
    }
);

router.get('/', async (req, res) => {
	let { limit } = req.query
	limit = Number(limit)
	try {
		const products = await Product.getProducts()
		if (limit && (typeof limit === 'number') && (limit > 0)) {
			return res.send(products.slice(0, limit))
		}
		return res.send({ status: "success", payload: products })
	} catch (error) {
		console.log(error)
	}
})

router.get('/:pid', async (req, res) => {
	try {
		let { pid } = req.params
		const product = await Product.getProductById(pid)
		if (product) {
			return res.send({ status: "success", payload: product })
		}
		return res.status(400).send( {status: "error", error: `El producto con el id ${id} no existe`} )
	} catch (error) {
		console.log(error)
	}
})

module.exports = router;
