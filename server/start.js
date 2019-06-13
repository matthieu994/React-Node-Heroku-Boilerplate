const express = require("express")
const path = require("path")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const isDev = process.env.NODE_ENV !== "production"
const PORT = process.env.PORT || 5000
const app = express()

module.exports = () => {
    // Multi-process to utilize all CPU cores.
    if (!isDev && cluster.isMaster) {
        console.error(`Node cluster master ${process.pid} is running`)

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on("exit", (worker, code, signal) => {
            console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`)
        })
    } else {
        // Priority serve any static files.
        app.use(express.static(path.resolve(__dirname, "../react-ui/build")))

        app.listen(PORT, function() {
            console.error(`Node ${isDev ? "dev server" : "cluster worker " + process.pid}: listening on port ${PORT}`)
        })
    }
    return app
}
