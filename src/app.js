const express = require('express')
const app = express()
const routes = require('./routes')

// express
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use('/api', routes)


module.exports = app