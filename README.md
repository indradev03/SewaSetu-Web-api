# SewaSetu

A full-stack web application connecting communities through service and support. Built with modern technologies to provide a seamless user experience.

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email services
- **Google Generative AI (Gemini)** - AI integration
- **Zod** - Schema validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd sewasetu
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sewasetu
SECRET_KEY=your_secret_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM="SewaSetu Support" <sewasetu@gmail.com>

# Gemini Configuration
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

## 🏃 Running the Application

### Start Backend
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📁 Project Structure

```
sewasetu/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── database/     # Database connection
│   │   ├── server.ts     # Express server setup
│   │   └── index.ts      # Application entry point
│   ├── uploads/          # File uploads
│   │   ├── documents/
│   │   ├── donations/
│   │   └── profile/
│   ├── .env              # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── (_auth)/      # Authentication routes
│   │   ├── (_dashboard)/ # Dashboard routes
│   │   ├── assets/       # Static assets
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── public/           # Public assets
│   ├── package.json
│   └── next.config.ts
└── README.md
```

## 🔐 Features

- **User Authentication** - Secure JWT-based authentication
- **File Uploads** - Support for documents, donations, and profile pictures
- **Email Services** - Email notifications via Nodemailer
- **AI Integration** - Google Gemini AI for intelligent features
- **Database** - MongoDB for data persistence
- **Security** - Helmet for security headers, CORS configuration
- **Validation** - Zod schema validation
- **Logging** - Morgan for HTTP request logging

## 🌐 API Endpoints

The backend API runs on port 5000 and provides RESTful endpoints for:
- User authentication and authorization
- File uploads and management
- Email services
- AI-powered features

## 📧 Email Configuration

For email functionality, configure Gmail with App Password:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password from Google Account settings
3. Use the App Password in the `EMAIL_PASS` environment variable

## 🤖 AI Integration

The project uses Google's Generative AI (Gemini) for AI-powered features. Configure your API key in the `.env` file.

## 🛠️ Development Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email accfourth031@gmail.com or open an issue in the repository.
