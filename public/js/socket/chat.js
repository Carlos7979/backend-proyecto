const socket = io()
let user
const chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', e => {
    const value = e.target.value.trim()
    if (e.key === 'Enter') {
        if (user && value) {
            socket.emit('message', { email: user, message: value })
            chatBox.value = ''
        }
    }
})

Swal.fire({
    title: 'Identifícate',
    text: 'Introduce tu correo',
    input: 'text',
    inputValidator: value => {
        if (!value) return 'Es obligatorio identificarte'
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!re.test(value)) {
            return 'Debes introducir un correo electrónico'
        }
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    socket.emit('user', user)
})

socket.on('chat', data => {
    console.log(data.message)
	const messages = data.messages
    if (messages.length > 0) {
		const ul = document.getElementById('messages')
		for (const data of messages) {
			const li = document.createElement('li')
			const nickname = data.email.split('@')[0]
			li.innerHTML = `<strong>${nickname}</strong>: ${data.message}`
			ul.appendChild(li)
		}
	} 
})

socket.on('user', newUser => {
    if (!newUser || !user) return
    Swal.fire({
        title: newUser,
        text: 'se ha conectado',
        toast: true,
        position: 'top-right',
        timer: 3000,
        icon: 'success',
        showConfirmButton: false
    })
})

socket.on('messages', data => {
    const ul = document.getElementById('messages')
    const li = document.createElement('li')
    const nickname = data.email.split('@')[0]
    li.innerHTML = `<strong>${nickname}</strong>: ${data.message}`
    ul.appendChild(li)
})
