"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Toast from "../components/Toast"
import "../styles/Auth.css"

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: true,
    agreeToTerms: false,
  })

  const [currentSection, setCurrentSection] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  const { register, error } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked })
    } else if (name === "isAgency") {
      setFormData({ ...formData, isAgency: value === "yes" })
    } else {
      setFormData({ ...formData, [name]: value })
    }

    // Check password strength
    if (name === "password") {
      let strength = 0

      if (value.length >= 8) strength += 1
      if (/\d/.test(value)) strength += 1
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 1
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength += 1

      setPasswordStrength(strength)
    }
  }

  const nextSection = () => {
    // Validate current section
    if (currentSection === 1) {
      if (!formData.fullName || !formData.phone) {
        setToast({
          show: true,
          message: "Please fill in all required fields",
          type: "error",
        })
        return
      }
    } else if (currentSection === 2) {
      if (!formData.email || !formData.password) {
        setToast({
          show: true,
          message: "Please fill in all required fields",
          type: "error",
        })
        return
      }
    }

    setCurrentSection(currentSection + 1)
  }

  const prevSection = () => {
    setCurrentSection(currentSection - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      setToast({
        show: true,
        message: "Please agree to the Terms of Service",
        type: "error",
      })
      return
    }

    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      company: formData.company,
      isAgency: formData.isAgency,
    }

    const success = await register(userData)

    if (success) {
      navigate("/profile")
    } else {
      setToast({
        show: true,
        message: error || "Registration failed",
        type: "error",
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="container">
      <div className="card signup-card animate__animated animate__fadeInUp">
        <Link to="/" className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </Link>

        <div className="logo-container">
          <div className="logo">PopX</div>
        </div>

        <h1>
          Create your
          <br />
          PopX account
        </h1>
        <p className="subtitle">Join our community and start your journey.</p>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${currentSection * 33.33}%` }}></div>
          </div>
          <div className="progress-steps">
            <div className={`step ${currentSection >= 1 ? "active" : ""}`}>1</div>
            <div className={`step ${currentSection >= 2 ? "active" : ""}`}>2</div>
            <div className={`step ${currentSection >= 3 ? "active" : ""}`}>3</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`form-section ${currentSection !== 1 ? "hidden" : ""}`}>
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name*
              </label>
              <div className="input-with-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone number*
              </label>
              <div className="input-with-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="button" className="btn btn-primary next-btn" onClick={nextSection}>
              <span>Continue</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <div className={`form-section ${currentSection !== 2 ? "hidden" : ""}`}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address*
              </label>
              <div className="input-with-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path>
                  <polyline points="15,9 18,9 18,11"></polyline>
                  <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path>
                  <line x1="6" y1="10" x2="7" y2="10"></line>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password*
              </label>
              <div className="input-with-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              <div className="password-strength">
                <div className="strength-meter">
                  <div
                    className={`strength-segment ${passwordStrength >= 1 ? (passwordStrength === 1 ? "weak" : passwordStrength <= 3 ? "medium" : "strong") : ""}`}
                  ></div>
                  <div
                    className={`strength-segment ${passwordStrength >= 2 ? (passwordStrength <= 3 ? "medium" : "strong") : ""}`}
                  ></div>
                  <div
                    className={`strength-segment ${passwordStrength >= 3 ? (passwordStrength === 3 ? "medium" : "strong") : ""}`}
                  ></div>
                  <div className={`strength-segment ${passwordStrength >= 4 ? "strong" : ""}`}></div>
                </div>
                <span className="strength-text">
                  {passwordStrength === 0 && "Password strength"}
                  {passwordStrength === 1 && "Weak password"}
                  {passwordStrength === 2 && "Medium password"}
                  {passwordStrength === 3 && "Good password"}
                  {passwordStrength === 4 && "Strong password"}
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline prev-btn" onClick={prevSection}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                <span>Back</span>
              </button>
              <button type="button" className="btn btn-primary next-btn" onClick={nextSection}>
                <span>Continue</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className={`form-section ${currentSection !== 3 ? "hidden" : ""}`}>
            <div className="form-group">
              <label htmlFor="company" className="form-label">
                Company name
              </label>
              <div className="input-with-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-control"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <p className="form-label">Are you an Agency?*</p>
              <div className="radio-group">
                <label className="radio-container">
                  <input type="radio" name="isAgency" value="yes" checked={formData.isAgency} onChange={handleChange} />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                <label className="radio-container">
                  <input type="radio" name="isAgency" value="no" checked={!formData.isAgency} onChange={handleChange} />
                  <span className="radio-custom"></span>
                  No
                </label>
              </div>
            </div>

            <div className="form-group terms-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>I agree to the <Link to="#">Terms of Service</Link> and{" "}
                <Link to="#">Privacy Policy</Link>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline prev-btn" onClick={prevSection}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                <span>Back</span>
              </button>
              <button type="submit" className="btn btn-primary">
                <span>Create Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}
    </div>
  )
}

export default SignUp
