const express = require('express')

const app = express()

const carRouter = require("./routes/carsRoutes")

app.use(express.json())

app.use('/api/v1', carRouter)

module.exports = app