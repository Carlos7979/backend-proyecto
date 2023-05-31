window.addEventListener('load', async function () {
	try {
		const { data } = await axios.get(`/api/users/isLogged`)
		if (data?.status === 'success') {
			sessionStorage.setItem('user', JSON.stringify(data.payload))
			window.location.href = '/profile'
		}
	} catch (error) {
		const { stack, ...rest } = error
		if (rest) console.log(rest)
		else console.log(error)
	}
})
