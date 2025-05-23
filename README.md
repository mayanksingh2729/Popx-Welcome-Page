# PopX - MERN Stack Authentication & Profile Management

PopX is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides user authentication and profile management functionality. Users can sign up, log in, and manage their profiles with features like bio editing and profile image uploads.

![PopX Screenshot](https://via.placeholder.com/800x400?text=PopX+Screenshot)

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

## Project Structure

\`\`\`
popx/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   └── src/
│       ├── components/     # Reusable components
│       ├── context/        # Context API
│       ├── pages/          # Page components
│       └── styles/         # CSS styles
│
├── server/                 # Node.js backend
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files
│   └── utils/              # Utility functions
│
└── vercel.json             # Vercel deployment config
\`\`\`

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
   git clone https://github.com/yourusername/popx.git
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

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user
- `POST /api/auth/validate-token` - Validate JWT token

### User Management
- `POST /api/users/register` - Register new user
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/profile/image` - Upload profile image

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Log in to your Vercel account
3. Click "New Project" and import your GitHub repository
4. Set up the environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT signing
5. Click "Deploy"

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Set up database access (create a user and password)
4. Get your connection string and add it to your environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
\`\`\`

Let's also create a simple `.gitignore` file:

```text file=".gitignore"
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/client/build

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Uploaded files
/server/uploads/*
!/server/uploads/.gitkeep
