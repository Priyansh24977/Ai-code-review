# 🚀 Production Deployment Guide - AI Code Reviewer

This guide details how to deploy the **AI Code Reviewer** to popular cloud providers for 24/7 production availability.

---

## 📋 Recommended Hosting Stack

| Component | Recommended Host | Free Tier Available? |
| :--- | :--- | :--- |
| **Frontend (React / Vite)** | Vercel / Netlify / Cloudflare Pages | ✅ Yes (Unlimited SSD CDN) |
| **Backend (Node.js Express)** | Render / Railway / Fly.io / AWS | ✅ Yes |

---

## 🚂 Option 1: Redeploying on Railway (Recommended)

Since your GitHub repository `Priyansh24977/Ai-code-review` is connected to Railway, **Railway automatically triggers a new deployment whenever you push to `main`**!

### Automatic Deployment Status
Because we just executed `git push origin main`, Railway is **already building and deploying the latest code automatically**!

### How to Check / Trigger Manual Redeploy on Railway:
1. Go to your [Railway Dashboard](https://railway.app/dashboard).
2. Click on your **Ai-code-review** project and select your service.
3. Click the **Deployments** tab to watch the build log progress.
4. If you ever need to force a manual redeploy:
   - Click **Deployments** ➔ Click the **`...`** menu next to the latest commit ➔ Click **Redeploy**.

### Railway Environment Variables Checklist
In Railway under **Variables**, ensure the following key-value pairs are saved:
- `GOOGLE_GEMINI_KEY`: `your_actual_google_gemini_api_key`
- `NODE_ENV`: `production`
- `ALLOWED_ORIGINS`: `*` *(or your frontend URL)*

### Railway Service Configuration Settings
If you deployed Backend as a monorepo subfolder in Railway:
- **Root Directory**: `BackEnd`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

---

## Option 2: Deploying Backend to Render (Free & Fast)

1. Create a free account on [Render.com](https://render.com).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository containing `code-review`.
4. Set the following settings:
   - **Root Directory**: `BackEnd`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables in Render Dashboard:
   - `GOOGLE_GEMINI_KEY`: `your_gemini_api_key`
   - `NODE_ENV`: `production`
   - `ALLOWED_ORIGINS`: `https://your-frontend-domain.vercel.app`
6. Click **Deploy Web Service**.
7. Note down your backend live URL (e.g., `https://code-review-backend.onrender.com`).

---

## Option 2: Deploying Frontend to Vercel (Recommended)

1. Create a free account on [Vercel.com](https://vercel.com).
2. Click **Add New...** ➔ **Project**.
3. Import your GitHub repository.
4. Set **Root Directory** to `Frontend`.
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://code-review-backend.onrender.com` *(Replace with your Render backend URL)*
6. Click **Deploy**.
7. Vercel will build and assign your production HTTPS URL!

---

## Option 3: Containerized Deployment via Docker

To run the production backend container locally or on any cloud VPS (DigitalOcean, AWS EC2, Linode):

1. Make sure Docker is installed.
2. Export your API key:
   ```bash
   export GOOGLE_GEMINI_KEY="your_api_key_here"
   ```
3. Run with Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
4. Access the containerized service at `http://localhost:3000`. Check health status at `http://localhost:3000/health`.

---

## 🔒 Production Security Checklist

- [x] **API Protection**: Rate limiting is enabled (30 reqs / 15 mins per IP).
- [x] **HTTP Security Headers**: `helmet` is enabled on all routes.
- [x] **CORS Restriction**: Configured via `ALLOWED_ORIGINS` environment variable.
- [x] **Payload Limit**: Input code length is capped at 10,000 characters.
- [x] **Health Check**: `/health` endpoint is available for uptime monitoring pingers (UptimeRobot, Better Stack).
