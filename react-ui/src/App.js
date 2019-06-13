import React, { Component } from "react"
import Axios from "axios"
import logo from "./logo.svg"
import "./App.css"

export default class App extends Component {
    state = {
        isFetching: true,
        message: null
    }

    componentDidMount() {
        Axios.get("/api/welcome")
            .then(res => {
                this.setState({ isFetching: false, message: res.data.message })
            })
            .catch(err => {
                this.setState({ isFetching: false, message: err.response.data.message })
            })
        // fetch(url)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error(`status ${response.status}`)
        //         }
        //         return response.json()
        //     })
        //     .then(json => {
        //         setMessage(json.message)
        //         setIsFetching(false)
        //     })
        //     .catch(e => {
        //         setMessage(`API call failed: ${e}`)
        //         setIsFetching(false)
        //     })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {process.env.NODE_ENV === "production" ? (
                        <p>This is a production build from create-react-app.</p>
                    ) : (
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                    )}
                    <p>
                        {"« "}
                        <strong>{this.state.isFetching ? "Fetching message from API" : this.state.message}</strong>
                        {" »"}
                    </p>
                </header>
            </div>
        )
    }
}
