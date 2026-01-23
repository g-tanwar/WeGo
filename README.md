# WeGo - The Virtual City 🏙️

WeGo is a community-driven platform for students and learners to connect, solve doubts, and grow together in a virtual city environment.

## ✨ Features

- **🌆 Districts**: Explore specialized rooms (Tech, Arts, etc.) for real-time discussions.
- **🙋 Doubt Board**: Ask questions, upvote helpful solutions, and get notified when someone answers.
- **👥 Study Groups**: Create or join tribes for collaborative learning with deep-linked chat history.
- **🔔 Notifications**: Real-time alerts for answers, upvotes, and new group members.
- **👤 User Profiles**: Show off your skills, track your contributions, and follow other citizens.
- **📱 Responsive Design**: A premium, dark-themed interface that works seamlessly on mobile and desktop.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion, Lucide Icons, Axios.
- **Backend**: Node.js, Express, Socket.io, JWT Authentication.
- **Database**: MongoDB (Mongoose).

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/wego
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

### Backend
- `/src/models`: Mongoose schemas for Users, Doubts, Groups, Messages, and Notifications.
- `/src/routes`: API endpoints with JWT protection.
- `/src/utils`: Helper functions for notifications and more.
- `Server.js`: Main entry point with Socket.io integration.

### Frontend
- `/src/app`: Next.js App Router for dashboard, auth, and city views.
- `/src/components`: Reusable UI components including a unified Navbar and Notification system.
- `/src/lib`: API configuration and shared utilities.

---

Built with ❤️ by the WeGo Team.
