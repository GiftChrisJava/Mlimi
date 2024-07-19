
from fastapi import FastAPI
from item.routes import item_router
from user.routes import user_router, auth_router
from gpt.routes import crop_recommendation_router

app = FastAPI()

app.include_router(item_router, prefix="/api/v1/items", tags=["DB Test"])

app.include_router(user_router, prefix="/api/v1/users", tags=["Users"])

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])


app.include_router(crop_recommendation_router,
                   prefix="/api/v1/recommendations", tags=["GPT"])
