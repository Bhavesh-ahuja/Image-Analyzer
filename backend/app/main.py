from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import SafetyAssessment
from app.services.gemini_service import analyze_image, configure_genai
from app.utils.image_utils import validate_image
from dotenv import load_dotenv
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(title="AI Visual Analyzer")

@app.get("/")
async def root():
    return {"message": "AI Visual Analyzer API is running", "docs": "/docs"}

# Configure CORS
origins = os.getenv("FRONTEND_URL", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    configure_genai()
    logger.info("Application startup: GenAI configured.")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/analyze", response_model=SafetyAssessment)
async def analyze_endpoint(file: UploadFile = File(...)):
    await validate_image(file)
    
    try:
        content = await file.read()
        assessment = await analyze_image(content)
        return assessment
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
