const path = require("path")

const start = require("./start")
const app = start()

const api = require("./api")
app.use("/api", api)

app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"))
})
