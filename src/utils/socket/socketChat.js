const { Messages } = require('../../dao/MongoDB')

// const { Messages } = require("../../dao/MongoDB/models")

const socketChat = io => {
    io.on('connection', async socket => {
		const messages = await Messages.getMessages()
        socket.emit('chat', {
            client: socket.client.id,
            message: 'Client connected',
			messages
        })
        socket.on('user', user => {
            socket.broadcast.emit('user', user)
        })
        socket.on('message', async data => {
            await Messages.addMessage(data)
            io.emit('messages', data)
        })
    })
}

module.exports = socketChat
