# PopX - MERN Stack Authentication & Profile Management

PopX is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides user authentication and profile management functionality. Users can sign up, log in, and manage their profiles with features like bio editing and profile image uploads.

![PopX Screenshot](![alt text](image.png))

## Features

- **User Authentication**
  - Sign up with multi-step form
  - Login with validation
  - JWT token-based authentication
  - Password strength meter

- **User Profile Management**
  - Profile image upload and management
  - Bio editing
  - User data persistence

- **Security Features**
  - Password hashing with bcrypt
  - JWT authentication
  - Protected routes
  - Form validation

- **UI/UX**
  - Responsive design
  - Toast notifications
  - Side menu navigation
  - Multi-step form with progress indicator

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API requests
- CSS for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads


## Installation & Setup

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas)
- npm or yarn

### Environment Variables
Create a `.env` file in the server directory with the following variables:
\`\`\`
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
\`\`\`

### Installation Steps

1. Clone the repository
   \`\`\`bash
   git clone
   cd popx
   \`\`\`

2. Install server dependencies
   \`\`\`bash
   cd server
   npm install
   \`\`\`

3. Install client dependencies
   \`\`\`bash
   cd ../client
   npm install
   \`\`\`

4. Run the development server
   \`\`\`bash
   # In the server directory
   npm run dev
   \`\`\`

5. Run the React development server
   \`\`\`bash
   # In the client directory
   npm start
   \`\`\`

6. Open your browser and navigate to `http://localhost:3000`
