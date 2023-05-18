const { Router } = require('express');
const router = Router()
const { Carts, Products } = require('../../dao/MongoDB');

router.post('/', async (req, res, next) => {
	try {
		const cart = await Carts.addCart()
		res.send({ status: "success", payload: cart })
	} catch (error) {
		next(error)
	}
})

router.post('/:cid/product/:pid', async (req, res, next) => {
	const { cid, pid } = req.params
	try {
		const product = await Products.getProductById(pid)
		if (product === 'Not found') return res.status(400).send( {status: "error", error: `El producto con el id ${pid} no existe`} )
		const products = await Carts.addProduct(cid, pid)
		if (products === 'Cart not found') return res.status(400).send( {status: "error", error: `El carrito con el id ${cid} no existe`} )
		res.send({ status: "success", payload: products })
	} catch (error) {
		next(error)
	}
})

router.get('/:cid', async (req, res, next) => {
	const { cid } = req.params
	try {
		const products = await Carts.getProductsByCartId(cid)
		if (products === 'Not found') return res.status(400).send( {status: "error", error: `El carrito con el id ${cid} no existe`} )
		return res.send({ status: "success", payload: products })
	} catch (error) {
		next(error)
	}
})

module.exports = router