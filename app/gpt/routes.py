
from fastapi import APIRouter
from app.gpt.models import CropRecommendation
from app.gpt.services import recommend_crops

crop_recommendation_router = APIRouter()


@crop_recommendation_router.post("")
async def generate_crop_recommendation(recommendation: CropRecommendation):

    recommendation_generator = await recommend_crops(
        recommendation)

    return {"recommendation": recommendation_generator}
