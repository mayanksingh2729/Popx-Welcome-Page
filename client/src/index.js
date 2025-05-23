import React from "react"
import ReactDOM from "react-dom/client"
import axios from "axios"
import App from "./App"
import "./App.css"

// Set base URL for axios
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
