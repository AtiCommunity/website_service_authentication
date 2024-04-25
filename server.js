require("dotenv").config()
const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/accounts", require("./src/routes/account.routes"))

app.listen(process.env.SERVICE_PORT, process.env.SERVICE_URL, () =>
    console.log(`Service started on ${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`)
)