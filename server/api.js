const express = require("express")
const api = express.Router()

// Local middleware for /api endpoint
api.use((req, res, next) => {
    next()
})

api.get("/", (req, res) => {
    res.send({ message: "You are on /api/ !" })
})

api.get("/welcome", (req, res) => {
    res.send({ message: "Welcome ! You are on /api/welcome" })
})

// Handle all other requests on /api
api.get("*", function(req, res) {
    res.status(404).send({ message: `⚠️  Error ! You are on /api${req.url}` })
})

module.exports = api
