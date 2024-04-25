const express = require("express")
const router = express.Router()

const authenticationController = require("../controllers/authentication.controllers")

router.get("/check", (req, res) => {
    res.status(200).json({ message: "API is up!" })
})

router.get("/authenticate", authenticationController.authenticate)
router.post("/login", authenticationController.login)

router.post("/create", authenticationController.create)
router.get("/read", authenticationController.read)
router.get("/read/:id", authenticationController.read)
router.patch("/update/:id", authenticationController.update)
router.delete("/delete/:id", authenticationController.delete)

module.exports = router