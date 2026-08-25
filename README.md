# ⚡ AI Code Reviewer

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-code-review-kappa-ten.vercel.app/)
[![Railway Deployment](https://img.shields.io/badge/Railway-Backend-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://ai-code-review-production-35ed.up.railway.app/health)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.6_Flash-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

An AI-powered Code Review application that analyzes source code across **multiple programming languages** and delivers instant, structured feedback using Google's **Gemini 3.6 Flash**.

---

## 🚀 Live Demo

- 🌐 **Live Web Application (Vite + React on Vercel):** [https://ai-code-review-kappa-ten.vercel.app](https://ai-code-review-kappa-ten.vercel.app/)
- ⚡ **Production Backend API (Express on Railway):** [https://ai-code-review-production-35ed.up.railway.app](https://ai-code-review-production-35ed.up.railway.app)
- 🏥 **API Health Check Endpoint:** [https://ai-code-review-production-35ed.up.railway.app/health](https://ai-code-review-production-35ed.up.railway.app/health)

---

## ✨ Features

- 🌐 **Multi-Language Support**: Review JavaScript, TypeScript, Python, Java, C++, Go, Rust, SQL, and HTML/CSS.
- 📝 **Live Interactive Code Editor**: Built with PrismJS syntax highlighting and real-time character & line counting.
- 🤖 **Senior AI Reviewer Agent**: Driven by Gemini 3.6 Flash for detecting bugs, performance bottlenecks, and security flaws.
- 🎨 **Modern Dark Glassmorphism UI**: High-contrast, responsive split-pane design with custom scrollbars and loading animations.
- 🛡️ **Production Security**: Hardened with `helmet` HTTP security headers, CORS origin restrictions, and 30 req/15 min rate-limiting.
- 📱 **Mobile Friendly**: Features automatic tab navigation (`📝 Code Editor` vs `🔍 AI Review`) for small screens.
- 📋 **One-Click Actions**: Quick buttons to copy code, copy formatted review markdown, or clear workspace.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **HTTP Client**: Axios
- **Markdown Processing**: React Markdown + Rehype Highlight (Github Dark Theme)
- **Syntax Highlighting & Editor**: PrismJS + React Simple Code Editor

### Backend
- **Runtime**: Node.js + Express
- **AI SDK**: `@google/generative-ai` (Gemini 3.6 Flash)
- **Security & Protection**: `helmet`, `express-rate-limit`, `cors`
- **Environment Management**: `dotenv`

---

## 📂 Project Structure

```
code-review/
├── Frontend/              # React 19 + Vite Web Application
│   ├── src/
│   │   ├── App.jsx        # Main split-pane Editor & Review interface
│   │   ├── App.css        # Glassmorphic dark styling & mobile tabs
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── BackEnd/               # Node.js + Express AI API Service
│   ├── src/
│   │   ├── controllers/   # ai.controller.js (Input validation & limit guard)
│   │   ├── services/      # ai.service.js (Gemini 3.6 Flash prompt integration)
│   │   ├── routes/        # ai.routes.js (/ai/get-review)
│   │   └── app.js         # Security headers, CORS, rate limiting, health route
│   ├── server.js          # Startup env check, 0.0.0.0 binding & graceful shutdown
│   ├── Dockerfile         # Multi-stage production container build
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml     # Container orchestration setup
├── DEPLOYMENT.md          # Cloud deployment guide (Vercel, Render, Railway, Docker)
└── README.md
```

---

## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Priyansh24977/Ai-code-review.git
cd Ai-code-review
```

### 2. Backend Setup

```bash
cd BackEnd
npm install
```

Create a `.env` file in `BackEnd/`:

```env
PORT=3000
NODE_ENV=development
GOOGLE_GEMINI_KEY=YOUR_GOOGLE_GEMINI_API_KEY
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in `Frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔄 API Reference

### Send Code for AI Review

`POST /ai/get-review`

#### Request Body
```json
{
  "code": "function sum(a, b) { return a + b; }",
  "language": "javascript"
}
```

#### Response Body
Returns structured Markdown containing:
- ❌ **Issues Identified** (bugs, anti-patterns, missing validation)
- ✅ **Recommended Fix** (refactored production code snippet)
- 💡 **Best Practices & Optimizations**

---

## 👨‍💻 Author

**Priyansh Dwivedi**
- GitHub: [@Priyansh24977](https://github.com/Priyansh24977)
- LinkedIn: [Priyansh Dwivedi](https://www.linkedin.com/in/priyansh-dwivedi-a69a19333)

---

⭐ If you found this project helpful, give it a star on GitHub!