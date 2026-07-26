# 🤖 AI Code Reviewer

An AI-powered Code Review application that analyzes source code and provides detailed feedback using Google's Gemini AI. The application helps developers improve code quality by identifying bugs, suggesting best practices, improving readability, and recommending optimizations.

## 🚀 Live Demo

- **Frontend:** https://your-frontend-url.vercel.app
- **Backend:** https://your-backend-url.up.railway.app

*(Replace these URLs after deployment.)*

---

## 📸 Screenshots

### Home Page

> Add a screenshot here.

### AI Review Result

> Add a screenshot here.

---

## ✨ Features

- 📝 Built-in Code Editor
- 🤖 AI-powered code review using Gemini 2.0 Flash
- ⚡ Instant feedback
- 📚 Markdown formatted responses
- 🎨 Syntax highlighting
- 💻 Clean and responsive UI
- 🌐 REST API architecture

---

## 🛠 Tech Stack

### Frontend

- React 19
- Vite
- Axios
- React Markdown
- PrismJS
- Highlight.js
- React Simple Code Editor

### Backend

- Node.js
- Express.js
- Google Gemini API
- dotenv
- CORS

---

## 📂 Project Structure

```
AI-Code-Reviewer/
│
├── FrontEnd/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── BackEnd/
│   ├── src/
│   ├── package.json
│   ├── .env
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Code-Reviewer.git

cd AI-Code-Reviewer
```

---

## Backend Setup

```bash
cd BackEnd

npm install
```

Create a `.env` file:

```env
GOOGLE_GEMINI_KEY=YOUR_GEMINI_API_KEY
PORT=3000
```

Start the backend:

```bash
npm start
```

or

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd FrontEnd

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| GOOGLE_GEMINI_KEY | Gemini API Key |
| PORT | Server Port |

### Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

---

## 🔄 API Endpoint

### Review Code

**POST**

```
/ai/get-review
```

Request

```json
{
  "code": "function sum(a,b){return a+b}"
}
```

Response

```text
The code works correctly.

Suggestions:
- Use arrow functions.
- Add JSDoc comments.
- Add input validation.
```

---

## 📌 Future Improvements

- Authentication
- Review History
- Export Review as PDF
- Copy Review Button
- Multiple Programming Language Support
- Streaming AI Responses
- Dark/Light Theme
- Code Comparison View

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Priyansh Dwivedi**

- GitHub: https://github.com/Priyansh24977
- LinkedIn: https://www.linkedin.com/in/priyansh-dwivedi-a69a19333

---

⭐ If you found this project helpful, consider giving it a star!