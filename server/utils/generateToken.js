const jwt = require("jsonwebtoken")

// Method to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = generateToken
