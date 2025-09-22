# LMS Portal (Learning Management System)

A modern **Learning Management System (LMS)** built with **React, Node.js, Express, and MongoDB**, allowing students to browse, search, and enroll in courses, and instructors to manage course content.

---
## 🚀 Deployment

- **Frontend (Render):** [fontend](https://learning-management-system-0013.onrender.com)
- **Backend (Render):** [backend](https://trendbazar.onrender.com)

---

## 🚀 Features

### Student Features
- Browse all available courses
- Search courses by title
- View course details (modules & lessons)
- Enroll in courses (after login)
- Responsive UI for desktop and mobile

### Instructor Features
- Add and manage courses, modules, and lessons
- Secure access with authentication
- Approve or manage course content (if implemented)

### General Features
- JWT-based authentication
- Role-based access control
- Smooth UI with Tailwind CSS
- Error handling and loading states
- LocalStorage token management

---
---

## 🛠️ Tech Stack

| Technology   | Description                      |
|--------------|----------------------------------|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend**  |Node.js, Express.js, JWT, bcrypt |
| **Database** | MongoDB with Mongoose            |
| **Deployment** | Render (Frontend & Backend)   |

---

## ⚙️ Environment Variables

Create a `.env` file in both **backend** and **frontend** folders.

### Backend `.env`
```bash

MONGODB_URI ='mongodb+srv://username:passsword@cluster0.sguyk.mongodb.net'
CLOUDINARY_NAME = 'youcloudinaryname'
CLOUDINARY_API_KEY = 'yourcloudinaryapikey'
CLOUDINARY_SECRET_KEY = 'yourcloudinarysecretkry'
ADMIN_EMAIL =''
ADMIN_PASSWORD=''
JWT_SECRET ='yoursecreat'


```
---
### Frontend `.env`
```bash
VITE_BACKEND_URL=http://localhost:4000

```
---

## 💻 Installation Guide  & Setup

### ✅ Prerequisites

- **Node.js installed**  
- **MongoDB URI** (Cloud or Local)

---

### 📦 Clone the Repository
```bash

git clone https://github.com/monikasenger/ECommerce-Website-TrendBazar.git
cd ECommerce-Website-TrendBazar
```
---

### 🔧 Setup Backend:

```bash
cd backend
npm install

▶️ Run the backend:
npm start
http://localhost:4000
```
---
### 💻 Setup Frontend:
```bash
cd frontend
npm install

▶️ Run the frontend:
npm run dev
http://localhost:5173
```
---
## 📁 Folder Structure 
```bash
Learning_Management_System/
│── LMS-backend/              # Express + MongoDB backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # JWT auth middleware
│   └── server.js         # Entry point
│
│── LMS-frontend/             # React (Vite) frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # App pages (Login, Register, Home, Admin, etc.)
│   │   ├── context/       # React Context API for global state(Admin, User, Movie )
│   │   └── App.jsx       # Main App
│   └── vite.config.js
│
└── README.md
