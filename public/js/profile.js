window.addEventListener('load', async function () {
    sessionStorage.removeItem('filters')
	sessionStorage.removeItem('productsUrl')
})

const setCart = async () => {
    let cart = sessionStorage.getItem('cart')
    if (cart) {
        cart = JSON.parse(cart)
        Swal.fire({
            title: `¿Deseas continuar con la sesión de ${cart._id} o crear un nuevo carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#73D216',
            confirmButtonText: 'Crear nuevo',
			cancelButtonText: 'Continuar'
        }).then(async result => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('cart')
            	await postCart(cart)
            }
        })
    } else {
        await postCart(cart)
    }
}

setCart()