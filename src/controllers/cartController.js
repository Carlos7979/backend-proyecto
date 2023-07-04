const { cartManager, productManager } = require("../dao/MongoDB")

class CartController {
	createCart = async (req, res, next) => {
		try {
			const cart = await cartManager.addCart()
			res.send({ status: 'success', payload: cart })
		} catch (error) {
			next(error)
		}
	}

	addProductToCart = async (req, res, next) => {
		const { cid, pid } = req.params
		try {
			const product = await productManager.getProductById(pid)
			if (product === 'Not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El producto con el id ${pid} no existe` })
			const products = await cartManager.addProduct(cid, pid)
			if (products === 'Cart not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El carrito con el id ${cid} no existe` })
			res.send({ status: 'success', payload: products })
		} catch (error) {
			next(error)
		}
	}

	getOneCart = async (req, res, next) => {
		const { cid } = req.params
		try {
			const products = await cartManager.getProductsByCartId(cid)
			if (products === 'Not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El carrito con el id ${cid} no existe` })
			return res.send({ status: 'success', payload: products })
		} catch (error) {
			next(error)
		}
	}

	setCartToEmpty = async (req, res, next) => {
		const { cid } = req.params
		try {
			const products = await cartManager.deleteProducts(cid)
			if (products === 'Not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El carrito con el id ${cid} no existe` })
			if (products === 'Products empty')
				return res
					.status(400)
					.send({
						status: 'error',
						error: `El carrito con el id ${cid} ya se encuentra vacío`
					})
			return res.send({ status: 'success', payload: products })
		} catch (error) {
			next(error)
		}
	}

	removeProductFromCart = async (req, res, next) => {
		const { cid, pid } = req.params
		try {
			const product = await productManager.getProductById(pid)
			if (product === 'Not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El producto con el id ${pid} no existe` })
			const products = await cartManager.deleteProduct(cid, pid)
			if (products === 'Cart not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El carrito con el id ${cid} no existe` })
			if (products === 'Product empty')
				return res
					.status(400)
					.send({
						status: 'error',
						error: `El producto con el id ${pid} no se encuentra en el carrito`
					})
			res.send({ status: 'success', payload: products })
		} catch (error) {
			next(error)
		}
	}

	updateProductFromCart = async (req, res, next) => {
		const { cid, pid } = req.params
		const { quantity } = req.body
		try {
			const product = await productManager.getProductById(pid)
			if (product === 'Not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El producto con el id ${pid} no existe` })
			const products = await cartManager.updateProduct(cid, pid, quantity)
			if (products === 'Cart not found')
				return res
					.status(400)
					.send({ status: 'error', error: `El carrito con el id ${cid} no existe` })
			if (products === 'Product empty')
				return res
					.status(400)
					.send({
						status: 'error',
						error: `El producto con el id ${pid} no se encuentra en el carrito`
					})
			res.send({ status: 'success', payload: products })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = CartController