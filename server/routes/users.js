const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const User = require("../models/User")
const auth = require("../middleware/auth")

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/profile")

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, "profile-" + uniqueSuffix + ext)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    if (mimetype && extname) {
      return cb(null, true)
    }

    cb(new Error("Only image files are allowed!"))
  },
})

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, company, isAgency } = req.body

    // Check if user already exists
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
      company,
      isAgency,
      profileImage: "https://img.icons8.com/?size=100&id=97613&format=png&color=000000",
    })

    await user.save()

    // Generate JWT token
    const token = user.generateAuthToken()

    // Return user data and token
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        isAgency: user.isAgency,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = user.generateAuthToken()

    // Return user data and token
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        isAgency: user.isAgency,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   GET /api/users/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, async (req, res) => {
  try {
    const { bio } = req.body

    // Find and update user
    const user = await User.findByIdAndUpdate(req.user.id, { bio }, { new: true }).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST /api/users/profile/image
// @desc    Upload profile image
// @access  Private
router.post("/profile/image", auth, upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    console.log("File uploaded:", req.file) // Debug log

    // Create the correct URL path for the uploaded image
    // The file is saved in server/uploads/profile/filename.jpg
    // But we serve it from /uploads/profile/filename.jpg
    const profileImage = `/uploads/profile/${req.file.filename}`

    console.log("Profile image URL:", profileImage) // Debug log

    // Find and update user
    const user = await User.findByIdAndUpdate(req.user.id, { profileImage }, { new: true }).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    console.log("Updated user:", user) // Debug log

    res.json({
      profileImage: user.profileImage,
      user,
    })
  } catch (err) {
    console.error("Error uploading image:", err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
