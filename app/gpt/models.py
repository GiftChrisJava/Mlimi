from pydantic import BaseModel
from typing import Optional, List


class CropRecommendation(BaseModel):
    country: str
    state: str
    soilCondition: Optional[str]
    soilType: Optional[str]
