"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          setLoading(false)
          return
        }

        // Configure axios to use token in headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        // Fetch user data
        const response = await axios.get("/api/users/me")

        if (response.data) {
          setUser(response.data)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error("Authentication error:", err)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Register user
  const register = async (userData) => {
    setError(null)
    try {
      const response = await axios.post("/api/users/register", userData)

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
        setUser(response.data.user)
        setIsAuthenticated(true)
        return true
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
      return false
    }
  }

  // Login user
  const login = async (email, password) => {
    setError(null)
    try {
      const response = await axios.post("/api/users/login", { email, password })

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
        setUser(response.data.user)
        setIsAuthenticated(true)
        return true
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password")
      return false
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    setIsAuthenticated(false)
  }

  // Update user profile
  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.put("/api/users/profile", updatedData)
      setUser(response.data)
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
      return false
    }
  }

  // Update profile image
  const updateProfileImage = async (formData) => {
    try {
      const response = await axios.post("/api/users/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Update the user state with the new profile image
      setUser({ ...user, profileImage: response.data.profileImage })
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile image")
      return false
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    updateProfileImage,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
