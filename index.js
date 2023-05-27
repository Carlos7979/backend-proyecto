require('dotenv').config()
const { connect } = require('mongoose')
const app = require('./src/app.js')

const {
    env: { PORT, MONGO_URL: url },
    argv: [, , port = PORT || 8080]
} = process

;(async () => {
    await connect(url, { useNewUrlParser: true })
    app.listen(port, () => {
        console.log(`Backend app listening on port ${port}`)
    })
})()
