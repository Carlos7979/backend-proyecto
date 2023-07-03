const {
    ProductController,
    UserController,
    CartController,
    ViewController
} = require('../controllers')

const userController = new UserController()
const productController = new ProductController()
const cartController = new CartController()
const viewController = new ViewController()

module.exports = {
    userController,
    productController,
    cartController,
    viewController
}
