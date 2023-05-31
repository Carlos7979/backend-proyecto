window.addEventListener('load', async function () {
    let user = sessionStorage.getItem('user')
    if (user) {
        user = JSON.parse(user)
        const greeting = document.getElementById('greeting')
		console.log(user.role);
        if (greeting) greeting.innerHTML = `Bienvenido(a) ${user.first_name}` + (user.role === 'admin' ? ' (administrador)' : '')
    }
})

const logout = document.getElementById('logout')
logout.addEventListener('click', async function(e) {
	e.preventDefault()
	try {
		const { data } = await axios.post('/api/users/logout')
		if (data === 'Logout OK') {
			sessionStorage.removeItem('filters')
			sessionStorage.removeItem('productsUrl')
			sessionStorage.removeItem('user')
			sessionStorage.removeItem('cart')
			window.location.href = '/login'
		}
	} catch (error) {
		console.log(error)
	}
})
