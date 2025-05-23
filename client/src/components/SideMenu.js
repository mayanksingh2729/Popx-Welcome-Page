"use client"

const SideMenu = ({ isOpen, onClose, user, onLogout }) => {
  return (
    <>
      <div className={`menu-overlay ${isOpen ? "active" : ""}`} onClick={onClose}></div>
      <div className={`side-menu ${isOpen ? "active" : ""}`}>
        <div className="side-menu-header">
          <div className="logo">PopX</div>
          <button className="close-menu" onClick={onClose}>
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="side-menu-content">
          <div className="menu-profile">
            <img
              src={user?.profileImage || "https://img.icons8.com/?size=100&id=97613&format=png&color=000000"}
              alt="Profile Picture"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://img.icons8.com/?size=100&id=97613&format=png&color=000000"
              }}
            />
            <div>
              <h3>{user?.name || "User"}</h3>
              <p>{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <ul className="menu-items">
            <li>
              <a href="#">My Profile</a>
            </li>
            <li>
              <a href="#">Account Settings</a>
            </li>
            <li>
              <a href="#">Connections</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Billing & Plans</a>
            </li>
            <li>
              <a href="#">Help & Support</a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onLogout()
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SideMenu
