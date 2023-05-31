const setTotalAmount = async () => {
	const span = document.getElementById('total')
	let cart = sessionStorage.getItem('cart')
    if (cart) {
		cart = JSON.parse(cart)
		const total = cart?.products?.reduce((acc, curr) => acc + curr.quantity*curr.product.price, 0)
		span.innerText = `Monto total ${total ? total : 0}`
    }
}

setTotalAmount()