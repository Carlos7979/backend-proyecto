require('dotenv').config()
const { connect } = require('mongoose')
const app = require('./src/app.js')
const { Server } = require('socket.io')
const socketServer = require('./src/utils/socket/socketServer.js')
const socketChat = require('./src/utils/socket/socketChat.js')

const {
    env: { PORT, MONGO_URL: url },
    argv: [, , port = PORT || 8080]
} = process

;(async () => {
    await connect(url, { useNewUrlParser: true })
    const httpServer = app.listen(port, () => {
        console.log(`PI-1 app listening on port ${port}`)
    })
    const io = new Server(httpServer)
    socketServer(io)
    socketChat(io)
})()
