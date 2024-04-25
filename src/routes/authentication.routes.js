const express = require("express")
const router = express.Router()

const authenticationController = require("../controllers/authentication.controller")

router.get("/check", (req, res) => {
    res.status(200).json({ message: "API is up!" })
})

module.exports = router