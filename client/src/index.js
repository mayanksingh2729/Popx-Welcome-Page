import React from "react"
import ReactDOM from "react-dom/client"
import axios from "axios"
import App from "./App"
import "./App.css"

// Set base URL for axios
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "https://popx-welcome-page-1.onrender.com"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
