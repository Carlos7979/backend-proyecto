const { Router } = require('express')
const { Carts } = require('../../dao/MongoDB')
const router = Router()

router.get('/:cid', async (req, res, next) => {
	const { cid } = req.params
    try {
		const cart = await Carts.getProductsByCartId(cid)
		if (cart === 'Cart not found') res.render('not-found', { error: {message: `El carrito con el id ${cid}, no existe`} })
		res.render('cart', { cart })
		console.log(cart.products);
    } catch (error) {
        next(error)
    }
})

module.exports = router
