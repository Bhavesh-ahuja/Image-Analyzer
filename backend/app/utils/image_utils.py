from fastapi import UploadFile, HTTPException

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/jpg"]

async def validate_image(file: UploadFile):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPG and PNG allowed.")
    
    # Check file size (approximate using seek if needed, or read chunks)
    # For now, we rely on reading into memory in the service, but we can do a quick header check if needed.
    # Here we just validate type. Real size check happens when reading.
    return True
