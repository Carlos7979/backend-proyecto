window.addEventListener('load', async function () {
	let user = sessionStorage.getItem('user')
	try {
		if (user) {
			user = JSON.parse(user)
			const { data } = await axios.get('/api/sessions/current')
			if (data?.status === 'success') {
				window.location.href = '/profile'
				return
			}
		}
	} catch (error) {
		const { stack, ...rest } = error
		if (rest) console.log(rest)
		else console.log(error)
	}
})
