import os
from google import genai
from google.genai import types
from fastapi import HTTPException
from app.models import SafetyAssessment
import json
import base64

# Remove module level assignment
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def configure_genai():
    # google-genai Client is instantiated per request or globally if preferred.
    pass

async def analyze_image(image_bytes: bytes) -> SafetyAssessment:
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Server configuration error: GOOGLE_API_KEY not set.")

    try:
        client = genai.Client(api_key=api_key)
        
        prompt_text = """
        Analyze this image for safety and visual understanding.
        Return a JSON object with exactly the following structure:
        {
            "scene": "A brief, high-level description of what is happening in the scene.",
            "objects": ["List", "or", "short", "description", "of", "key", "detected", "objects"],
            "risks": ["Identify", "up", "to", "three", "possible", "risks", "concisely"],
            "ai_reasoning": "One unified reasoning paragraph that collectively explains all identified risks or anomalies. Cover all risks together."
        }
        Do not provide separate explanations for each risk.
        Do not use markdown formatting like ```json or ```. Just return the raw JSON object.
        """

        # google-genai SDK supports passing Part objects or direct content
        # For images, we construct a Part with inline data
        
        # Ensure image_bytes is encoded suitable for the SDK or passed as types.Part
        # The SDK v1 usage for models.generate_content supports bytes directly in some contexts 
        # but often prefers Part objects.
        
        image_part = types.Part.from_bytes(
            data=image_bytes,
            mime_type="image/jpeg" # We assume jpeg or png, generic image handling might differ
        )

        response = client.models.generate_content(
            model='gemini-flash-latest',
            contents=[
                image_part,
                prompt_text
            ],
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=SafetyAssessment
            )
        )
        
        # With response_schema and response_mime_type='application/json', 
        # the SDK might return a parsed object or we might still need to parse text.
        # However, using the Pydantic model directly in response_schema is a powerful feature of the new SDK.
        
        if response.parsed:
             return response.parsed
        
        # Fallback if parsed isn't available automatically (though it should be with config)
        response_text = response.text
        clean_text = response_text.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text[7:]
        if clean_text.startswith("```"):
            clean_text = clean_text[3:]
        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]
        
        data = json.loads(clean_text)
        return SafetyAssessment(**data)
        
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        # Detailed error logging
        raise HTTPException(status_code=500, detail=f"AI Analysis failed: {str(e)}")
