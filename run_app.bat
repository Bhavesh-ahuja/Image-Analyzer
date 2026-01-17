@echo off
echo Starting AI Visual Analyzer...

:: Start Backend
:: Activates the virtual environment in the root directory, navigates to backend, and starts Uvicorn
start "Backend Server" cmd /k "call venv\Scripts\activate && cd backend && uvicorn app.main:app --reload"

:: Start Frontend
:: Navigates to frontend directory and starts Vite server
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

:: Open Browser
:: Waits for servers to initialize then opens the default browser
timeout /t 5 /nobreak >nul
start http://localhost:5173

echo Application started!
