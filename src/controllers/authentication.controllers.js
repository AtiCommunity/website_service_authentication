const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/authentication.models")

exports.authenticate = async (req, res) => {
    try {
        if (!req.headers["authorization"]) {
            return res.status(401).json({ message: "Authorization header is missing!" })
        }
        token = req.headers["authorization"].substring(7)
        jwt.verify(token, process.env.ACCESS_JWT_KEY, async (err, decoded) => {
            if (err == null) {
                return res.status(200).json({ message: "User authenticated !" })
            }
            return res.status(401).json({ err: err })
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "email or password not defined" })
        }
        const existingUser = await User.find({ email: req.body.email })
        if (JSON.stringify(existingUser) === JSON.stringify([])) {
            return res.status(404).json({ message: "User not found" })
        }
        if (bcrypt.compareSync(req.body.password, existingUser[0].password)) {
            const accessToken = jwt.sign({ type: existingUser[0]._id, exp: Math.floor(Date.now() / 1000) + 86400 }, process.env.ACCESS_JWT_KEY);
            return res.status(200).json({ message: "You are now connected!", token: accessToken })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.create = async (req, res) => {
    try {
        const newUser = new User({
            type: req.body.type,
            firstname: req.body.firstname,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        })
        await newUser.save()
        return res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        if (error.message === "data and salt arguments required") {
            return res.status(400).json({ password: "Password is a required field" })
        }
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json(errors);
        }
        if (error.name === "MongoServerError") {
            return res.status(400).json({ message: error.message });

        }
        return res.status(500).json({ message: error.message });
    }
}

exports.read = async (req, res) => {
    try {
        if (req.params.id) {
            return res.status(200).json(await User.find({ _id: req.params.id }))
        }
        return res.status(200).json(await User.find())
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.update = async (req, res) => {
    try {
        if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10)
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body)
        if (updatedUser != null) {
            return res.status(200).json({ message: `User ${req.params.id} updated!` })
        }
        return res.status(404).json({ message: `User ${req.params.id} not found!` })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.id })
        if (deletedUser.deletedCount != 0) {
            return res.status(200).json({ message: `User ${req.params.id} deleted!` })
        }
        return res.status(404).json({ message: `User ${req.params.id} not found!` })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}