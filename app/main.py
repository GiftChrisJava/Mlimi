
from fastapi import FastAPI
from item.routes import item_router
from user.routes import user_router
from gpt.routes import crop_recommendation_router

app = FastAPI()

app.include_router(item_router, prefix="/api/v1/items(test)")

app.include_router(user_router, prefix="/api/v1/users")


app.include_router(crop_recommendation_router,
                   prefix="/api/v1/recommendations")
