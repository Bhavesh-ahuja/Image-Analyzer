# Deployment Guide

This guide explains how to deploy the **AI Visual Analyzer** for free using **Render** (Backend) and **Vercel** (Frontend).

## Prerequisites
- A GitHub account.
- This project pushed to a GitHub repository.

---

## Part 1: Deploy Backend (Render)

1.  **Sign up/Log in** to [Render](https://render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    -   **Name**: `image-analyzer-api` (or similar)
    -   **Root Directory**: `backend`
    -   **Runtime**: `Python 3`
    -   **Build Command**: `pip install -r requirements.txt`
    -   **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
5.  **Environment Variables**:
    -   Click "Advanced" or "Environment".
    -   Add `GOOGLE_API_KEY`: Paste your Gemini API Key.
    -   Add `FRONTEND_URL`: `https://your-frontend-project.vercel.app` (You will update this *after* deploying the frontend, for now you can use `*`).
6.  Click **Create Web Service**.
7.  Wait for deployment to finish. Copy the **onrender.com URL** (e.g., `https://image-analyzer.onrender.com`).

---

## Part 2: Deploy Frontend (Vercel)

1.  **Sign up/Log in** to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    -   **Framework Preset**: Vite (should detect auto).
    -   **Root Directory**: `frontend` (Click Edit if it says ./).
5.  **Environment Variables**:
    -   Add `VITE_API_URL`: Paste your Render Backend URL + `/api` (e.g., `https://image-analyzer.onrender.com/api`).
    -   **Important**: Do not add a trailing slash.
6.  Click **Deploy**.

---

## Part 3: Final Connection

1.  Once Vercel is done, you will get a Frontend URL (e.g., `https://image-analyzer-frontend.vercel.app`).
2.  Go back to **Render** -> **Environment**.
3.  Update the `FRONTEND_URL` variable to your new Vercel URL (improves security).
4.  Enjoy your live app!
