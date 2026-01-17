# AI-Powered Visual Understanding & Reasoning System

A scalable multimodal AI application that processes uploaded images to generate scene summaries, detect objects, identify risks, and provide AI-based reasoning.

## Architecture
- **Backend**: FastAPI (Python)
- **Frontend**: React + Vite (Node.js)
- **AI**: Google Gemini 1.5 Flash (via `google-generative-ai`)

## Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Google API Key (Gemini)

### Installation

1. **Backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   ```

3. **Running**:
   - Backend: `uvicorn app.main:app --reload`
   - Frontend: `npm run dev`

## Environment Variables
Create a `.env` file in `backend/`:
```
GOOGLE_API_KEY=your_api_key_here
```
