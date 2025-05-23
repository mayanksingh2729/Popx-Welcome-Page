"use client"

import { useState, useRef } from "react"
import { useAuth } from "../context/AuthContext"
import Toast from "../components/Toast"
import SideMenu from "../components/SideMenu"

const Profile = () => {
  const { user, logout, updateProfile, updateProfileImage } = useAuth()
  const [bio, setBio] = useState(user?.bio || "")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef(null)

  const handleLogout = () => {
    logout()
  }

  const handleSaveChanges = async () => {
    const success = await updateProfile({ bio })

    if (success) {
      setToast({
        show: true,
        message: "Profile updated successfully!",
        type: "success",
      })
    } else {
      setToast({
        show: true,
        message: "Failed to update profile",
        type: "error",
      })
    }
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]

    if (!file) return

    // Check file type
    if (!file.type.match("image.*")) {
      setToast({
        show: true,
        message: "Please select an image file",
        type: "error",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setToast({
        show: true,
        message: "Image size should be less than 5MB",
        type: "error",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("profileImage", file)

      const success = await updateProfileImage(formData)

      if (success) {
        setToast({
          show: true,
          message: "Profile image updated successfully!",
          type: "success",
        })
      } else {
        setToast({
          show: true,
          message: "Failed to update profile image",
          type: "error",
        })
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setToast({
        show: true,
        message: "Error uploading image",
        type: "error",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h2>Account Settings</h2>
          <div className="header-actions">
            <button className="icon-button" id="notifications-btn">
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
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="notification-badge">3</span>
            </button>
            <button className="icon-button" onClick={() => setIsMenuOpen(true)}>
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
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="app-content">
        <div className="profile-card animate__animated animate__fadeIn">
          <div className="profile-section">
            <div className="profile-image-container">
              {isUploading ? (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                </div>
              ) : (
                <img
                  id="profile-image"
                  src={user?.profileImage || "https://img.icons8.com/?size=100&id=97613&format=png&color=000000"}
                  alt="Profile Picture"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://img.icons8.com/?size=100&id=97613&format=png&color=000000"
                  }}
                />
              )}
              <div className="image-upload-overlay" onClick={handleImageClick}>
                <div className="image-upload-icon">
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
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              </div>
              <input
                type="file"
                id="image-upload"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="profile-info">
              <h3 id="user-name">{user?.name || "User"}</h3>
              <p id="user-email">{user?.email || "user@example.com"}</p>
            </div>
          </div>

          <div className="bio-section">
            <h4>About Me</h4>
            <textarea
              id="user-bio"
              placeholder="Write your bio here..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>

            <button id="save-profile" className="btn btn-primary" onClick={handleSaveChanges}>
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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              <span>Save Changes</span>
            </button>
            <button id="logout-btn" className="btn btn-outline" style={{ marginTop: "15px" }} onClick={handleLogout}>
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </main>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} user={user} onLogout={handleLogout} />

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}
    </div>
  )
}

export default Profile
