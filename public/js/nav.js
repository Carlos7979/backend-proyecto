window.addEventListener('load', async function () {
    let user = sessionStorage.getItem('user')
    try {
        if (user) {
            user = JSON.parse(user)
        } else if (!user) {
            const { data } = await axios.get('/api/sessions/current')
            if (data?.status === 'success') {
                user = data.payload
                sessionStorage.setItem('cart', JSON.stringify(user.cart))
                sessionStorage.setItem('user', JSON.stringify(user))
            }
        }
        const greeting = document.getElementById('greeting')
        if (greeting)
            greeting.innerHTML =
                `Bienvenido(a) ${user.first_name}` +
                (user.role === 'admin' ? ' (administrador)' : ' (usuario)')
    } catch (error) {
        console.log(error)
    }
})

const logout = document.getElementById('logout')
logout.addEventListener('click', async function (e) {
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
