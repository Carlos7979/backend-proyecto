const form = document.getElementById('login')
form.addEventListener('submit', async e => {
    e.preventDefault()
    const { email, password } = e.target
    const body = {
        email: email.value,
        password: password.value
    }
    const errorDiv = document.getElementById('login-error')
    const imgDiv = document.getElementById('loading')
    if (errorDiv.innerText) errorDiv.innerText = ''
    try {
        const loading = document.createElement('img')
        loading.setAttribute('src', '/static/css/loading.gif')
        loading.setAttribute('class', 'loading')
        imgDiv.appendChild(loading)
        const response = await axios.post('/api/users/login', body)
        if (response?.data?.status === 'success') {
            imgDiv.innerHTML = ''
            sessionStorage.setItem('cart', JSON.stringify(response.data.payload.cart))
            sessionStorage.setItem('user', JSON.stringify(response.data.payload))
            // form.reset()
            Swal.fire({
                icon: 'success',
                title: 'Acceso realizado con éxito',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/products'
            })
        }
    } catch (error) {
        console.log(error)
        errorDiv.innerText = error.response.data
        imgDiv.innerHTML = ''
    }
})

window.addEventListener('load', async function () {
    if (window.location.pathname !== '/login') window.location.href = '/login'
})
