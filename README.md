# GarageFixCare - Professional Mobile Auto Service

A professional full-stack web application for mobile automotive services, inspired by modern service platforms.

## 🚗 Features

### Frontend
- **React + Vite + Tailwind CSS** for modern, fast UI
- **Multi-page application** with Home, About, Services, Pricing, Contact, and Booking pages
- **Responsive design** optimized for mobile, tablet, and desktop
- **SEO-optimized** with proper meta tags and titles
- **Professional design** with smooth animations and micro-interactions
- **React Router** for seamless navigation

### Backend
- **Node.js + Express** REST API
- **Nodemailer integration** for instant email notifications
- **CORS enabled** for cross-origin requests
- **Environment-based configuration** for secure credential management

### Forms
- **Functional contact form** for general inquiries
- **Service booking form** with vehicle and scheduling details
- **Instant email notifications** sent to garagefixcare@gmail.com
- **Success/error feedback** for users

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

**Backend:**
- Node.js with Express
- Nodemailer for email functionality
- CORS middleware
- Environment variables for configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Gmail account with App Password configured

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   
4. Edit `.env` file with your Gmail credentials:
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Gmail App Password Setup
1. Go to [Google Account settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Go to Security > App passwords
4. Generate new app password for "Mail"
5. Use the 16-character password in your `.env` file

## 📦 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Backend (Render/Heroku)
1. Set environment variables in your hosting platform
2. Use start command: `npm start`
3. Ensure PORT environment variable is set

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SEOHelmet.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Pricing.tsx
│   │   ├── Contact.tsx
│   │   └── BookService.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── server/                 # Backend API
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment template
└── README.md               # Project documentation
```

## 🎨 Design Features

- **Professional color scheme** with blue (#1E3A8A) and orange (#EA580C) accents
- **Responsive grid layouts** for all screen sizes
- **Smooth hover animations** and micro-interactions
- **Modern typography** with clear hierarchy
- **Professional automotive imagery** from Pexels
- **Clean form design** with proper validation feedback

## 📧 Email Notifications

All form submissions automatically send formatted emails to `garagefixcare@gmail.com` with:
- Complete form data in organized format
- Timestamp of submission
- Professional HTML formatting
- Relevant subject lines for easy identification

## 🔒 Security Features

- **Environment variables** for sensitive credentials
- **CORS protection** for API endpoints
- **Input validation** on all forms
- **Secure email handling** with proper authentication

## 📱 Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Breakpoints:** Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- **Touch-friendly interactions** for mobile devices
- **Optimized layouts** for each screen size

## 🎯 Production Ready

- **Clean, modular code architecture** with separation of concerns
- **Error handling** for all API requests
- **Loading states** and user feedback
- **SEO optimization** with proper meta tags
- **Performance optimized** with Vite's build system
- **TypeScript** for type safety and better development experience
