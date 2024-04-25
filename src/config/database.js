const mongoose = require("mongoose")

const dbClient = async () => {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}`)
        .then(() => console.log(`Database connected on ${process.env.DB_URL}:${process.env.DB_PORT} with ${process.env.DB_USER} credentials.`))
        .catch((err) => {
            console.log(err)
            process.exit()
        })
}

module.exports = dbClient