const form = document.getElementById('register')
form.addEventListener('submit', async e => {
	e.preventDefault()
	const { first_name, last_name, email, password, date_of_birth } = e.target
	const body = {
		first_name: first_name.value,
		last_name: last_name.value,
		email: email.value,
		password: password.value,
		date_of_birth: date_of_birth.value
	}
	const errorDiv = document.getElementById('register-error')
	const imgDiv = document.getElementById('loading')
	if(errorDiv.innerText) errorDiv.innerText = ''
	try {
		const loading = document.createElement('img')
		loading.setAttribute('src', '/static/css/loading.gif')
		loading.setAttribute('class', 'loading')
		imgDiv.appendChild(loading)
		const response = await axios.post('/api/users', body)
		if (response?.data?.payload?.cart) {
			sessionStorage.setItem('cart', JSON.stringify(response.data.payload.cart)) 
			imgDiv.innerHTML = ''
			// form.reset()
			Swal.fire({
				icon: 'success',
				title: 'Registro realizado con éxito',
				showConfirmButton: false,
				timer: 1500
			}).then(() => {
				window.location.href = '/profile'
			})
		}
		
	} catch (error) {
		console.log(error)
		errorDiv.innerText = error.response.data
		imgDiv.innerHTML = ''
	}
})