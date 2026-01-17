from pydantic import BaseModel
from typing import List

class SafetyAssessment(BaseModel):
    scene: str
    objects: List[str]
    risks: List[str]
    ai_reasoning: str
