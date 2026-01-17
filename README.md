# AI-Powered Visual Understanding & Reasoning System

A scalable multimodal AI application that processes uploaded images to generate scene summaries, detect objects, identify risks, and provide AI-based reasoning. This project demonstrates modern "Agentic" workflows by integrating Frontend, Backend, and Advanced AI Models.

- **🔴 Live Demo**: [https://image-analyzer-murex.vercel.app](https://image-analyzer-murex.vercel.app)

## 🚀 Deployment
- **Frontend (Vercel)**: [https://image-analyzer-murex.vercel.app](https://image-analyzer-murex.vercel.app)
- **Backend (Render)**: [https://image-analyzer-ssej.onrender.com](https://image-analyzer-ssej.onrender.com)

---

## 🛠 Models and Libraries Used

### 1. AI Model: Google Gemini 1.5 Flash
- **Why?**: We selected **Gemini 1.5 Flash** via the `google-genai` SDK.
- **Reasoning**: It offers the best balance of **speed (latency)** and **reasoning capability** for real-time visual analysis. It supports multimodal input (images + text) natively, making it superior to traditional object detection models (like TFLite/YOLO) for strict reasoning tasks (Detecting *why* something is a risk, not just *what* it is).

### 2. Frontend: React + Vite + Tailwind CSS
- **React (v19)**: Component-based UI for modularity.
- **Vite (v7)**: Extremely fast build tool and dev server.
- **Tailwind CSS (v4)**: Utility-first styling for a premium, responsive design.

### 3. Backend: FastAPI (Python)
- **FastAPI**: Chosen for its high performance (async/await) and automatic documentation (Swagger UI).
- **Uvicorn**: ASIC server for production.

---

## 🧠 AI Logic and Thresholds

The system follows a **Structured Reasoning** approach:

1.  **Input**: User uploads an image.
2.  **Validation**: Backend validates file type (JPEG/PNG) and size (< 10MB).
3.  **Prompt Engineering**: We use a strict system prompt to force the AI into a specific JSON structure:
    ```json
    {
      "scene": "High-level summary",
      "objects": ["List", "of", "items"],
      "risks": ["Specific", "safety", "risks"],
      "ai_reasoning": "Unified paragraph explaining the WHY"
    }
    ```
4.  **Thresholds**:
    -   **Safety**: The model is implicitly instructed to flag "Potential Risks". We do not use hard probability thresholds (e.g., > 0.7 confidence) because generative reasoning is qualitative. Instead, we rely on the semantic understanding of the model to identify hazards like "Exposed wiring" or "Slippery floor".

---

## ⚠️ Limitations

1.  **State Management**: The application is stateless. No database is connected, so analysis history is not saved between sessions.
2.  **Privacy & Data Residency**: Images are processed in the cloud (Google Servers), making this solution unsuitable for air-gapped or strictly on-device data requirements.
3.  **Latency**: Average inference time is ~2-4 seconds. Free-tier server hosting may incur execution delays (cold starts) of up to 50 seconds.
4.  **API Rate Limits**: The system is subject to Gemini API free tier limits (Requests Per Minute), which may restrict high-volume concurrent usage.
5.  **Over-Sensitivity**: The AI is instructed to be very cautious, so it might sometimes label completely safe images as having risks.

---

## 📂 Project Structure

-   `frontend/`: React Source Code
-   `backend/`: FastAPI Application
-   `Dockerfile` / `docker-compose.yml`: Included for containerized deployment (AWS/GCP/Azure) and consistent dev environment setup.

## 🏃‍♂️ How to Run Locally

1.  **Start Backend**:
    ```bash
    cd backend
    python -m venv venv
    venv\Scripts\activate
    uvicorn app.main:app --reload
    ```
2.  **Start Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```
