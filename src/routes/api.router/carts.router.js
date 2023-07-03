const { Router } = require('express')
const router = Router()
const {
    cartController: {
        createCart,
        addProductToCart,
        getOneCart,
        setCartToEmpty,
        removeProductFromCart,
        updateProductFromCart
    }
} = require('../../services')

router.post('/', createCart)

router.post('/:cid/product/:pid', addProductToCart)

router.get('/:cid', getOneCart)

router.delete('/:cid', setCartToEmpty)

router.delete('/:cid/product/:pid', removeProductFromCart)

router.put('/:cid/product/:pid', updateProductFromCart)

module.exports = router
