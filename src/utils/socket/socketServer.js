const socketServer = io => {
    io.on('connection', socket => {
        console.log(
            'Nuevo cliente conectado → clientId: ' + socket.client.id + ' y socketId: ' + socket.id
        )
    })
}

module.exports = socketServer
