const { Router } = require('express')
const router = Router()
const {
    productController: { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct }
} = require('../../services')

router.post('/', createProduct)

router.get('/', getProducts)

router.get('/:pid', getOneProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct)

module.exports = router
