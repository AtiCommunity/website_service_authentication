const express = require("express")
const router = express.Router()

const accountController = require("../controllers/account.controller")

router.get("/check", (req, res) => {
    res.status(200).json({ message: "API is up!" })
})

module.exports = router