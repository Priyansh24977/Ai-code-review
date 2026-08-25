import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

const MAX_CHAR_LIMIT = 10000;

const DEFAULT_SNIPPETS = {
  javascript: `function sum(a, b) {
  return a + b;
}`,
  typescript: `interface User {
  id: string;
  name: string;
}

function getUserName(user: User): string {
  return user.name;
}`,
  python: `def fetch_user_data(user_id):
    import requests
    response = requests.get(f"https://api.example.com/users/{user_id}")
    return response.json()`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello World";
    return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  sql: `SELECT users.id, users.name, COUNT(orders.id) as total_orders
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id;`,
  html: `<div class="card">
  <h2>User Profile</h2>
  <p>Welcome back!</p>
</div>`
};

const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "sql", label: "SQL" },
  { id: "html", label: "HTML/CSS" },
];

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_SNIPPETS.javascript);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedReview, setCopiedReview] = useState(false);
  const [activeTab, setActiveTab] = useState("editor"); // For mobile tabs

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (DEFAULT_SNIPPETS[newLang]) {
      setCode(DEFAULT_SNIPPETS[newLang]);
    }
  };

  async function reviewCode() {
    if (!code.trim()) {
      setError("Please enter code before requesting a review.");
      return;
    }

    if (code.length > MAX_CHAR_LIMIT) {
      setError(`Code length exceeds maximum limit of ${MAX_CHAR_LIMIT} characters.`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const cleanApiUrl = rawApiUrl.replace(/\/ai\/get-review\/?$/, "").replace(/\/+$/, "");

      const response = await axios.post(`${cleanApiUrl}/ai/get-review`, {
        code,
        language,
      });

      setReview(typeof response.data === "string" ? response.data : JSON.stringify(response.data));
      setActiveTab("review"); // Switch to review tab on mobile upon completion
    } catch (err) {
      console.error("Failed to get review:", err);
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Failed to reach AI Review server.";
      setError(`Error: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyReview = () => {
    if (!review) return;
    navigator.clipboard.writeText(review);
    setCopiedReview(true);
    setTimeout(() => setCopiedReview(false), 2000);
  };

  const handleClearCode = () => {
    setCode("");
    setError("");
  };

  const lineCount = code ? code.split("\n").length : 0;
  const charCount = code.length;
  const isNearLimit = charCount > MAX_CHAR_LIMIT * 0.85;

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon">⚡</span>
          <h1>AI Code Reviewer</h1>
        </div>
        <div className="nav-controls">
          <div className="status-badge">
            <span className="dot"></span> Gemini 3.6 Flash
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="mobile-tabs">
        <button
          className={`tab-btn ${activeTab === "editor" ? "active" : ""}`}
          onClick={() => setActiveTab("editor")}
        >
          📝 Code Editor
        </button>
        <button
          className={`tab-btn ${activeTab === "review" ? "active" : ""}`}
          onClick={() => setActiveTab("review")}
        >
          🔍 AI Review {review ? "•" : ""}
        </button>
      </div>

      <main className="main-content">
        {/* Left Panel: Code Editor */}
        <div className={`panel left-panel ${activeTab === "editor" ? "mobile-show" : "mobile-hide"}`}>
          <div className="panel-header">
            <div className="panel-title">
              <span className="icon">📝</span>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="language-select"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="panel-actions">
              <button className="action-btn" onClick={handleClearCode} title="Clear Code">
                Clear
              </button>
              <button className="action-btn" onClick={handleCopyCode} title="Copy Code">
                {copiedCode ? "Copied! ✓" : "Copy"}
              </button>
            </div>
          </div>

          <div className="editor-wrapper">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript || prism.languages.clike, language)
              }
              padding={16}
              style={{
                fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
                fontSize: 15,
                minHeight: "100%",
                width: "100%",
              }}
            />
          </div>

          <div className="panel-footer">
            <div className={`char-meter ${isNearLimit ? "warning" : ""}`}>
              <span>{lineCount} lines</span>
              <span>•</span>
              <span>
                {charCount} / {MAX_CHAR_LIMIT} chars
              </span>
            </div>

            <button
              onClick={reviewCode}
              disabled={loading || charCount > MAX_CHAR_LIMIT}
              className={`review-btn ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Reviewing...
                </>
              ) : (
                <>✨ Review Code</>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel: AI Review Feedback */}
        <div className={`panel right-panel ${activeTab === "review" ? "mobile-show" : "mobile-hide"}`}>
          <div className="panel-header">
            <span className="panel-title">
              <span className="icon">🔍</span> AI Review Feedback
            </span>
            {review && (
              <div className="panel-actions">
                <button className="action-btn" onClick={handleCopyReview} title="Copy Review">
                  {copiedReview ? "Copied! ✓" : "Copy Review"}
                </button>
              </div>
            )}
          </div>

          <div className="review-content">
            {error && (
              <div className="error-banner">
                <span>⚠️ {error}</span>
              </div>
            )}

            {loading && !review && (
              <div className="loading-placeholder">
                <div className="pulse-circle"></div>
                <p>Analyzing {language} code for bugs, efficiency, and security best practices...</p>
              </div>
            )}

            {!loading && !review && !error && (
              <div className="empty-state">
                <div className="empty-icon">🤖</div>
                <h3>Ready to review your code</h3>
                <p>
                  Select your programming language, enter your code, and click <strong>Review Code</strong> to receive detailed feedback, bug detection, and optimized refactoring.
                </p>
              </div>
            )}

            {review && (
              <div className="markdown-output">
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
