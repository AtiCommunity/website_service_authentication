require("dotenv").config()
const dbClient = require("./src/config/database")
const express = require("express")

async function main() {
    await dbClient()
    const app = express()
    const cors = require("cors")

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use("/authentication", require("./src/routes/authentication.routes"))

    app.listen(process.env.SERVICE_PORT, process.env.SERVICE_URL, () =>
        console.log(`Service started on ${process.env.SERVICE_URL}:${process.env.SERVICE_PORT}`)
    )
}

main()