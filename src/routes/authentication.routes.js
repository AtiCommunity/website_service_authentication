const express = require("express")
const router = express.Router()

const authenticationController = require("../controllers/authentication.controllers")

router.get("/check", (req, res) => {
    res.status(200).json({ message: "API is up!" })
})

module.exports = router